"use client";

import { motion, useReducedMotion } from "motion/react";
import { MediaSlot, type Media } from "@/components/visuals/MediaSlot";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";

export type Feature = {
  /** "01"–"06" on the Security grid; omitted on the icon cards. */
  index?: string;
  icon?: Media;
  title: string;
  body: string;
};

/**
 * The repeating card. Two shapes:
 *  - "icon"   — soft 3D icon above the title (region pages, sticky-scroll column)
 *  - "number" — numeral above the title, hairline-divided cells (Security grid)
 */
export function FeatureCardGrid({
  items,
  variant = "icon",
  columns = 1,
}: {
  items: readonly Feature[];
  variant?: "icon" | "number";
  columns?: 1 | 2 | 3;
}) {
  const reduced = useReducedMotion();

  const cols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "grid-cols-1";

  if (variant === "number") {
    return (
      <motion.ul
        className={`grid overflow-hidden rounded-card border border-line ${cols}`}
        variants={reduced ? undefined : staggerParent}
        initial={reduced ? undefined : "hidden"}
        whileInView={reduced ? undefined : "show"}
        viewport={{ once: true, amount: 0.15 }}
      >
        {items.map((item) => (
          <motion.li
            data-reveal=""
            key={item.title}
            variants={reduced ? undefined : staggerChild}
            className="border-b border-r border-line p-8 last:border-b-0 lg:p-10"
          >
            {item.index && (
              <span className="block font-mono text-[13px] text-muted">{item.index}</span>
            )}
            <h3 className="mt-10 text-[18px] font-medium tracking-[-0.01em] text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-muted">{item.body}</p>
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  return (
    <motion.ul
      className={`grid gap-5 ${cols}`}
      variants={reduced ? undefined : staggerParent}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((item) => (
        <motion.li
          data-reveal=""
          key={item.title}
          variants={reduced ? undefined : staggerChild}
          className="rounded-card border border-line bg-paper p-7 lg:p-8"
        >
          {item.icon && (
            <div className="mb-7 w-[56px]">
              <MediaSlot {...item.icon} aspect="aspect-square" />
            </div>
          )}
          <h3 className="text-[18px] font-medium tracking-[-0.01em] text-ink">{item.title}</h3>
          <p className="mt-3 text-[14px] leading-[1.7] text-muted">{item.body}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
