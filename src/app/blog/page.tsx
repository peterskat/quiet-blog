import Link from "next/link";
import { PostListItem } from "@/components/post-list-item";
import { getAllTags, filterPostsByTag, getPostFrontmatters } from "@/lib/posts";

type BlogPageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const tags = getAllTags();
  const posts = filterPostsByTag(getPostFrontmatters(), tag);

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <h1 className="font-serif text-5xl leading-tight text-stone-900">Writing</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        A library of essays and notes, arranged by feeling, season, and subject.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full border px-3 py-1 text-sm transition ${
            !tag ? "border-stone-400 text-stone-900" : "border-stone-300 text-stone-600 hover:text-stone-900"
          }`}
        >
          All
        </Link>
        {tags.map((item) => (
          <Link
            key={item}
            href={`/blog?tag=${encodeURIComponent(item)}`}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              tag === item ? "border-stone-400 text-stone-900" : "border-stone-300 text-stone-600 hover:text-stone-900"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-5">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
