/** @type {import('next').NextConfig} */
const WWW = [{ type: "host", value: "www.eratree.io" }];

/**
 * Paths the previous site published and search engines still hold. They 404ed
 * after the rebuild, so each one is mapped to its replacement.
 */
const RENAMED = [
  // Published by the previous site.
  ["/privacy", "/privacy-policy"],
  ["/terms", "/terms-of-use"],
  ["/disclosure", "/risk-disclosure"],
  ["/blog", "/learn"],

  // Printed on the client onboarding forms. Unhyphenated, and never served by
  // either site — clients were being asked to accept documents at dead links.
  ["/termsofuse", "/terms-of-use"],
  ["/privacypolicy", "/privacy-policy"],
  ["/riskdisclosure", "/risk-disclosure"],

  // Near misses worth catching so a stale document never 404s again.
  ["/terms-and-conditions", "/terms-of-use"],
  ["/privacy-notice", "/privacy-policy"],
  ["/risk-disclosure-statement", "/risk-disclosure"],
];

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Two rules, not one. With a single "/:path*" the optional segment also
      // matches empty at the root, and Next leaves the literal ":path*" in an
      // absolute destination — which sent www.eratree.io to a 404. ":path+"
      // requires at least one segment, so the root needs its own rule.
      { source: "/", has: WWW, destination: "https://eratree.io/", permanent: true },
      { source: "/:path+", has: WWW, destination: "https://eratree.io/:path+", permanent: true },

      ...RENAMED.map(([source, destination]) => ({ source, destination, permanent: true })),

      // Article slugs carried over unchanged, so one wildcard covers all 12.
      { source: "/blog/:slug", destination: "/learn/:slug", permanent: true },
    ];
  },
};
export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
