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
  backdrop,
  badges,
  align = "split",
  /**
   * "text-wide" keeps the long region headlines on two lines; "balanced" gives
   * the visual more room, for the 16:9 hero animations.
   */
  layout = "text-wide",
  /**
   * "tight" trims the vertical padding for the landing hero, whose square video
   * already makes the section taller than the region heroes.
   */
  padding = "default",
}: {
  eyebrow?: string;
  heading: ReactNode;
  sub?: ReactNode;
  highlight?: string;
  cta?: { label: string; href: string };
  media?: Media;
  mediaSlot?: ReactNode;
  /**
   * Full-bleed looping backdrop behind the whole section (the R2 treatment).
   * When set, the media column is dropped and the text sits over the video.
   */
  backdrop?: { webm: string; mp4?: string; webmSmall?: string; poster: string };
  badges?: readonly string[];
  /** "split" = text left / visual right. "center" = centred, no visual. */
  align?: "split" | "center";
  layout?: "text-wide" | "balanced";
  padding?: "default" | "tight";
}) {
  const centered = align === "center";

  return (
    <section
      className={
        backdrop
          ? "relative overflow-hidden pb-20 pt-20 lg:pb-[132px] lg:pt-[132px]"
          : padding === "tight"
            ? "pb-10 pt-10 lg:pb-16 lg:pt-16"
            : "pb-16 pt-16 lg:pb-24 lg:pt-[104px]"
      }
    >
      {backdrop && (
        <>
          {/*
            preload="none" keeps the loop off the critical path; the poster is
            the LCP and paints immediately. Decorative, so hidden from AT.
          */}
          {/*
            object-cover inside overflow-hidden clips the video dead at the
            section edge, so tinted glass met the white band below as a hard
            line. Mask the video itself rather than painting a strip over it,
            so it dissolves into whatever sits behind.

            It reaches full transparency at 88%, not 100%, on purpose: the next
            section draws `border-y border-line`, and that rule was designed to
            meet plain white. Landing the fade early leaves a clean band so the
            border reads as a divider rather than the edge of the video.
          */}
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            style={{
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.45) 76%, transparent 88%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 55%, rgba(0,0,0,0.45) 76%, transparent 88%)",
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster={backdrop.poster}
            aria-hidden="true"
          >
            {backdrop.webmSmall && (
              <source src={backdrop.webmSmall} type="video/webm" media="(max-width: 767px)" />
            )}
            <source src={backdrop.webm} type="video/webm" />
            {backdrop.mp4 && <source src={backdrop.mp4} type="video/mp4" />}
          </video>
          {/*
            Measured scrim: lifts the sub-copy from 4.27:1 to 5.19:1 at the
            5th percentile, at the worst moment of the loop.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.86) 32%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0) 72%)",
            }}
          />
        </>
      )}
      <Container className={backdrop ? "relative" : ""}>
        <div
          className={
            backdrop
              ? "max-w-[640px]"
              : centered
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

          {!centered && !backdrop && (mediaSlot || media) && (
            <RevealOnLoad delay={0.1}>
              {mediaSlot ?? <MediaSlot {...media!} priority aspect={media!.aspect ?? "aspect-[7/8]"} />}
            </RevealOnLoad>
          )}
        </div>
      </Container>
    </section>
  );
}
