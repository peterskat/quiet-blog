import Link from "next/link";
import type { PostSummary } from "@/types/post";
import { TagBadge } from "@/components/tag-badge";
import { BlogImage } from "@/components/blog-image";
import { shouldRenderCloudinary } from "@/lib/cloudinary";

type FeaturedPostCardProps = {
  post: PostSummary;
};

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const hasCover = shouldRenderCloudinary(post.coverImage);

  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-[#fcf8f2]">
      {hasCover ? (
        <div className="relative aspect-[21/9] max-h-72 w-full border-b border-stone-200/80 bg-stone-100 sm:aspect-[2.4/1]">
          <BlogImage
            publicId={post.coverImage}
            alt={post.coverAlt}
            width={1200}
            height={500}
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
        </div>
      ) : null}
      <div className="p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Featured</p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-stone-900 sm:text-4xl">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">{post.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
