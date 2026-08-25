import type { Metadata } from "next";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { vcCanada } from "@/content/legal/vc-canada";

const description =
  "The agreement governing the purchase and sale of virtual currency between EraTree and its Canadian customers.";

/**
 * Unlisted: reachable by direct link only — not in the nav, footer, or sitemap,
 * and noindex so search engines drop it.
 *
 * Deliberately NOT added to robots.txt: a Disallow there would stop crawlers
 * fetching the page at all, so they'd never see this noindex and the bare URL
 * could still surface. Allowing the crawl is what lets the directive work.
 */
export const metadata: Metadata = {
  title: "Virtual Currency Agreement — Canada",
  description,
  openGraph: {
    title: "Virtual Currency Agreement — Canada",
    description,
    url: "/vc-agreement-canada",
  },
  robots: { index: false, follow: false },
  alternates: { canonical: "/vc-agreement-canada" },
};

export default function Page() {
  return <LegalDocLayout doc={vcCanada} />;
}
