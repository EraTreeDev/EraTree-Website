/**
 * Scrapes the 12 articles from eratree.io/blog into content/articles.ts and
 * pulls each hero image into public/images/blog/.
 *
 * Committed so the scrape is reproducible rather than a one-off paste. Re-run
 * with `node scripts/scrape-blog.mjs` from the project root.
 *
 * The live pages are plain: <h1>, an intro <p>, then repeated <h2> + <p>
 * sections. That shape drives the crude-but-sufficient regex parsing below —
 * there is no build-time dependency on this script.
 */

import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const ORIGIN = "https://eratree.io";

const SLUGS = [
  "how-to-buy-bitcoin",
  "stablecoins-not-all-created-equal",
  "crypto-industry-otc",
  "bitcoin-monetary-salability",
  "how-to-buy-stablecoins",
  "stablecoins-institutional-integration",
  "crypto-industry-payment",
  "bitcoin-absolutely-scarce",
  "stablecoins-the-basics",
  "crypto-industry-dats",
  "bitcoin-institutional-grade-asset",
  "how-to-buy-ethereum",
];

const IMAGE_DIR = join("public", "images", "blog");

/**
 * Card title and thumbnail per slug, taken from the /blog index rather than the
 * article page. The two disagree: the index calls post 2 "Stablecoins: Not All
 * Created Equal.." while its own <h1> reads "Diversity of Stablecoin Design".
 * The index wording is the canonical one.
 *
 * `image: null` means "use the EraTree dark wordmark" — that is what the live
 * index shows for the OTC post. Note blog-6 is deliberately reused by two posts
 * upstream; that is the live site's own duplication, not a scraping slip.
 */
const CARDS = {
  "how-to-buy-bitcoin": { title: "How to Buy Bitcoin", img: "/blogs/blog-1.jpg" },
  "stablecoins-not-all-created-equal": {
    title: "Stablecoins: Not All Created Equal..",
    img: "/blogs/blog-2.jpg",
  },
  "crypto-industry-otc": { title: "Crypto Industry: OTC", img: null },
  "bitcoin-monetary-salability": {
    title: "Bitcoin: Monetary Salability",
    img: "/blogs/blog-3.jpg",
  },
  "how-to-buy-stablecoins": { title: "How to Buy Stablecoins", img: "/blogs/blog-4.png" },
  "stablecoins-institutional-integration": {
    title: "Stablecoins: Institutional Integration",
    img: "/blogs/blog-5.jpeg",
  },
  "crypto-industry-payment": { title: "Crypto Industry: Payment", img: "/blogs/blog-6.jpeg" },
  "bitcoin-absolutely-scarce": { title: "Bitcoin: Absolutely Scarce", img: "/blogs/blog-7.jpeg" },
  "stablecoins-the-basics": { title: "Stablecoins: The Basics", img: "/blogs/blog-8.jpeg" },
  "crypto-industry-dats": { title: "Crypto Industry: DATs", img: "/blogs/blog-6.jpeg" },
  "bitcoin-institutional-grade-asset": {
    title: "Bitcoin: Institutional Grade Asset",
    img: "/blogs/blog-9.jpeg",
  },
  "how-to-buy-ethereum": { title: "How to Buy Ethereum", img: "/blogs/blog-10.png" },
};

/** Stand-in thumbnail for the post the index gives no photo. */
const LOGO_IMAGE = "/images/eratree-logo-dark.svg";

/** Collapse entities and tags down to readable text. */
function clean(html) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchAll(html, re) {
  return [...html.matchAll(re)].map((m) => clean(m[1])).filter(Boolean);
}

/**
 * Narrows to the single <article> wrapper the live pages use. Without this the
 * site chrome — nav and the footer's address/copyright lines — gets swept in as
 * article body copy.
 */
function articleBody(html) {
  const start = html.indexOf("<article");
  const end = html.indexOf("</article>", start);
  if (start === -1 || end === -1) throw new Error("no <article> container found");
  return html.slice(start, end);
}

/**
 * Walks the body in document order so headings keep their paragraphs. Anything
 * before the first <h2> is the intro.
 */
function parseSections(html) {
  const blocks = [...html.matchAll(/<(h2|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)];
  const intro = [];
  const sections = [];

  for (const [, tag, inner] of blocks) {
    const text = clean(inner);
    if (!text) continue;
    if (tag.toLowerCase() === "h2") {
      sections.push({ heading: text, paragraphs: [] });
    } else if (sections.length === 0) {
      intro.push(text);
    } else {
      sections.at(-1).paragraphs.push(text);
    }
  }
  return { intro, sections };
}

async function scrape(slug) {
  const res = await fetch(`${ORIGIN}/blog/${slug}`);
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status}`);
  const html = await res.text();

  const body = articleBody(html);
  const card = CARDS[slug];
  const title = card?.title ?? matchAll(body, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)[0] ?? slug;
  const readingTime = (body.match(/(\d+\s*min read)/i)?.[1] ?? "3 min read").toLowerCase();
  const { intro, sections } = parseSections(body);

  let image = LOGO_IMAGE;
  let logo = true;
  if (card?.img) {
    const ext = card.img.split(".").pop();
    const file = `${slug}.${ext}`;
    const bin = await fetch(`${ORIGIN}${card.img}`);
    if (!bin.ok) throw new Error(`${slug}: image ${card.img} → HTTP ${bin.status}`);
    await writeFile(join(IMAGE_DIR, file), Buffer.from(await bin.arrayBuffer()));
    image = `/images/blog/${file}`;
    logo = false;
  }

  return {
    slug,
    title,
    readingTime,
    excerpt: intro[0] ?? "",
    intro,
    sections,
    image,
    logo,
  };
}

const q = (s) => JSON.stringify(s);

function serialise(articles) {
  const body = articles
    .map(
      (a) => `  {
    slug: ${q(a.slug)},
    title: ${q(a.title)},
    readingTime: ${q(a.readingTime)},
    excerpt: ${q(a.excerpt)},
    image: { src: ${q(a.image)}, alt: "", width: 478, height: 418 },
    logo: ${a.logo},
    intro: [
${a.intro.map((p) => `      ${q(p)},`).join("\n")}
    ],
    sections: [
${a.sections
  .map(
    (s) => `      {
        heading: ${q(s.heading)},
        paragraphs: [
${s.paragraphs.map((p) => `          ${q(p)},`).join("\n")}
        ],
      },`,
  )
  .join("\n")}
    ],
  },`,
    )
    .join("\n");

  return `/**
 * GENERATED by scripts/scrape-blog.mjs from eratree.io/blog — do not hand-edit.
 * Re-run the script to refresh.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type FullArticle = {
  slug: string;
  title: string;
  readingTime: string;
  excerpt: string;
  image: { src: string; alt: string; width: number; height: number };
  /** True when the image is the wordmark stand-in, which needs padding not cropping. */
  logo: boolean;
  intro: string[];
  sections: ArticleSection[];
};

export const articles: FullArticle[] = [
${body}
];

export function articleBySlug(slug: string): FullArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
`;
}

await mkdir(IMAGE_DIR, { recursive: true });

const results = [];
for (const slug of SLUGS) {
  const a = await scrape(slug);
  results.push(a);
  console.log(
    `${a.slug.padEnd(38)} ${String(a.sections.length).padStart(2)} sections  ` +
      `${(a.logo ? "wordmark" : a.image.split("/").pop()).padEnd(34)} ${a.title}`,
  );
}

await writeFile(join("content", "articles.ts"), serialise(results));
console.log(`\nWrote content/articles.ts (${results.length} articles)`);
