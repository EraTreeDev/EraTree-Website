import type { Metadata } from "next";
import { openGraph } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ContactCTABanner } from "@/components/sections/ContactCTABanner";
import { contact } from "@/content/pages";

export const metadata: Metadata = {
  title: contact.meta.title,
  description: contact.meta.description,
  openGraph: openGraph({ title: contact.meta.title, description: contact.meta.description, url: "/contact" }),
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Hero
        align="center"
        eyebrow={contact.hero.eyebrow}
        heading={contact.hero.heading.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
        sub={contact.hero.sub}
      />
      <div className="pt-5 pb-20 lg:pb-28">
        <ContactCTABanner />
      </div>
    </>
  );
}
