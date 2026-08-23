"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";

export type Stat = { index: string; title: string; body: string };

/** The numbered 01–04 strip on Home, divided by hairlines. */
export function StatStrip({ stats }: { stats: readonly Stat[] }) {
  const reduced = useReducedMotion();

  return (
    <section className="border-y border-line">
      <Container>
        <h2 className="sr-only">Why Eratree</h2>
        <motion.ul
          className="grid sm:grid-cols-2 lg:grid-cols-4"
          variants={reduced ? undefined : staggerParent}
          initial={reduced ? undefined : "hidden"}
          whileInView={reduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.li
              data-reveal=""
              key={s.index}
              variants={reduced ? undefined : staggerChild}
              className={`py-10 lg:py-14 lg:pr-10 ${
                i > 0 ? "border-t border-line sm:border-t-0 lg:border-l lg:pl-10" : ""
              }`}
            >
              <span className="block font-mono text-[13px] text-muted">{s.index}</span>
              <h3 className="mt-9 text-[18px] font-medium tracking-[-0.01em] text-ink">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[240px] text-[14px] leading-[1.6] text-muted">{s.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
