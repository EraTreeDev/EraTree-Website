import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Delivers the ContactCTABanner submission (landing, /us, /canada, /security,
 * /contact all post here) to the sales inbox via Resend.
 *
 * Env: RESEND_API_KEY, and optionally CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL.
 * Without a key we log and 200 in development so local work is unblocked, but
 * 500 in production rather than silently dropping a real lead.
 */

const TO = process.env.CONTACT_TO_EMAIL ?? "sales@eratree.io";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "EraTree Website <noreply@send.eratree.io>";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const required = ["name", "email", "message"] as const;
  const missing = required.filter((k) => !String(body[k] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing: ${missing.join(", ")}` }, { status: 400 });
  }
  if (body.consent !== "on") {
    return NextResponse.json({ error: "Consent is required." }, { status: 400 });
  }

  const name = String(body.name).trim();
  const email = String(body.email).trim();
  const message = String(body.message).trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — the submission was NOT delivered anywhere.",
      { email },
    );
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Email delivery is not configured." }, { status: 500 });
    }
    // `delivered` keeps this distinguishable from a real send; a bare { ok: true }
    // looks identical to success and is what made this look broken before.
    return NextResponse.json({ ok: true, delivered: false, reason: "no-api-key" });
  }

  // Plain text only — never interpolate submitted input into HTML.
  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    "",
    "Message:",
    message,
  ].join("\n");

  let id: string | undefined;
  try {
    const { data, error } = await new Resend(apiKey).emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      // Header injection guard: strip anything that could break the subject line.
      subject: `Trading request — ${name.replace(/[\r\n]+/g, " ").slice(0, 120)}`,
      text,
    });
    if (error) throw new Error(error.message);
    id = data?.id;
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, delivered: true, id });
}
