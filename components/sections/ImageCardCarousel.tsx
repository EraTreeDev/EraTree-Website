"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Media } from "@/components/visuals/MediaSlot";

export type Slide = { title: string; body: string; image: Media };

/**
 * Dark photo cards with dot pagination.
 *
 * The track starts at the container's left edge and bleeds off the right of the
 * viewport, matching the reference where the third card is clipped. Built on
 * native scroll-snap so touch, trackpad and keyboard all work without JS; the
 * dots are a progressive enhancement.
 */
export function ImageCardCarousel({ slides }: { slides: readonly Slide[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const card = el.children[0] as HTMLElement | undefined;
    const step = card ? card.offsetWidth + 15 : el.clientWidth;
    setPages(max <= 1 ? 1 : Math.min(slides.length, Math.ceil(max / step) + 1));
    setActive(max <= 0 ? 0 : Math.round(el.scrollLeft / step));
  }, [slides.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  function goTo(i: number) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    if (!card) return;
    // Smooth scrolling is compositor-driven, so it silently does nothing when
    // animation frames aren't running. Jump instantly for reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - pad, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <div>
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-[15px] overflow-x-auto pb-2 pr-5 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none",
          // Aligns the first card with the container gutter (128px at 1440),
          // while the track itself keeps running to the viewport edge.
          paddingLeft: "max(1.25rem, calc((100vw - 1264px) / 2 + 2.5rem))",
          // Without a matching scroll-padding, snap-start would scroll the left
          // padding away and butt the first card against the viewport edge.
          scrollPaddingLeft: "max(1.25rem, calc((100vw - 1264px) / 2 + 2.5rem))",
        }}
      >
        {/*
          The supplied artwork is the whole card: a dark photograph with empty
          space at the top for the copy. So the image is the card background and
          the text sits over it, rather than stacking image beneath text.
        */}
        {slides.map((s) => (
          <li
            key={s.title}
            className="relative aspect-[980/1252] w-[80%] shrink-0 snap-start overflow-hidden rounded-card bg-band-dark sm:w-[58%] lg:w-[452px]"
          >
            {s.image.src && (
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width ?? 980}
                height={s.image.height ?? 1252}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 58vw, 452px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="relative p-8">
              <h3 className="text-[22px] font-medium tracking-[-0.01em] text-white">{s.title}</h3>
              <p className="mt-3 max-w-[330px] text-[14px] leading-[1.65] text-white/70">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {pages > 1 && (
        <div className="mt-7 flex justify-center gap-2" role="tablist" aria-label="Slides">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${slides[i]?.title ?? `slide ${i + 1}`}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                i === active ? "w-6 bg-ink" : "w-1.5 bg-line-strong hover:bg-muted"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
