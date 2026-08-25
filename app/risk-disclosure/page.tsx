import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { disclosure } from "@/content/legal/disclosure";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description: "Terms, conditions and inherent risks associated with virtual asset transactions conducted through EraTree.",
  openGraph: openGraph({ title: "Risk Disclosure", description: "Terms, conditions and inherent risks associated with virtual asset transactions conducted through EraTree.", url: "/risk-disclosure" }),
  alternates: { canonical: "/risk-disclosure" },
};

export default function Page() {
  return <LegalDocLayout doc={disclosure} />;
}
