import type { ReactNode } from "react";
import type { Locale } from "@/lib/blog/config";
import { formatPostDate } from "@/lib/blog/dates";
import { TagBadge } from "@/components/tag-badge";
import { BlogImage } from "@/components/blog/blog-image";
import { shouldRenderCloudinary } from "@/lib/cloudinary";

type ArticleLayoutProps = {
  locale: Locale;
  title: string;
  date: string;
  tags?: string[];
  coverImage?: string;
  coverAlt?: string;
  children: ReactNode;
};

export function ArticleLayout({
  locale,
  title,
  date,
  tags,
  coverImage,
  coverAlt,
  children
}: ArticleLayoutProps) {
  const showCover = coverImage ? shouldRenderCloudinary(coverImage) : false;
  const alt = coverAlt ?? "";

  return (
    <article className="mx-auto max-w-3xl px-6 pb-20 pt-12" lang={locale}>
      {showCover ? (
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
          <BlogImage
            publicId={coverImage!}
            alt={alt}
            width={1200}
            height={675}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      ) : null}

      <header className="border-b border-stone-200 pb-8">
        <p className="text-sm text-stone-500">{formatPostDate(date, locale)}</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-stone-900 sm:text-5xl">{title}</h1>
        {tags && tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        ) : null}
      </header>
      <div className="prose prose-stone mt-10 max-w-none prose-headings:font-serif prose-headings:text-stone-900 prose-p:leading-8 prose-p:text-stone-700 prose-a:text-stone-800 prose-a:underline prose-blockquote:border-stone-300 prose-blockquote:text-stone-600 prose-code:rounded prose-code:bg-stone-100 prose-code:px-1 prose-code:py-0.5 prose-pre:bg-stone-100 prose-th:border prose-th:border-stone-300 prose-td:border prose-td:border-stone-300">
        {children}
      </div>
    </article>
  );
}
