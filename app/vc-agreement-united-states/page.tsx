import type { Metadata } from "next";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { vcUnitedStates } from "@/content/legal/vc-united-states";

const description =
  "The agreement governing the purchase and sale of virtual currency between EraTree and its United States customers.";

/** Unlisted: reachable by direct link only — not in the nav, footer, or sitemap. */
export const metadata: Metadata = {
  title: "Virtual Currency Agreement — United States",
  description,
  openGraph: {
    title: "Virtual Currency Agreement — United States",
    description,
    url: "/vc-agreement-united-states",
  },
  alternates: { canonical: "/vc-agreement-united-states" },
};

export default function Page() {
  return <LegalDocLayout doc={vcUnitedStates} />;
}
