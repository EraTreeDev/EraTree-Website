import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MediaSlot } from "@/components/visuals/MediaSlot";
import { ContactCTABanner } from "@/components/sections/ContactCTABanner";
import { articles, articleBySlug } from "@/content/articles";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return {};

  const description = article.excerpt.slice(0, 200);
  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      url: `/learn/${slug}`,
      type: "article",
      images: [article.image.src],
    },
    alternates: { canonical: `/learn/${slug}` },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <article>
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-prose">
            <Reveal>
              <Eyebrow>Eratree insights</Eyebrow>
              <h1 className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] font-medium leading-[1.15] tracking-[-0.015em] text-ink">
                {article.title}
              </h1>
              <p className="mt-4 text-[13px] text-muted">{article.readingTime}</p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10 overflow-hidden rounded-card">
              <MediaSlot
                src={article.image.src}
                alt={article.image.alt}
                width={article.image.width}
                height={article.image.height}
                aspect="aspect-[16/9]"
                priority
              />
            </Reveal>

            <Reveal delay={0.12} className="mt-10">
              {/* Index keys: the list is static per build, and paragraph text
                  is not guaranteed unique within an article. */}
              {article.intro.map((p, i) => (
                <p key={i} className="mt-5 text-[17px] leading-[1.75] text-muted first:mt-0">
                  {p}
                </p>
              ))}
            </Reveal>

            {article.sections.map((section, i) => (
              <Reveal key={i} delay={Math.min(i, 3) * 0.06} className="mt-12">
                <h2 className="text-[13px] font-medium uppercase tracking-[0.16em] text-emerald">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="mt-5 text-[17px] leading-[1.75] text-muted">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}

            <Reveal className="mt-14 border-t border-line pt-8">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-emerald transition-colors hover:text-forest"
              >
                <span aria-hidden="true">⟵</span> All articles
              </Link>
            </Reveal>
          </div>
        </Container>
      </article>

      <div className="pb-16 lg:pb-20">
        <ContactCTABanner />
      </div>
    </>
  );
}
