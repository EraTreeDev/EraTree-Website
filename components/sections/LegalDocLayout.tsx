import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { LegalDoc } from "@/content/legal/types";

/**
 * Single-column long-form layout for the three legal documents.
 *
 * The source pages mark most section titles as plain paragraphs; here they are
 * real <h2>/<h3> elements so the document has proper structure for screen
 * readers and for anyone navigating by heading.
 */
export function LegalDocLayout({ doc }: { doc: LegalDoc }) {
  return (
    <article>
      <Container>
        <div className="pb-10 pt-14 lg:pb-12 lg:pt-20">
          {doc.updated && <Eyebrow>Last update: {doc.updated}</Eyebrow>}
          <h1 className="mt-5 text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
            {doc.title}
          </h1>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container>
          <div className="max-w-prose py-14 lg:py-20">
            {doc.sections.map((section, i) => (
              <section key={`${section.heading ?? "lead"}-${i}`} className={i > 0 ? "mt-10" : ""}>
                {section.heading &&
                  (section.level === 3 ? (
                    <h3 className="text-[17px] font-medium tracking-[-0.01em] text-ink">
                      {section.heading}
                    </h3>
                  ) : (
                    <h2 className="text-[15px] font-medium uppercase tracking-[0.08em] text-forest">
                      {section.heading}
                    </h2>
                  ))}
                {section.blocks.map((block, j) => (
                  <p
                    key={j}
                    className={`text-[15px] leading-[1.75] text-muted ${
                      j === 0 && section.heading ? "mt-4" : "mt-4 first:mt-0"
                    }`}
                  >
                    <RichText text={block} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </Container>
      </div>
    </article>
  );
}

/** Renders the [label](href) links preserved by scripts/extract-legal.js. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <Fragment key={i}>{part}</Fragment>;
        const [, label, href] = m;
        const external = /^https?:/.test(href);
        return (
          <a
            key={i}
            href={href}
            className="text-ink underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-emerald"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {label}
          </a>
        );
      })}
    </>
  );
}
