import type { Config } from "tailwindcss";

/**
 * Tokens sampled directly from the reference PNGs in design-reference/ using a
 * pixel histogram — NOT transcribed from the written brief, whose hex values are
 * all approximations. Do not introduce raw hex in components; extend this file.
 *
 * Note there are FOUR distinct dark surfaces in this design. They are close but
 * genuinely different; do not collapse them into one token.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        /** Alternating light section fill. */
        surface: "#F5F8F8",
        /** Article cards on /learn — a slightly cooler tint than `surface`. */
        "surface-2": "#F2F6F6",
        line: "#DFE4E2",
        "line-strong": "#C4CCC8",

        /** Body text on light. */
        ink: "#131A17",
        muted: "#5C6662",

        /** Pill buttons (green/900 on the shared Evera ramp). */
        forest: "#073D30",
        "forest-hover": "#0A5C48",

        emerald: {
          DEFAULT: "#0E7A5F", // eyebrows, links, accents
          500: "#14A57F", // wordmark square on dark
          700: "#0A5C48", // wordmark square on light
        },
        /** Accent inside dark bands. */
        mint: "#5BD3AC",
        /** Hero "Fiat settlement available…" line. */
        "teal-deep": "#04534E",

        /** Footer. */
        night: "#0B0C0E",
        /** Home "Deep liquidity. Rapid settlement." band. */
        "band-dark": "#101914",
        /** Security "Built on solid ground" band. */
        "band-darker": "#08100C",
        /** ContactCTABanner gradient stops. */
        "cta-from": "#062317",
        "cta-to": "#082D1E",

        "on-dark": "#EAEAEA",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      borderRadius: {
        card: "24px",
        band: "32px",
      },
      maxWidth: {
        container: "1264px",
        prose: "800px",
      },
      boxShadow: {
        nav: "0 1px 0 rgba(255,255,255,.7) inset, 0 8px 28px rgba(11,12,14,.07)",
        card: "0 18px 44px rgba(11,12,14,.10)",
        form: "0 24px 60px rgba(6,35,23,.28)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        /**
         * The currency row renders its pills twice; shifting the track by half
         * its width lands copy 2 exactly where copy 1 started, so the reset is
         * invisible and the scroll reads as endless.
         */
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
