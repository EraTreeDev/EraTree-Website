import type { MetadataRoute } from "next";
import { site } from "@/content/site";

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
