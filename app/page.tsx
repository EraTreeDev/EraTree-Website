import type { Metadata } from "next";
import { openGraph, jsonLd, organizationSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { StatStrip } from "@/components/sections/StatStrip";
import { CurrencyPillRow } from "@/components/sections/CurrencyPillRow";
import { ImageCardCarousel } from "@/components/sections/ImageCardCarousel";
import { ContactCTABanner } from "@/components/sections/ContactCTABanner";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MediaSlot } from "@/components/visuals/MediaSlot";
import { FeatheredVideo } from "@/components/visuals/FeatheredVideo";
import { home } from "@/content/pages";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  openGraph: openGraph({ title: home.meta.title, description: home.meta.description, url: "/" }),
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(organizationSchema)}
      />
      <Hero
        heading={home.hero.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        sub={home.hero.sub}
        cta={home.hero.cta}
        mediaSlot={
          <FeatheredVideo
            src="/animations/hero-landing.mp4"
            alt={home.hero.media.alt}
            // The globe fills only ~33% of the 16:9 source and sits right of
            // centre, so crop to a square around it rather than showing the
            // empty frame.
            // Capped so the square crop doesn't push the landing hero taller
            // than the region heroes.
            className="mx-auto aspect-square w-full max-w-[450px]"
            // The globe sits at ~72% across the source; right-aligning the
            // cover crop is what actually centres it in a square box.
            objectPosition="100% 50%"
            scale={1.05}
            feather={9}
          />
        }
        layout="balanced"
        padding="tight"
      />

      <StatStrip stats={home.stats} />

      {/* Deep liquidity — dark band, copy left, three icon rows right */}
      <section id="liquidity" className="bg-band-dark py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <Eyebrow tone="mint">{home.liquidity.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-white">
                {home.liquidity.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="mt-5 max-w-[400px] text-[15px] leading-[1.65] text-white/60">
                {home.liquidity.body}
              </p>
            </Reveal>

            <ul className="flex flex-col">
              {home.liquidity.items.map((item, i) => (
                <Reveal as="li" key={item.title} delay={i * 0.08}>
                  <div className="flex gap-5 border-b border-white/12 py-6 first:pt-0 last:border-b-0">
                    <div className="w-9 shrink-0">
                      <MediaSlot {...item.icon} aspect="aspect-square" />
                    </div>
                    <div>
                      <h3 className="text-[19px] font-medium tracking-[-0.01em] text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.6] text-white/60">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CurrencyPillRow />

      {/* Build with Trust — photo carousel, bleeding off the right edge */}
      <section id="otc-trading" className="overflow-hidden pb-20 lg:pb-24">
        <Container>
          <Reveal>
            <h2 className="max-w-[1040px] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
              {home.carousel.heading}
            </h2>
            <p className="mt-4 max-w-[700px] text-[15px] leading-[1.65] text-muted">
              {home.carousel.body}
            </p>
          </Reveal>
        </Container>
        <div className="mt-10">
          <ImageCardCarousel slides={home.carousel.slides} />
        </div>
      </section>

      {/* Liquidity you need — 3-column box */}
      <section className="pb-20 lg:pb-24">
        <Container>
          <Reveal className="text-center">
            <h2 className="mx-auto max-w-[720px] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
              {home.service.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-[1.65] text-muted">
              {home.service.body}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-3">
              {home.service.columns.map((c) => (
                <div key={c.title} className="bg-surface px-8 py-12 text-center">
                  <dt className="text-[24px] font-medium tracking-[-0.01em] text-ink">{c.title}</dt>
                  <dd className="mx-auto mt-3 max-w-[220px] text-[14px] leading-[1.6] text-muted">
                    {c.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <div className="pb-20 lg:pb-28">
        <ContactCTABanner />
      </div>
    </>
  );
}
