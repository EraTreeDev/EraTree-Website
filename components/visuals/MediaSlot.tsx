"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type MediaKind = "image" | "lottie" | "video";

export type Media = {
  /** Path under /public, e.g. "/graphics/shield-maple.png". Omit for a skeleton. */
  src?: string;
  kind?: MediaKind;
  /** Required whenever the visual carries meaning; "" marks it decorative. */
  alt: string;
  width?: number;
  height?: number;
  /** Tailwind aspect ratio for the skeleton and video, e.g. "aspect-square". */
  aspect?: string;
  priority?: boolean;
};

/**
 * Single entry point for every hero visual and feature-card icon.
 *
 * The real animated assets are supplied separately, so this renders a neutral
 * grey skeleton until `src` is set. Swapping in artwork later is a data change
 * in content/, never a component change — pass `kind` to pick the renderer.
 */
export function MediaSlot({
  src,
  kind = "image",
  alt,
  width = 640,
  height = 640,
  aspect = "aspect-square",
  priority = false,
  className = "",
}: Media & { className?: string }) {
  if (!src) {
    return (
      <div
        aria-hidden="true"
        className={`w-full ${aspect} animate-pulse rounded-card bg-line/70 ${className}`}
      />
    );
  }

  if (kind === "video") {
    return (
      <video
        className={`w-full ${aspect} object-contain ${className}`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
        role={alt ? "img" : "presentation"}
      >
        <source src={src} />
      </video>
    );
  }

  if (kind === "lottie") {
    return <LottieSlot src={src} alt={alt} aspect={aspect} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 1024px) 100vw, 50vw"
      className={`h-auto w-full ${className}`}
    />
  );
}

/** Lazy so lottie-react never lands in the bundle for pages that don't use it. */
function LottieSlot({
  src,
  alt,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  className: string;
}) {
  const [data, setData] = useState<unknown>(null);
  const [Lottie, setLottie] = useState<React.ComponentType<{
    animationData: unknown;
    loop?: boolean;
    className?: string;
  }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([import("lottie-react"), fetch(src).then((r) => r.json())])
      .then(([mod, json]) => {
        if (cancelled) return;
        setLottie(() => mod.default);
        setData(json);
      })
      .catch(() => {
        /* Leave the skeleton in place if the animation fails to load. */
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!Lottie || !data) {
    return (
      <div
        aria-hidden="true"
        className={`w-full ${aspect} animate-pulse rounded-card bg-line/70 ${className}`}
      />
    );
  }

  return (
    <div role={alt ? "img" : "presentation"} aria-label={alt || undefined}>
      <Lottie animationData={data} loop className={`w-full ${aspect} ${className}`} />
    </div>
  );
}
