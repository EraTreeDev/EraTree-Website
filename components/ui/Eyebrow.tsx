import { type ReactNode } from "react";

type Tone = "accent" | "mint" | "muted";

const tones: Record<Tone, string> = {
  accent: "text-emerald",
  mint: "text-mint",
  muted: "text-muted",
};

/** All-caps tracked-out kicker sitting above every major heading. */
export function Eyebrow({
  children,
  tone = "accent",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={`text-eyebrow font-semibold uppercase ${tones[tone]} ${className}`}>{children}</p>
  );
}
