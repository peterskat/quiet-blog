import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/article-layout";
import { ReadingProgress } from "@/components/reading-progress";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage =
    post.coverImage.trim() && cloudinaryUrl(post.coverImage, { width: 1200, height: 630, crop: "limit" });

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: post.coverAlt }] } : {})
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <ReadingProgress />
      <ArticleLayout
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
