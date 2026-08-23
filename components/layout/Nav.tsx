"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Wordmark } from "@/components/visuals/Wordmark";
import { Container } from "@/components/ui/Container";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  // Pill gains blur/opacity once the page scrolls past ~40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, trap focus and wire Esc while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="pointer-events-none sticky top-0 z-40 pt-5">
      <Container>
      <div
        className={`pointer-events-auto flex w-full items-center justify-between rounded-full border px-5 py-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out sm:px-6 lg:h-[55px] lg:py-0 ${
          scrolled
            ? "border-line/80 bg-paper/80 shadow-nav backdrop-blur-xl backdrop-saturate-150"
            : "border-line/50 bg-gradient-to-b from-paper to-[#F1F2F2] shadow-nav"
        }`}
      >
        <Link href="/" aria-label="Eratree home" className="rounded-full lg:flex-1">
          <Wordmark height={24} priority />
        </Link>

        {/* Links sit centred in the pill; the trailing spacer balances the logo. */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-0.5 py-2 text-[15px] transition-colors hover:text-ink ${
                      active ? "font-medium text-ink" : "text-ink/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div aria-hidden="true" className="hidden lg:block lg:flex-1" />

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-1 grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="pointer-events-auto fixed inset-0 z-50 flex flex-col bg-paper px-5 pb-10 pt-5 sm:px-8 lg:hidden"
        >
          <div className="flex h-[52px] items-center justify-between">
            <Link href="/" aria-label="Eratree home">
              <Wordmark height={24} />
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="-mr-1 grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <span className="sr-only">Close menu</span>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-[56px] items-center border-b border-line text-[22px] font-medium tracking-[-0.01em] text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
