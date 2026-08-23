import { Hero } from "@/components/sections/Hero";
import { StickyScrollSection } from "@/components/sections/StickyScrollSection";
import { FeatureCardGrid } from "@/components/sections/FeatureCardGrid";
import { CurrencyPillRow } from "@/components/sections/CurrencyPillRow";
import { ContactCTABanner } from "@/components/sections/ContactCTABanner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { regions, tradingWith } from "@/content/pages";

/**
 * /canada and /us are the same page. They differ only in headline, settlement
 * line, hero graphic, and whether the currency row leads or follows the cards.
 */
export function RegionPage({ region }: { region: keyof typeof regions }) {
  const r = regions[region];

  const currencyRow = <CurrencyPillRow />;

  const cards = (
    <StickyScrollSection
      tone="surface"
      left={
        <Reveal>
          <Eyebrow>{tradingWith.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
            {tradingWith.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-[420px] text-[15px] leading-[1.65] text-muted">
            {tradingWith.body}
          </p>
          <div className="mt-8">
            <Button href={tradingWith.cta.href} fullWidthOnMobile>
              {tradingWith.cta.label}
            </Button>
          </div>
        </Reveal>
      }
      right={<FeatureCardGrid items={r.cards} variant="icon" columns={1} />}
    />
  );

  return (
    <>
      <Hero
        heading={r.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        sub={r.sub}
        highlight={r.highlight}
        cta={{ label: "Contact us", href: "/contact" }}
        media={r.media}
      />

      {r.showCurrencyRow && currencyRow}
      {cards}

      <div className="pb-20 pt-4 lg:pb-28">
        <ContactCTABanner />
      </div>
    </>
  );
}
