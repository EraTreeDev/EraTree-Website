# EraTree website

Marketing site for EraTree — the institutional OTC digital asset desk in Evera Group Holdings.
Next.js 15 (App Router) · TypeScript · Tailwind · Motion · Geist Sans + Geist Mono.

```bash
npm install
npm run dev     # http://localhost:3220
npm run build
```

## Design source of truth

`design-reference/` holds the nine signed-off screenshots, exported at 2340px wide —
a **1440 design frame at 1.625×**. To compare, downscale a reference to 1440 and diff
section boundaries; don't eyeball colours.

Every colour in `tailwind.config.ts` was **pixel-sampled from those PNGs**, not taken from
the written brief, whose values are all approximations. Notably:

| Token | Sampled | Brief said |
|---|---|---|
| `surface` | `#F5F8F8` | `#F1F4F3` |
| `forest` (buttons) | `#073D30` | `#0B3D2E` |
| `emerald` (accents) | `#0E7A5F` | `#0F9E7A` |
| `teal-deep` (hero line) | `#04534E` | — |

There are **four distinct dark surfaces** — `night` `#0B0C0E` (footer), `band-dark` `#101914`
(Home liquidity band), `band-darker` `#08100C` (Security), and the CTA gradient. They are
close but genuinely different; don't collapse them.

The CTA gradient was fitted by grid-sampling the reference: a radial glow centred at
(52%, 33%). Mean error across nine probe points is 2.3/255.

**Geometry**: content column is 1184px (container `max-w-[1264px]` + 40px padding), giving
the 128px side margin the reference uses at 1440.

## Structure

- `content/pages.ts` — all marketing copy. Edit copy here, not in JSX.
- `content/site.ts` — nav, footer, legal entities, the shared CTA form strings.
- `content/legal/*.ts` — generated; see below.
- `components/sections/` — Hero, FeatureCardGrid, StickyScrollSection, StatStrip,
  CurrencyPillRow, ImageCardCarousel, DarkList, ContactCTABanner, ArticleCard,
  LegalDocLayout, RegionPage.
- `components/visuals/MediaSlot.tsx` — **every hero visual and card icon routes through
  this**. Pass `kind: "image" | "lottie" | "video"` and a `src` under `/public`. With no
  `src` it renders a neutral skeleton, so dropping in the real artwork is a data change in
  `content/`, never a component change.

`/canada` and `/us` are one `RegionPage` with a `region` prop — they differ only in
headline, settlement line, hero graphic, and whether the currency row appears.

### Motion

Uses `motion` (the current package for Framer Motion), imported from `motion/react`.
Framer Motion v11 does not hydrate correctly with React 19 here.

`Reveal` writes its hidden state as an inline style during SSR, and animation frames are
throttled in background tabs. So `globals.css` forces `[data-reveal] { opacity: 1 }` under
`prefers-reduced-motion`, and `layout.tsx` carries a `<noscript>` fallback. **Text must
never depend on an animation frame to become visible** — keep both guards if you touch the
motion layer.

## Legal pages

`content/legal/{privacy,terms,disclosure}.ts` are **generated**, not hand-written. They are
pulled verbatim from the live site:

```bash
node scripts/extract-legal.js
```

The cached source HTML lives in `scripts/source-html/`. To refresh, re-download the three
pages from `eratree.io/{privacy,terms,disclosure}` into that folder and re-run.

This is regulated disclosure copy — **never reword, summarise or reflow clause text**. The
live pages mark most section titles as plain `<p>`; the extractor promotes them to real
`<h2>`/`<h3>` so the documents have proper structure for screen readers.

Current state: Privacy (12 sections, ~2,860 words, updated 31 Jul 2025), Terms (22 sections,
~4,250 words, 26 Jun 2025), Risk Disclosure (3 sections, ~640 words, 01 Dec 2025).

## Assets

All artwork is wired. Files were **renamed to URL-safe kebab-case** on the way in — the
originals had spaces, `&`, apostrophes and an en-dash, which are fragile in URLs:

| Where | File |
|---|---|
| Home hero | `animations/hero-landing.mp4` |
| Security hero | `animations/security-hero.mp4` |
| Canada / US hero | `graphics/canada-hero.png`, `graphics/us-hero.png` |
| Home "Deep liquidity" rows | `icons/{compliance,trust-security,seamless-trading}.png` (96px) |
| Canada / US cards | `icons/card-*.png` (180px) |
| Currency pills | `icons/flags/{usd,cad,eur,…}.svg`, named by currency code |
| Carousel | `images/carousel-*.png` |
| Header / footer logo | `images/eratree-logo.png`, `images/eratree-logo-white.png` |
| /learn thumbnail | `images/blog-image.png` |

Both hero videos are 1280×720. Neither sits on pure page white — the landing one is
cyan-tinted (`rgb(250,255,255)`), which showed as a hard rectangle — so both run through
`components/visuals/FeatheredVideo.tsx`, which fades all four edges to white.

The security animation only fills ~39% of its frame width, so it is centre-cropped to a
square; the landing one fills the frame and stays 16:9.

The 19 currency flags mirror the live eratree.io row exactly, in the same order, and were
taken from it. They are SVGs, so `CurrencyPillRow` passes `unoptimized` to `next/image` —
the optimizer refuses SVG unless `dangerouslyAllowSVG` is set globally.

## Before launch

1. **Set the contact form's env vars.** `app/api/contact/route.ts` delivers to
   `sales@eratree.io` through Resend. Set `RESEND_API_KEY` in the host (see `.env.example`,
   plus optional `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL`); the sender domain must be
   verified in Resend. Without a key the route logs and 200s in dev, but 500s in production.
2. **Set the canonical domain** in `content/site.ts` (`site.url`) — it drives canonical
   URLs, Open Graph and the sitemap.
3. **Add an `og:image`.** Metadata is wired but there is no share image yet.

## Deviations from the reference

- The reference renders "Private, precise, **cotrolled**". Ships as "controlled".
- `/learn` shows the same sample article four times in the reference; that placeholder is
  kept, with a TODO in `content/pages.ts`.
- The header and footer use the supplied `eratree-logo` lockups.
- The carousel carries four cards (the reference had three); the fourth, "Deep Liquidity",
  uses the extra image supplied and needed new copy — reword it in `content/pages.ts`.

## Verified

Build clean, 15 routes. No horizontal overflow on any of the nine pages at 375/768/1024/1440.
WCAG AA contrast passes on all pages including gradient surfaces. Two-tone focus ring is
visible on every surface (worst case 6.9:1). Mobile menu traps focus, locks scroll, closes on
Esc and restores focus. Contact form validates, enforces the consent checkbox, focuses the
first error, and handles success/error. One `<h1>` and a unique title/description per page.
