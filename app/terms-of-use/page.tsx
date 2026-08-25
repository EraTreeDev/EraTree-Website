import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { LegalDocLayout } from "@/components/sections/LegalDocLayout";
import { terms } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing your access to and use of the EraTree website and services.",
  openGraph: openGraph({ title: "Terms of Use", description: "The terms governing your access to and use of the EraTree website and services.", url: "/terms-of-use" }),
  alternates: { canonical: "/terms-of-use" },
};

export default function Page() {
  return <LegalDocLayout doc={terms} />;
}
