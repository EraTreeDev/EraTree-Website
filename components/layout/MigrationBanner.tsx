"use client";

import { useCallback } from "react";
import { Container } from "@/components/ui/Container";

/** Kept in sync with the pre-paint script in app/layout.tsx. */
const STORAGE_KEY = "eratree-domain-notice";

/**
 * Notice that the site moved from eratree.io to eratree.com.
 *
 * Rendered server-side and visible by default, so it still appears without
 * JavaScript. The pre-paint script in the document head hides it for anyone who
 * has already dismissed it, which avoids it flashing in and out on every page.
 */
export function MigrationBanner() {
  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Private mode or blocked storage — hiding for this page view is enough.
    }
    document.documentElement.setAttribute("data-domain-notice", "off");
  }, []);

  return (
    <div data-domain-banner className="border-b border-line bg-surface">
      <Container>
        <div className="flex items-center gap-4 py-2.5">
          <p className="flex-1 text-[13px] leading-[1.5] text-muted">
            <span className="font-medium text-ink">EraTree has moved to eratree.com.</span>{" "}
            You may have arrived from eratree.io, which now redirects here. This is intended —
            our services, entities, and contact details are unchanged.
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss domain change notice"
            className="-mr-1 shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-line/60 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </Container>
    </div>
  );
}
