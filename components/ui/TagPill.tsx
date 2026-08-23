import { type ReactNode } from "react";

type Tone = "light" | "dark" | "outline";

const tones: Record<Tone, string> = {
  light: "border-line bg-paper text-muted",
  dark: "border-mint/25 bg-mint/10 text-mint",
  outline: "border-line-strong bg-transparent text-muted",
};

export function TagPill({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
