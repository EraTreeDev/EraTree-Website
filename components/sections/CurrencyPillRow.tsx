import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { currencies, globalReach } from "@/content/pages";

/**
 * "Trade digital assets from 30+ fiat currencies" plus the flag pill row.
 *
 * The row bleeds the full viewport width (the reference runs it past the
 * container edges) and scrolls horizontally rather than wrapping.
 */
export function CurrencyPillRow() {
  return (
    <section className="py-20 lg:py-24">
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
        <ul
          className="mt-10 flex gap-2.5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            // Aligns the first pill with the container gutter; the row then runs
            // off the right edge. justify-center would make the start
            // unreachable once the row overflows.
            paddingLeft: "max(1.25rem, calc((100vw - 1264px) / 2 + 2.5rem))",
            paddingRight: "1.25rem",
          }}
        >
          {currencies.map((c) => (
            <li
              key={c.code}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper py-1.5 pl-3.5 pr-1.5"
            >
              <span className="font-mono text-[12px] tracking-[0.06em] text-ink">{c.code}</span>
              <Image
                src={`/icons/flags/${c.code.toLowerCase()}.svg`}
                alt={`Flag of ${c.country}`}
                width={90}
                height={60}
                // Next's optimizer refuses SVG unless dangerouslyAllowSVG is set
                // globally; these are our own assets, so bypass it here instead.
                unoptimized
                className="h-[17px] w-[26px] rounded-[3px] object-cover"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
