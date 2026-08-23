import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "light" | "outline";

const base =
  "inline-flex items-center justify-center rounded-full font-medium leading-none transition-[transform,box-shadow,background-color] duration-200 ease-out active:scale-[.98]";

const variants: Record<Variant, string> = {
  /** #073D30, sampled from the reference submit button. */
  primary: "bg-forest text-white hover:-translate-y-px hover:bg-forest-hover",
  light: "bg-paper text-forest hover:-translate-y-px hover:shadow-card",
  outline: "border border-line bg-transparent text-ink hover:-translate-y-px hover:bg-surface",
};

export function Button({
  href,
  children,
  variant = "primary",
  type,
  className = "",
  fullWidthOnMobile = false,
  disabled = false,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  type?: "submit" | "button";
  className?: string;
  fullWidthOnMobile?: boolean;
  disabled?: boolean;
}) {
  const classes = [
    base,
    variants[variant],
    fullWidthOnMobile ? "w-full sm:w-auto" : "",
    "px-6 py-[14px] text-[15px]",
    disabled ? "pointer-events-none opacity-60" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
