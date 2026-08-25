import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { learn } from "@/content/pages";

export const metadata: Metadata = {
  title: learn.meta.title,
  description: learn.meta.description,
  openGraph: { title: learn.meta.title, description: learn.meta.description, url: "/learn" },
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  const articles = learn.articles;

  return (
    <>
      <Hero
        align="center"
        eyebrow={learn.hero.eyebrow}
        heading={learn.hero.heading.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        sub={learn.hero.sub}
      />

      <div className="border-t border-line">
        <Container>
          {/* No ContactCTABanner here — the reference omits it on this page. */}
          <ul className="flex flex-col gap-6 py-16 lg:py-20">
            {articles.map((a, i) => (
              <Reveal as="li" key={a.slug} delay={Math.min(i, 3) * 0.08}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}
