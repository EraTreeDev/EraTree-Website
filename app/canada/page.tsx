import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { RegionPage } from "@/components/sections/RegionPage";
import { regions } from "@/content/pages";

const r = regions["ca"];

export const metadata: Metadata = {
  title: r.meta.title,
  description: r.meta.description,
  openGraph: openGraph({ title: r.meta.title, description: r.meta.description, url: "/canada" }),
  alternates: { canonical: "/canada" },
};

export default function Page() {
  return <RegionPage region="ca" />;
}
