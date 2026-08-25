import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { vcUnitedStates } from "@/content/legal/vc-united-states";

const description =
  "The agreement governing the purchase and sale of virtual currency between EraTree and its United States customers.";

/**
 * Unlisted: reachable by direct link only — not in the nav, footer, or sitemap,
 * and noindex so search engines drop it.
 *
 * Deliberately NOT added to robots.txt: a Disallow there would stop crawlers
 * fetching the page at all, so they'd never see this noindex and the bare URL
 * could still surface. Allowing the crawl is what lets the directive work.
 */
export const metadata: Metadata = {
  title: "Virtual Currency Agreement — United States",
  description,
  openGraph: openGraph({
    title: "Virtual Currency Agreement — United States",
    description,
    url: "/vc-agreement-united-states",
  }),
  robots: { index: false, follow: false },
  alternates: { canonical: "/vc-agreement-united-states" },
};

export default function Page() {
  return <LegalDocLayout doc={vcUnitedStates} />;
}
