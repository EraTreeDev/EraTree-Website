import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { articles } from "@/content/articles";

const routes = [
  "",
  "/canada",
  "/us",
  "/security",
  "/contact",
  "/learn",
  "/privacy-policy",
  "/terms-of-use",
  "/risk-disclosure",
  ...articles.map((a) => `/learn/${a.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
