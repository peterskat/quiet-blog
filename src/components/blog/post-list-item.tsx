import Link from "next/link";
import type { Locale } from "@/lib/blog/config";
import type { PostSummary } from "@/lib/blog/types";
import { formatPostDate } from "@/lib/blog/dates";
import { TagBadge } from "@/components/tag-badge";
import { BlogImage } from "@/components/blog/blog-image";
import { shouldRenderCloudinary } from "@/lib/cloudinary";

type PostListItemProps = {
  post: PostSummary;
  locale: Locale;
};

export function PostListItem({ post, locale }: PostListItemProps) {
  const hasCover = shouldRenderCloudinary(post.coverImage);
  const alt = post.coverAlt ?? "";

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-[#fbf7f1] transition hover:border-stone-300">
      {hasCover ? (
        <div className="relative aspect-[16/9] w-full border-b border-stone-200/80 bg-stone-100">
          <BlogImage
            publicId={post.coverImage}
            alt={alt}
            width={800}
            height={450}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      ) : null}
      <div className="p-6">
        <p className="text-sm text-stone-500">{formatPostDate(post.date, locale)}</p>
        <h3 className="mt-2 font-serif text-2xl text-stone-900">
          <Link
            href={`/${locale}/${post.slug}`}
            className="rounded-sm outline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-400"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-stone-700">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
