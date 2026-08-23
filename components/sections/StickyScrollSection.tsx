import { type ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/**
 * Left column pins while the right column scrolls past it, releasing once the
 * right column is exhausted.
 *
 * Sticky is disabled below `lg` — on narrow viewports a pinned column reads as
 * broken, so the two stack (left content first) instead.
 */
export function StickyScrollSection({
  left,
  right,
  tone = "light",
  className = "",
}: {
  left: ReactNode;
  right: ReactNode;
  tone?: "light" | "surface" | "dark";
  className?: string;
}) {
  const toneClass =
    tone === "dark" ? "bg-band-darker text-white" : tone === "surface" ? "bg-surface" : "bg-paper";

  return (
    <section className={`${toneClass} ${className}`}>
      <Container>
        <div className="relative grid gap-12 py-20 lg:grid-cols-2 lg:gap-[168px] lg:py-28">
          <div className="lg:sticky lg:top-[104px] lg:self-start">{left}</div>
          <div>{right}</div>
        </div>
      </Container>
    </section>
  );
}
