import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "EraTree — Institutional OTC digital asset desk",
    template: "%s | EraTree",
  },
  description: site.description,
  openGraph: { type: "website", siteName: site.legalName, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0B0C0E" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Without JS the scroll observers never fire, so reveal targets would
            stay at opacity 0. Show them immediately instead. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>[style*="opacity:0"],[style*="opacity: 0"]{opacity:1 !important;transform:none !important}</style>`,
          }}
        />
      </head>
      {/*
        Extensions (Grammarly and friends) stamp attributes like
        data-gr-ext-installed onto <body> before React hydrates, which trips a
        hydration mismatch in the console. Suppressing here covers only this
        element's attributes — mismatches inside the tree still warn.
      */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
