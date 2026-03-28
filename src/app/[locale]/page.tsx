import type { Metadata } from "next";
import Link from "next/link";
import { FeaturedPostCard } from "@/components/blog/featured-post-card";
import { PostListItem } from "@/components/blog/post-list-item";
import { branchByLocale, siteConfig, type Locale } from "@/lib/blog/config";
import { buildLocaleIndexMetadata } from "@/lib/blog/metadata";
import { filterPostsByTag, getAllTags, getPublishedSummaries } from "@/lib/blog/posts";
import { isLocale } from "@/lib/blog/routing";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildLocaleIndexMetadata(raw);
}

export default async function LocaleIndexPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const { tag } = await searchParams;
  const tags = getAllTags(locale);
  const allPosts = getPublishedSummaries(locale);
  const filtered = filterPostsByTag(allPosts, tag);

  const featured = !tag && allPosts[0] ? allPosts[0] : null;
  const listPosts = tag ? filtered : allPosts.length > 1 ? allPosts.slice(1) : [];

  const branch = branchByLocale(locale);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{branch?.label ?? locale.toUpperCase()}</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight text-stone-900">Writing</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">{siteConfig.branchTagline[locale]}</p>
      </header>

      {tags.length > 0 ? (
        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href={`/${locale}`}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              !tag ? "border-stone-400 text-stone-900" : "border-stone-300 text-stone-600 hover:text-stone-900"
            }`}
          >
            All
          </Link>
          {tags.map((item) => (
            <Link
              key={item}
              href={`/${locale}?tag=${encodeURIComponent(item)}`}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                tag === item ? "border-stone-400 text-stone-900" : "border-stone-300 text-stone-600 hover:text-stone-900"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      ) : null}

      {featured ? (
        <section className="mt-12">
          <FeaturedPostCard post={featured} locale={locale} />
        </section>
      ) : null}

      <section className="mt-14">
        {listPosts.length > 0 ? (
          <>
            <h2 className="font-serif text-3xl text-stone-900">{tag ? "Filtered" : "More writing"}</h2>
            <div className="mt-6 space-y-5">
              {listPosts.map((post) => (
                <PostListItem key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </>
        ) : tag ? (
          <p className="text-stone-600">No posts with this tag.</p>
        ) : !featured ? (
          <p className="text-stone-600">No posts in this corner yet.</p>
        ) : null}
      </section>
    </div>
  );
}
