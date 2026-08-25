import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { FeatureCardGrid } from "@/components/sections/FeatureCardGrid";
import { StickyScrollSection } from "@/components/sections/StickyScrollSection";
import { DarkList } from "@/components/sections/DarkListSection";
import { ContactCTABanner } from "@/components/sections/ContactCTABanner";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TagPill } from "@/components/ui/TagPill";
import { Reveal } from "@/components/ui/Reveal";
import { FeatheredVideo } from "@/components/visuals/FeatheredVideo";
import { security } from "@/content/pages";

export const metadata: Metadata = {
  title: security.meta.title,
  description: security.meta.description,
  openGraph: openGraph({
    title: security.meta.title,
    description: security.meta.description,
    url: "/security",
  }),
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <Hero
        eyebrow={security.hero.eyebrow}
        heading={security.hero.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        sub={security.hero.sub}
        badges={security.hero.badges}
        mediaSlot={
          <FeatheredVideo
            src="/animations/security-hero.mp4"
            alt={security.hero.media.alt}
            className="aspect-square w-full"
            feather={14}
          />
        }
        layout="balanced"
      />

      {/* Compliance pillars */}
      <section className="bg-surface py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
              <div>
                <Eyebrow>{security.pillars.eyebrow}</Eyebrow>
                <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
                  {security.pillars.heading}
                </h2>
              </div>
              <p className="self-end text-[15px] leading-[1.65] text-muted">
                {security.pillars.body}
              </p>
            </div>
          </Reveal>

          <div className="mt-14 rounded-card bg-paper">
            <FeatureCardGrid items={security.pillars.items} variant="number" columns={3} />
          </div>
        </Container>
      </section>

      {/* Built on solid ground */}
      <StickyScrollSection
        tone="dark"
        left={
          <Reveal>
            <Eyebrow tone="mint">{security.framework.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-white">
              {security.framework.heading}
            </h2>
            <p className="mt-5 max-w-[420px] text-[15px] leading-[1.65] text-white/60">
              {security.framework.body}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {security.framework.tags.map((t) => (
                <li key={t}>
                  <TagPill tone="dark">{t}</TagPill>
                </li>
              ))}
            </ul>
          </Reveal>
        }
        right={<DarkList items={security.framework.items} />}
      />

      {/* Closing */}
      <section className="pb-16 pt-20 lg:pb-20 lg:pt-28">
        <Container>
          <Reveal>
            <Eyebrow>{security.closing.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-[1040px] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
              {security.closing.heading}
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.65] text-muted">
              {security.closing.body}
            </p>
          </Reveal>
        </Container>
      </section>

      <div className="pb-20 lg:pb-28">
        <ContactCTABanner />
      </div>
    </>
  );
}
