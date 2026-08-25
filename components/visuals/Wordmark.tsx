import Image from "next/image";

/**
 * Supplied lockup, 369×91. Two SVGs: a dark mark for light surfaces and a white
 * mark for the footer band.
 */
export function Wordmark({
  onDark = false,
  /** Rendered height in px; width follows the 4:1 ratio. */
  height = 26,
  className = "",
  priority = false,
}: {
  onDark?: boolean;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={onDark ? "/images/eratree-logo-white.svg" : "/images/eratree-logo-dark.svg"}
      alt="Eratree"
      width={369}
      height={91}
      priority={priority}
      // Next's optimizer refuses SVG unless dangerouslyAllowSVG is set globally.
      unoptimized
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}
