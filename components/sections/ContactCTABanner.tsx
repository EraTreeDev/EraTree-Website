"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { contactCta } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-line bg-paper px-4 py-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-emerald";

/**
 * The recurring dark banner: copy left, floating white form card right.
 * Gradient sampled point-by-point off the reference: a wide radial glow centred
 * near (42%, 45%) falling to near-black at the corners.
 */
export function ContactCTABanner() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Enter your full name.";
    if (!email) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address.";
    if (message.length < 10) next.message = "Tell us a little more — at least 10 characters.";
    if (data.get("consent") !== "on") next.consent = "Please accept the terms to continue.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error("Request failed");
      // The visitor always sees success on a 2xx; this only surfaces a
      // misconfigured server (no API key) to whoever is looking at the console.
      const json = await res.json().catch(() => null);
      if (json && json.delivered === false) {
        console.warn(`[contact] accepted but not delivered: ${json.reason}`);
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Container>
      <section className="overflow-hidden rounded-band bg-[radial-gradient(88%_96%_at_52%_33%,#093A25_0%,#062617_40%,#05190C_72%,#020A05_100%)]">
        <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1fr_452px] lg:gap-[56px] lg:p-[76px]">
          <div>
            <h2 className="text-[clamp(1.75rem,3.9vw,3.25rem)] font-medium leading-[1.17] tracking-[-0.015em] text-white">
              {contactCta.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-[440px] text-[15px] leading-[1.65] text-white/70">
              {contactCta.body}
            </p>
          </div>

          <div className="rounded-card bg-paper p-6 shadow-form sm:p-7">
            {status === "sent" ? (
              <div role="status" className="py-8 text-center">
                <p className="text-[20px] font-medium text-ink">Thanks — request received.</p>
                <p className="mt-2 text-[15px] text-muted">
                  A member of our trading team will follow up shortly.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
                <Field id={`${id}-name`} label={contactCta.fields.name} error={errors.name}>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={contactCta.fields.name}
                    className={FIELD}
                  />
                </Field>

                <Field id={`${id}-email`} label={contactCta.fields.email} error={errors.email}>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={contactCta.fields.email}
                    className={FIELD}
                  />
                </Field>

                <Field id={`${id}-message`} label="Your message" error={errors.message}>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={3}
                    placeholder={contactCta.fields.message}
                    className={`${FIELD} resize-y`}
                  />
                </Field>

                <div>
                  <div className="flex items-start gap-3">
                    <input
                      id={`${id}-consent`}
                      name="consent"
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-forest"
                    />
                    <label htmlFor={`${id}-consent`} className="text-[13px] leading-[1.5] text-muted">
                      {contactCta.consent.prefix}{" "}
                      <Link href={contactCta.consent.terms.href} className="underline">
                        {contactCta.consent.terms.label}
                      </Link>{" "}
                      {contactCta.consent.join}{" "}
                      <Link href={contactCta.consent.privacy.href} className="underline">
                        {contactCta.consent.privacy.label}
                      </Link>
                    </label>
                  </div>
                  {errors.consent && (
                    <p role="alert" className="mt-2 text-[13px] text-[#C0392B]">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p role="alert" className="text-[13px] text-[#C0392B]">
                    Something went wrong sending that. Please try again, or email us directly.
                  </p>
                )}

                <Button type="submit" className="mt-1 w-full py-4" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : contactCta.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}

/** Placeholders double as labels visually, so the real label is screen-reader only. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-[13px] text-[#C0392B]">
          {error}
        </p>
      )}
    </div>
  );
}
