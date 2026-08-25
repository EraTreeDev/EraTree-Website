/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        // www -> apex, preserving the path. 308 (permanent) so browsers and
        // search engines treat eratree.io as the single canonical origin.
        source: "/:path*",
        has: [{ type: "host", value: "www.eratree.io" }],
        destination: "https://eratree.io/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
