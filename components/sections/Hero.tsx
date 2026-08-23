import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealOnLoad } from "@/components/ui/Reveal";
import { MediaSlot, type Media } from "@/components/visuals/MediaSlot";
import { type ReactNode } from "react";

export function Hero({
  eyebrow,
  heading,
  sub,
  /** The teal settlement line under the subtext on the region pages. */
  highlight,
  cta,
  media,
  /** Overrides `media` when the visual needs its own wrapper (see FeatheredVideo). */
  mediaSlot,
  badges,
  align = "split",
  /**
   * "text-wide" keeps the long region headlines on two lines; "balanced" gives
   * the visual more room, for the 16:9 hero animations.
   */
  layout = "text-wide",
}: {
  eyebrow?: string;
  heading: ReactNode;
  sub?: string;
  highlight?: string;
  cta?: { label: string; href: string };
  media?: Media;
  mediaSlot?: ReactNode;
  badges?: readonly string[];
  /** "split" = text left / visual right. "center" = centred, no visual. */
  align?: "split" | "center";
  layout?: "text-wide" | "balanced";
}) {
  const centered = align === "center";

  return (
    <section className="pb-16 pt-16 lg:pb-24 lg:pt-[104px]">
      <Container>
        <div
          className={
            centered
              ? "mx-auto max-w-[860px] text-center"
              : layout === "balanced"
                ? "grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-12"
                : "grid items-center gap-10 lg:grid-cols-[780px_minmax(0,1fr)] lg:gap-14"
          }
        >
          <div>
            {eyebrow && (
              <RevealOnLoad>
                <Eyebrow className={centered ? "" : undefined}>{eyebrow}</Eyebrow>
              </RevealOnLoad>
            )}
            <RevealOnLoad delay={0.05}>
              <h1
                className={`text-[clamp(2.25rem,4.4vw,3.95rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ink ${
                  eyebrow ? "mt-4" : ""
                }`}
              >
                {heading}
              </h1>
            </RevealOnLoad>
            {sub && (
              <RevealOnLoad delay={0.1}>
                <p
                  className={`mt-5 text-[16px] leading-[1.6] text-ink/75 ${
                    centered ? "mx-auto max-w-[640px]" : "max-w-[640px]"
                  }`}
                >
                  {sub}
                </p>
              </RevealOnLoad>
            )}
            {highlight && (
              <RevealOnLoad delay={0.15}>
                <p className="mt-5 text-[15px] font-medium text-teal-deep">{highlight}</p>
              </RevealOnLoad>
            )}
            {badges && (
              <RevealOnLoad delay={0.15}>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {badges.map((b) => (
                    <li
                      key={b}
                      className="rounded-md border border-line px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-muted"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </RevealOnLoad>
            )}
            {cta && (
              <RevealOnLoad delay={0.2}>
                <div className={`mt-9 flex ${centered ? "justify-center" : ""}`}>
                  <Button href={cta.href} fullWidthOnMobile>
                    {cta.label}
                  </Button>
                </div>
              </RevealOnLoad>
            )}
          </div>

          {!centered && (mediaSlot || media) && (
            <RevealOnLoad delay={0.1}>
              {mediaSlot ?? <MediaSlot {...media!} priority aspect={media!.aspect ?? "aspect-[7/8]"} />}
            </RevealOnLoad>
          )}
        </div>
      </Container>
    </section>
  );
}
