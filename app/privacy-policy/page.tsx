import type { Metadata } from "next";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { privacy } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How EraTree collects, uses, discloses and protects personal information across Canada and the United States.",
  openGraph: { title: "Privacy Policy", description: "How EraTree collects, uses, discloses and protects personal information across Canada and the United States.", url: "/privacy-policy" },
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalDocLayout doc={privacy} />;
}
