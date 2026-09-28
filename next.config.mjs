/** @type {import('next').NextConfig} */

const CANONICAL = "https://eratree.com";

/**
 * Hostnames that should hand their traffic to the canonical origin.
 *
 * eratree.io is the previous domain and keeps answering indefinitely — its DNS
 * still carries company email, which is untouched by anything here. HTTP
 * redirects and mail routing are independent.
 */
const FORWARDED_HOSTS = ["www.eratree.com", "eratree.io", "www.eratree.io"];

/**
 * Two rules per host, never one. "/:path*" also matches empty at the root, and
 * Next leaves the literal ":path*" in an absolute destination — which once sent
 * the bare domain to a 404. ":path+" requires at least one segment, so the root
 * gets its own rule.
 */
const forward = (host) => [
  {
    source: "/",
    has: [{ type: "host", value: host }],
    destination: `${CANONICAL}/`,
    permanent: true,
  },
  {
    source: "/:path+",
    has: [{ type: "host", value: host }],
    destination: `${CANONICAL}/:path+`,
    permanent: true,
  },
];

/** Paths the previous site published, plus the spellings printed on the client
 *  onboarding forms. Kept so old links and signed documents keep resolving. */
const RENAMED = [
  ["/privacy", "/privacy-policy"],
  ["/terms", "/terms-of-use"],
  ["/disclosure", "/risk-disclosure"],
  ["/blog", "/learn"],
  ["/termsofuse", "/terms-of-use"],
  ["/privacypolicy", "/privacy-policy"],
  ["/riskdisclosure", "/risk-disclosure"],
  ["/terms-and-conditions", "/terms-of-use"],
  ["/privacy-notice", "/privacy-policy"],
  ["/risk-disclosure-statement", "/risk-disclosure"],
];

const nextConfig = {
  reactStrictMode: true,
  /**
   * The hero poster is the LCP on both of these pages, and nothing was
   * preloading it — a <video poster> is not fetched early by the browser, and
   * Next emits no hint for it.
   *
   * These are HTTP `Link` headers rather than HTML tags on purpose: Cloudflare
   * Early Hints promotes `Link` headers into a 103, and ignores markup. So this
   * preloads the poster on its own, and is also the thing Early Hints needs.
   */
  async headers() {
    const preload = (href) => ({
      key: "Link",
      value: `<${href}>; rel=preload; as=image; fetchpriority=high`,
    });
    return [
      { source: "/", headers: [preload("/graphics/hero-glass-poster-2560.webp")] },
      { source: "/security", headers: [preload("/graphics/security-hero-poster.webp")] },
    ];
  },
  async redirects() {
    return [
      ...FORWARDED_HOSTS.flatMap(forward),
      ...RENAMED.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/blog/:slug", destination: "/learn/:slug", permanent: true },
    ];
  },
};
export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
