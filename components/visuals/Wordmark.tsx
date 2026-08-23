import Image from "next/image";

/**
 * Supplied lockup, 268×67 (4:1). Two files: a dark mark for light surfaces and a
 * white mark for the footer band.
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
      src={onDark ? "/images/eratree-logo-white.png" : "/images/eratree-logo.png"}
      alt="Eratree"
      width={268}
      height={67}
      priority={priority}
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );
}
