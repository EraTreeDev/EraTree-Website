import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { articles } from "@/content/articles";
import { articleDates } from "@/content/article-dates";
import { privacy } from "@/content/legal/privacy";
import { terms } from "@/content/legal/terms";
import { disclosure } from "@/content/legal/disclosure";

/**
 * Bump when the marketing pages change materially. Previously every entry was
 * stamped with `new Date()`, which told crawlers all 21 URLs changed on every
 * deploy and made lastModified worthless as a signal.
 */
const SITE_UPDATED = "2026-08-25";

/** Legal docs carry their own "Last update" line; reuse it rather than invent one. */
const asDate = (value: string, fallback: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? new Date(fallback) : d;
};

const pages: Array<[string, Date]> = [
  ["", new Date(SITE_UPDATED)],
  ["/canada", new Date(SITE_UPDATED)],
  ["/us", new Date(SITE_UPDATED)],
  ["/security", new Date(SITE_UPDATED)],
  ["/contact", new Date(SITE_UPDATED)],
  ["/learn", new Date(SITE_UPDATED)],
  ["/privacy-policy", asDate(privacy.updated, SITE_UPDATED)],
  ["/terms-of-use", asDate(terms.updated, SITE_UPDATED)],
  ["/risk-disclosure", asDate(disclosure.updated, SITE_UPDATED)],
];

export default function sitemap(): MetadataRoute.Sitemap {
  // The two VC agreements are intentionally absent — they are unlisted.
  return [
    ...pages.map(([path, lastModified]) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/learn/${a.slug}`,
      lastModified: new Date(articleDates[a.slug] ?? SITE_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
