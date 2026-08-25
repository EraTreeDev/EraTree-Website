import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { currencies, globalReach } from "@/content/pages";

function Pill({ code, country }: { code: string; country: string }) {
  return (
    // Spacing is a right margin rather than a flex gap on purpose: it makes each
    // copy's measured width include its trailing gap, so translating the track
    // by exactly -50% lands seamlessly. A flex gap would leave the loop half a
    // gap short and show a visible jump on every cycle.
    <li className="mr-2.5 flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-3.5 pr-1.5">
      <span className="font-mono text-[12px] tracking-[0.06em] text-ink">{code}</span>
      <Image
        src={`/icons/flags/${code.toLowerCase()}.svg`}
        alt={`Flag of ${country}`}
        width={90}
        height={60}
        // Next's optimizer refuses SVG unless dangerouslyAllowSVG is set
        // globally; these are our own assets, so bypass it here instead.
        unoptimized
        className="h-[17px] w-[26px] rounded-[3px] object-cover"
      />
    </li>
  );
}

/**
 * "Trade digital assets from 30+ fiat currencies" plus the flag pill row.
 *
 * The row bleeds the full viewport width and scrolls left forever. The pill set
 * is rendered twice: the track travels -50%, at which point copy 2 sits exactly
 * where copy 1 began, so the loop has no visible seam. The second copy is
 * aria-hidden so each currency is announced once.
 */
export function CurrencyPillRow() {
  return (
    <section className="pb-28 pt-20 lg:pb-36 lg:pt-24">
      <Container>
        <Reveal className="text-center">
          <Eyebrow>{globalReach.eyebrow}</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-[720px] text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.015em] text-ink">
            {globalReach.heading.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
      </Container>

      <Reveal delay={0.1}>
        {/*
          `group` drives the hover pause. Under prefers-reduced-motion the
          animation is dropped and the track becomes a normal scroller, so the
          full list stays reachable without motion.
        */}
        <div
          className="group mt-10 overflow-hidden motion-reduce:overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex w-max animate-marquee pb-2 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0" aria-hidden={copy === 1 || undefined}>
                {currencies.map((c) => (
                  <Pill key={c.code} code={c.code} country={c.country} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
