/**
 * Converts the live eratree.io legal pages into typed content files.
 *
 * Text is copied verbatim — no rewording, no summarising, no reflowing of
 * clause text. Only structure is derived.
 *
 * privacy/terms already use real <h2>/<h3>. The disclosure page is flat <p>,
 * so its headings are matched against a known list taken from the page itself.
 */
const fs = require("fs");
const path = require("path");

const S = path.join(__dirname, "source-html");
const OUT = path.join(__dirname, "..", "content", "legal");

const DISCLOSURE_HEADINGS = new Set(
  [
    "Irreversible Nature of Transactions and Risk Awareness:",
    "Privacy and Data Protection:",
    "Collection and Use of Personal Information:",
    "Storage and Security:",
    "Sharing of Information:",
    "Disclosure of Service Use and Liability:",
    "Acceptable Use of Services:",
    "No Liability for Losses:",
    "Common Scams and Fraud Awareness:",
  ].map((s) => s.toLowerCase().replace(/[:\s]+$/, "")),
);

const decode = (s) =>
  s
    .replace(/&#x27;|&rsquo;|&#39;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Keeps inline <a href> as [text](href) so links survive into the data file. */
function inline(html) {
  return decode(
    html
      .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
        const t = text.replace(/<[^>]+>/g, "").trim();
        return `[${t}](${href})`;
      })
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * The pages ship the same markup twice: once rendered, once escaped inside the
 * Next.js RSC flight payload. Pick whichever <article> actually contains <p>
 * elements — the payload copy has none.
 */
function pickArticle(html) {
  let best = "";
  for (const m of html.matchAll(/<article\b/g)) {
    const start = m.index;
    const end = html.indexOf("</article>", start);
    if (end === -1) continue;
    const slice = html.slice(start, end);
    const paras = (slice.match(/<p\b/g) || []).length;
    if (paras > (best.match(/<p\b/g) || []).length) best = slice;
  }
  return best;
}

function parse(file, { flatHeadings = false } = {}) {
  const html = fs.readFileSync(path.join(S, file), "utf8");
  const article = pickArticle(html);
  if (!article) throw new Error(`no rendered <article> found in ${file}`);

  const blocks = [...article.matchAll(/<(h1|h2|h3|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((m) => ({ tag: m[1].toLowerCase(), text: inline(m[2]) }))
    .filter((b) => b.text);

  const title = blocks.find((b) => b.tag === "h1")?.text ?? "";

  // "LAST UPDATE: DECEMBER 01, 2025" appears above the title in the page chrome.
  // Privacy/disclosure say "Last Update:", terms says "Last Updated:".
  const updated =
    (html.match(/Last\s*Updated?[:\s]*([A-Za-z]+ \d{1,2},? \d{4})/i) || [])[1] ?? "";

  const sections = [];
  let current = null;

  for (const b of blocks) {
    if (b.tag === "h1") continue;

    const isHeading =
      b.tag === "h2" ||
      b.tag === "h3" ||
      (flatHeadings &&
        b.text.length < 80 &&
        DISCLOSURE_HEADINGS.has(b.text.toLowerCase().replace(/[:\s]+$/, "")));

    if (isHeading) {
      current = { heading: b.text.replace(/:$/, ""), level: b.tag === "h3" ? 3 : 2, blocks: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { heading: null, level: 2, blocks: [] };
        sections.push(current);
      }
      current.blocks.push(b.text);
    }
  }

  return { title, updated, sections };
}

const docs = {
  privacy: { file: "legal_privacy.html", opts: {} },
  terms: { file: "legal_terms.html", opts: {} },
  disclosure: { file: "legal_disclosure.html", opts: { flatHeadings: true } },
};

fs.mkdirSync(OUT, { recursive: true });

const banner = `/**
 * Copied verbatim from the live site (eratree.io) — DO NOT reword or summarise.
 * This is regulated disclosure copy. Regenerate with scratchpad/extract-legal.js.
 * Inline links are encoded as [text](href).
 */
import type { LegalDoc } from "./types";

`;

for (const [slug, { file, opts }] of Object.entries(docs)) {
  const doc = parse(file, opts);
  const words = doc.sections
    .flatMap((s) => s.blocks)
    .join(" ")
    .split(/\s+/).length;
  const body = `${banner}export const ${slug}: LegalDoc = ${JSON.stringify(doc, null, 2)};\n`;
  fs.writeFileSync(path.join(OUT, `${slug}.ts`), body, "utf8");
  console.log(
    `${slug}: "${doc.title}" | updated="${doc.updated}" | ${doc.sections.length} sections | ~${words} words`,
  );
}
