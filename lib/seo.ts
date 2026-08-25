import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Next merges metadata one key deep: a page that sets `openGraph` replaces the
 * root layout's object outright rather than merging into it. Every page here
 * sets one, so og:site_name, og:locale and og:type were being dropped site-wide.
 * Build the object through this helper so the shared fields always survive.
 */
export function openGraph(
  o: NonNullable<Metadata["openGraph"]>,
): NonNullable<Metadata["openGraph"]> {
  return { siteName: site.legalName, locale: "en_US", type: "website", ...o };
}

/** Serialises JSON-LD for a <script type="application/ld+json"> tag. */
export function jsonLd(data: Record<string, unknown>) {
  // Only "<" needs escaping to keep the payload from closing the script tag.
  return { __html: JSON.stringify(data).replace(/</g, "\u003c") };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  url: site.url,
  logo: `${site.url}/images/eratree-logo-dark.svg`,
  description: site.description,
  email: site.contactEmail,
  sameAs: ["https://www.linkedin.com/company/eratree/"],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  serviceType: "Over-the-counter digital asset trading",
  subOrganization: [
    {
      "@type": "Organization",
      name: "EraTree Inc.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2106 House Ave, Suite 186",
        addressLocality: "Cheyenne",
        addressRegion: "WY",
        postalCode: "82001",
        addressCountry: "US",
      },
      identifier: "FinCEN Number: 31000299834255",
    },
    {
      "@type": "Organization",
      name: "EraTree Technologies Inc.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "402-4655 54 Ave NE",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T3J 3Z4",
        addressCountry: "CA",
      },
      identifier: "FINTRAC: M21709997",
    },
  ],
} as const;
