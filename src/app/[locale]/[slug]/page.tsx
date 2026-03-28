import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/article-layout";
import { ReadingProgress } from "@/components/reading-progress";
import { LOCALES, type Locale } from "@/lib/blog/config";
import { buildPostMetadata } from "@/lib/blog/metadata";
import { getPostBySlug, getPostSlugs } from "@/lib/blog/posts";
import { isLocale } from "@/lib/blog/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const slug of getPostSlugs(locale)) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  return buildPostMetadata(locale, post);
}

export default async function PostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const post = await getPostBySlug(locale, slug);
  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <ArticleLayout
        locale={locale}
        title={post.title}
        date={post.date}
        tags={post.tags}
        coverImage={post.coverImage}
        coverAlt={post.coverAlt}
      >
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </ArticleLayout>
    </>
  );
}
