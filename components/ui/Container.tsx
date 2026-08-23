import { type ReactNode } from "react";

/** 1200px content column. Side gutters measured off the 1440 design frame (~125px). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-container px-5 sm:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
