import Link from "next/link";
import { MediaSlot, type Media } from "@/components/visuals/MediaSlot";

export type Article = {
  slug: string;
  readingTime: string;
  title: string;
  excerpt: string;
  image: Media;
};

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col gap-6 rounded-card bg-surface-2 p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-7">
      <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-[190px]">
        <MediaSlot {...article.image} aspect="aspect-[4/3]" />
      </div>
      <div className="flex-1">
        <p className="text-[13px] text-muted">{article.readingTime}</p>
        <h2 className="mt-2 text-[22px] font-medium tracking-[-0.01em] text-ink">
          {article.title}
        </h2>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">{article.excerpt}</p>
        <Link
          href={`/learn/${article.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium text-emerald transition-colors hover:text-forest"
        >
          Read article <span aria-hidden="true">⟶</span>
        </Link>
      </div>
    </article>
  );
}
