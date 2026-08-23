/**
 * Marketing copy transcribed from the reference screenshots in design-reference/.
 *
 * One deliberate deviation: the reference renders the heading "Private, precise,
 * cotrolled" — a typo. It ships here as "controlled".
 */

import type { Feature } from "@/components/sections/FeatureCardGrid";

export const contact = {
  meta: {
    title: "Contact",
    description:
      "Speak directly with the EraTree trading team about OTC trades, onboarding, settlement requirements or institutional liquidity.",
  },
  hero: {
    eyebrow: "Contact Eratree",
    heading: ["Speak directly with", "our trading team."],
    sub: "Whether you're exploring an OTC trade, onboarding, settlement requirements, or institutional liquidity, tell us what you need and a member of our team will follow up.",
  },
};

/**
 * The flag row under "Trade digital assets…". Flags are ~90×60 PNGs in
 * public/icons/flags, named by currency code.
 */
export const currencies = [
  { code: "USD", country: "United States" },
  { code: "CAD", country: "Canada" },
  { code: "EUR", country: "the European Union" },
  { code: "GBP", country: "the United Kingdom" },
  { code: "CNY", country: "China" },
  { code: "TWD", country: "Taiwan" },
  { code: "HKD", country: "Hong Kong" },
  { code: "SGD", country: "Singapore" },
  { code: "KRW", country: "South Korea" },
  { code: "INR", country: "India" },
  { code: "AUD", country: "Australia" },
  { code: "MXN", country: "Mexico" },
  { code: "BRL", country: "Brazil" },
  { code: "SAR", country: "Saudi Arabia" },
  { code: "ILS", country: "Israel" },
] as const;

export const globalReach = {
  eyebrow: "Global reach",
  heading: ["Trade digital assets from", "30+ fiat currencies."],
};

/** The four trading cards, shared by /canada and /us. */
const tradingCards: Feature[] = [
  {
    title: "Trust and security",
    body: "EraTree is committed to providing a secure and trustworthy platform for digital asset trading, offering adaptive infrastructure and deep-rooted trust. Our core values center on delivering discreet and scalable solutions that define an era of transformation.",
    icon: { src: "/icons/card-trust-security.png", alt: "" },
  },
  {
    title: "Seamless trading",
    body: "At EraTree, we focus on the seamless exchange of fiat and cryptocurrency to enable secure and efficient digital asset transactions. We support institutional-grade transaction execution while maintaining a high standard of regulatory compliance.",
    icon: { src: "/icons/card-seamless-trading.png", alt: "" },
  },
  {
    title: "Personalized Service",
    body: "We are dedicated to providing personalized support to institutions, wealth managers, and digital asset investors. Our team works closely with you to tailor solutions that meet your specific needs and aspirations in the digital asset landscape.",
    icon: { src: "/icons/card-personalized-service.png", alt: "" },
  },
  {
    title: "Competitive Pricing",
    body: "EraTree offers transparent and competitive pricing across fiat currencies like USD and CAD, as well as digital assets including BTC and USDC. Our deep liquidity access and streamlined infrastructure allow us to minimize spreads and reduce transaction costs across 30+ fiat currencies.",
    icon: { src: "/icons/card-competitive-pricing.png", alt: "" },
  },
];

export const regions = {
  ca: {
    slug: "/canada",
    meta: {
      title: "Canada",
      description:
        "Secure, discreet OTC trading for Canadian HNWIs and institutions. Trade BTC, USDC, USD and CAD with tight spreads and fast settlement.",
    },
    heading: ["EraTree OTC for HNWIs", "and Institutions in Canada"],
    sub: "Secure, discreet OTC trading for Canadian HNWIs and institutions. Trade BTC, USDC, USD, and CAD with tight spreads, fast settlement, and personalized support.",
    highlight: "Fiat settlement available with EFT and Wires.",
    media: {
      src: "/graphics/canada-hero.png",
      alt: "A shield bearing a maple leaf and a Bitcoin coin, representing regulated Canadian custody.",
      width: 808,
      height: 915,
    },
    /** The reference Canada page has no currency row at all — only the US page does. */
    showCurrencyRow: false,
    cards: tradingCards,
  },
  us: {
    slug: "/us",
    meta: {
      title: "United States",
      description:
        "Secure, discreet OTC trading for US HNWIs and institutions. Trade BTC, USDC and USD with tight spreads and fast settlement.",
    },
    heading: ["EraTree OTC for HNWIs", "and Institutions."],
    sub: "Secure, discreet OTC trading for selected HNWIs and institutions. Trade BTC, USDC and USD with tight spreads, fast settlement, and personalized support.",
    highlight: "Fiat settlement available with SWIFT/Fed Wires and ACH.",
    media: {
      src: "/graphics/us-hero.png",
      alt: "A shield held in cupped hands above a Bitcoin coin, representing safeguarded US settlement.",
      width: 808,
      height: 864,
    },
    showCurrencyRow: true,
    cards: tradingCards,
  },
} as const;

export const tradingWith = {
  eyebrow: "Trading with Eratree",
  heading: ["Private, precise,", "controlled"],
  body: "Reduce market impact, protect privacy, and deploy capital with personalized support from our experienced trading team.",
  cta: { label: "Get started", href: "/contact" },
};

export const home = {
  meta: {
    title: "EraTree — Institutional OTC digital asset desk",
    description:
      "Institutional-grade OTC desk for high-value crypto transactions with deep liquidity and private execution.",
  },
  hero: {
    heading: ["Build for trust. Grow", "with confidence."],
    sub: "Institutional-grade OTC desk for high-value crypto transactions with deep liquidity and private execution.",
    cta: { label: "Contact us", href: "/contact" },
    media: {
      src: "/animations/hero-landing.mp4",
      kind: "video" as const,
      alt: "A wireframe globe of connected points, representing global trading reach.",
      aspect: "aspect-video",
    },
  },
  stats: [
    {
      index: "01",
      title: "Global Reach",
      body: "Trade digital assets and access 30+ global currencies.",
    },
    {
      index: "02",
      title: "Personalized Service",
      body: "A dedicated trade team member keeps every detail aligned.",
    },
    {
      index: "03",
      title: "Risk Aware",
      body: "Bespoke execution designed to minimize market impact.",
    },
    {
      index: "04",
      title: "Competitive Pricing",
      body: "Dynamic pricing responsive to your volume and growth.",
    },
  ],
  liquidity: {
    eyebrow: "Purpose-built execution",
    heading: ["Deep liquidity.", "Rapid settlement."],
    body: "EraTree focuses on executing your trades at the best possible price, and settling the trade as soon as practical.",
    items: [
      {
        title: "Compliance first",
        body: "Proactive compliance integrated throughout the transaction lifecycle.",
        icon: { src: "/icons/compliance.png", alt: "" },
      },
      {
        title: "Trust & security",
        body: "Institutional-grade controls and non-custodial execution.",
        icon: { src: "/icons/trust-security.png", alt: "" },
      },
      {
        title: "Seamless trading",
        body: "Efficient exchange between fiat and cryptocurrency.",
        icon: { src: "/icons/seamless-trading.png", alt: "" },
      },
    ],
  },
  carousel: {
    heading: "Build with Trust. Grow with Confidence.",
    body: "Secure, discreet OTC trading for HNWIs and institutions. Trade between BTC, ETH, Stablecoins, and 30+ fiat currencies with tight spreads, fast settlement, and personalized support.",
    slides: [
      {
        title: "Trust & Security",
        body: "EraTree is committed to providing a secure and trustworthy platform for digital asset trading, offering adaptive infrastructure you can trust.",
        image: {
          src: "/images/carousel-trust-security.png",
          alt: "",
          width: 980,
          height: 1252,
        },
      },
      {
        title: "Seamless Fiat",
        body: "We focus on the seamless exchange of fiat and cryptocurrency to enable secure and efficient digital asset transactions.",
        image: {
          src: "/images/carousel-seamless-fiat.png",
          alt: "",
          width: 980,
          height: 1252,
        },
      },
      {
        title: "Cross Border",
        body: "Serving high-net-worth individuals and institutions across Canada and the United States. Access Bitcoin, Ethereum, and Stablecoins with settlement in 30+ currencies.",
        image: {
          src: "/images/carousel-cross-border.png",
          alt: "",
          width: 980,
          height: 1252,
        },
      },
      {
        title: "Deep Liquidity",
        body: "Execution at the best available price with settlement as soon as practical, backed by direct access to institutional liquidity.",
        image: {
          src: "/images/carousel-deep-liquidity.png",
          alt: "",
          width: 980,
          height: 1252,
        },
      },
    ],
  },
  service: {
    heading: ["Liquidity you need,", "the service you want."],
    body: "Transparent pricing, experienced trade team, and processes designed for clients moving meaningful size.",
    columns: [
      { title: "Fiat", body: "CAD, USD, EUR, and 30+ other currencies" },
      { title: "Direct", body: "Access to experienced market specialists" },
      { title: "Crypto", body: "Bitcoin, Ethereum, USDC…" },
    ],
  },
};

export const security = {
  meta: {
    title: "Security & Compliance",
    description:
      "EraTree operates as a regulated OTC digital asset desk under FINTRAC and FinCEN oversight, with non-custodial settlement and full AML/KYC compliance.",
  },
  hero: {
    eyebrow: "OTC digital asset trading",
    heading: ["Liquidity you need,", "the safety you want."],
    sub: "EraTree operates as a regulated OTC digital asset desk under FINTRAC and FinCEN oversight — providing institutional clients with deep liquidity, non-custodial settlement, and full AML/KYC compliance.",
    badges: ["FINTRAC", "FINCEN", "PCMLTFA", "BSA"],
    media: {
      src: "/animations/security-hero.mp4",
      kind: "video" as const,
      alt: "A radial diagram of concentric compliance layers around a central asset.",
      aspect: "aspect-video",
    },
  },
  pillars: {
    eyebrow: "Compliance pillars",
    heading: "Eratree compliance",
    body: "Our institutional-grade infrastructure is built for stability and transparency. We integrate proactive security protocols across the entire asset lifecycle to ensure safety without compromising speed.",
    items: [
      {
        index: "01",
        title: "Trust & Security",
        body: "Committed to providing a secure and trustworthy platform for digital asset trading. Adaptive infrastructure with institutional-grade account controls.",
      },
      {
        index: "02",
        title: "Seamless Trading",
        body: "Focused on seamless exchange of fiat and cryptocurrency. Enabling secure, efficient digital asset transactions with global liquidity.",
      },
      {
        index: "03",
        title: "Compliance First",
        body: "Proactive compliance integrated throughout, ensuring adherence to the evolving regulatory digital asset landscape. Client Reviews as standard.",
      },
      {
        index: "04",
        title: "Information Security",
        body: "Robust account security controls to protect client information. Operating in full compliance with Canada's PIPEDA and US standards.",
      },
      {
        index: "05",
        title: "Regulatory Compliance",
        body: "A risk-based approach to meeting all legal requirements within PCMLTFA, BSA, and associated regulations with continuous monitoring.",
      },
      {
        index: "06",
        title: "Asset Safety",
        body: "Fiat assets are held exclusively with trusted banking partners — as a non-custodial OTC desk, assets are never at risk within the platform.",
      },
    ] satisfies Feature[],
  },
  framework: {
    eyebrow: "Regulatory framework",
    heading: "Built on solid ground",
    body: "Our compliance architecture spans every layer of the digital asset lifecycle — from onboarding through settlement - anchored in internationally recognised standards and supported by continuous monitoring.",
    tags: [
      "Data protection",
      "FATF standards",
      "BSA",
      "Blockchain forensics",
      "Global banking partners",
      "Registered MSB",
      "Client maintenance reviews",
      "Cybersecurity controls",
      "PIPEDA",
      "AML program",
    ],
    items: [
      {
        title: "Transaction monitoring",
        body: "Continuous monitoring across the full transaction lifecycle.",
      },
      {
        title: "Travel rule",
        body: "Information-sharing controls aligned with digital asset transfer requirements.",
      },
      {
        title: "KYT framework",
        body: "Risk-based screening and monitoring of digital asset activity.",
      },
      {
        title: "SAR compliance",
        body: "Escalation and reporting workflows for suspicious activity.",
      },
      {
        title: "PCMLTFA compliance",
        body: "Controls aligned with Canadian AML and regulatory obligations.",
      },
      {
        title: "Chain analytics",
        body: "Blockchain intelligence, screening, and forensic monitoring.",
      },
    ],
  },
  closing: {
    eyebrow: "We focus on you",
    heading: "Work with an OTC desk that puts you first.",
    body: "Institutional liquidity meets regulatory rigour. Get started with a secure account today.",
  },
};

export const learn = {
  meta: {
    title: "Learn",
    description:
      "Research, education, and market perspectives on Bitcoin, stablecoins, institutional adoption, payments, and digital asset infrastructure.",
  },
  hero: {
    eyebrow: "Eratree insights",
    heading: ["Insights for the evolving", "digital asset market."],
    sub: "Research, education, and market perspectives on Bitcoin, stablecoins, institutional adoption, payments, and digital asset infrastructure.",
  },
  // TODO: replace with real articles. The reference repeats one sample card four times.
  articles: [
    {
      slug: "how-to-buy-bitcoin",
      readingTime: "2 min read",
      title: "How to buy Bitcoin",
      excerpt:
        "Bitcoin was launched in 2009, and more than seventeen years later it has evolved from a niche experiment into a globally recognized financial asset. Over that time, Bitcoin has steadily gained credibility as its network has proven resilient across multiple market cycles, regulatory scrutiny, and periods of extreme volatility.",
      image: { src: "/images/blog-image.png", alt: "", width: 478, height: 418 },
    },
  ],
};
