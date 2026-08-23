/**
 * The Security hero animation was exported on a background that doesn't match
 * the page white, so its edges would show as a hard rectangle. This wraps it in
 * four white gradient strips — top, right, bottom, left — that fade inward, so
 * the frame dissolves into the page instead of ending abruptly.
 *
 * Four separate strips (rather than a single CSS mask) keep this working in
 * every browser and let each side be tuned independently.
 */
export function FeatheredVideo({
  src,
  alt,
  className = "",
  /** How far each gradient reaches inward, as a % of the box. */
  feather = 16,
  /**
   * Where the subject sits inside the source frame, for `object-position`.
   * These animations are 16:9 with the artwork off-centre and surrounded by
   * white, so cropping to the subject is what makes it read at a usable size.
   */
  objectPosition = "50% 50%",
  /** Extra zoom on top of the crop, e.g. 1.12. */
  scale = 1,
}: {
  src: string;
  alt: string;
  className?: string;
  feather?: number;
  objectPosition?: string;
  scale?: number;
}) {
  const stops = `#FFFFFF 0%, rgba(255,255,255,0.86) 35%, rgba(255,255,255,0) 100%`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        className="h-full w-full object-cover"
        style={{ objectPosition, transform: scale === 1 ? undefined : `scale(${scale})` }}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
        role={alt ? "img" : "presentation"}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span
          className="absolute inset-x-0 top-0"
          style={{ height: `${feather}%`, background: `linear-gradient(to bottom, ${stops})` }}
        />
        <span
          className="absolute inset-x-0 bottom-0"
          style={{ height: `${feather}%`, background: `linear-gradient(to top, ${stops})` }}
        />
        <span
          className="absolute inset-y-0 left-0"
          style={{ width: `${feather}%`, background: `linear-gradient(to right, ${stops})` }}
        />
        <span
          className="absolute inset-y-0 right-0"
          style={{ width: `${feather}%`, background: `linear-gradient(to left, ${stops})` }}
        />
      </div>
    </div>
  );
}
