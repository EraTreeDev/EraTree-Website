import { NextResponse } from "next/server";

/**
 * Stub. Validates shape and returns 200 — it does NOT deliver anywhere yet.
 * TODO(launch): forward to the real email service / CRM endpoint.
 */
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

  console.info("[contact] trading request received", { email: body.email });

  return NextResponse.json({ ok: true });
}
