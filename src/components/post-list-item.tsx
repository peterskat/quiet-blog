import Link from "next/link";
import type { PostSummary } from "@/types/post";
import { TagBadge } from "@/components/tag-badge";
import { BlogImage } from "@/components/blog-image";
import { shouldRenderCloudinary } from "@/lib/cloudinary";

type PostListItemProps = {
  post: PostSummary;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}

export function PostListItem({ post }: PostListItemProps) {
  const hasCover = shouldRenderCloudinary(post.coverImage);

  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-[#fbf7f1] transition hover:border-stone-300">
      {hasCover ? (
        <div className="relative aspect-[16/9] w-full border-b border-stone-200/80 bg-stone-100">
          <BlogImage
            publicId={post.coverImage}
            alt={post.coverAlt}
            width={800}
            height={450}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      ) : null}
      <div className="p-6">
        <p className="text-sm text-stone-500">{formatDate(post.date)}</p>
        <h3 className="mt-2 font-serif text-2xl text-stone-900">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-stone-700">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
