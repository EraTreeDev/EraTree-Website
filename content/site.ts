export const site = {
  name: "Eratree",
  legalName: "EraTree",
  url: "https://eratree.io",
  description:
    "Institutional-grade OTC desk for high-value crypto transactions with deep liquidity and private execution.",
  contactEmail: "sales@eratree.io",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Canada", href: "/canada" },
  { label: "US", href: "/us" },
  { label: "Security", href: "/security" },
  { label: "Contact", href: "/contact" },
  { label: "Learn", href: "/learn" },
] as const;

export const footer = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "OTC Trading", href: "/#otc-trading" },
        { label: "Liquidity", href: "/#liquidity" },
      ],
    },
    {
      title: "Regions",
      links: [
        { label: "Canada", href: "/canada" },
        { label: "United States", href: "/us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Use", href: "/terms-of-use" },
        { label: "Risk Disclosure", href: "/risk-disclosure" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Learn", href: "/learn" },
        // No careers page — hiring runs through LinkedIn. Footer renders any
        // http(s) href as an external link.
        { label: "Careers", href: "https://www.linkedin.com/company/eratree/" },
        { label: "Contact us", href: "/contact" },
      ],
    },
  ],
  entities: [
    {
      region: "United States",
      name: "EraTree Inc.",
      address: "2106 House Ave, Suite 186, Cheyenne, WY, USA, 82001",
      registration: "FinCEN Number: 31000299834255",
    },
    {
      region: "Canada",
      name: "EraTree Technologies Inc.",
      address: "402-4655 54 Ave NE, Calgary AB T3J 3Z4, Canada",
      registration: "FINTRAC: M21709997",
    },
  ],
} as const;

/** Shared by the ContactCTABanner on every page that carries it. */
export const contactCta = {
  heading: ["Start a conversation", "with our trading team"],
  body: "Tell us what you're looking to trade, your expected volume, and settlement requirements. Our team will follow up to discuss execution, pricing, and onboarding.",
  fields: {
    name: "Your full name",
    email: "Your email",
    message: "Tell us about your trading needs, volume expectations, and preferred assets…",
  },
  consent: {
    prefix: "I agree to the",
    terms: { label: "terms and conditions", href: "/terms-of-use" },
    join: "and",
    privacy: { label: "privacy policy", href: "/privacy-policy" },
  },
  submit: "Submit trading request",
} as const;
