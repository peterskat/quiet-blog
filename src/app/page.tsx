import Link from "next/link";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { PostListItem } from "@/components/post-list-item";
import { getPostFrontmatters } from "@/lib/posts";

export default async function HomePage() {
  const posts = getPostFrontmatters();
  const [featured, ...recent] = posts;

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <section className="space-y-5">
        <p className="text-sm uppercase tracking-[0.22em] text-stone-500">A personal journal</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-tight text-stone-900 sm:text-6xl">
          Quiet Notes for a Thoughtful Life
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-stone-700">
          Essays and reflections on home, beauty, motherhood, culture, and the soft architecture of daily life.
        </p>
      </section>

      {featured ? (
        <section className="mt-12">
          <FeaturedPostCard post={featured} />
        </section>
      ) : null}

      <section className="mt-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-serif text-3xl text-stone-900">Recent writing</h2>
          <Link href="/blog" className="text-sm text-stone-600 hover:text-stone-900">
            View all posts
          </Link>
        </div>
        <div className="space-y-5">
          {recent.slice(0, 4).map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-2xl border border-stone-200 bg-[#fbf6ef] p-7">
        <h3 className="font-serif text-2xl text-stone-900">A gentle newsletter, soon</h3>
        <p className="mt-3 max-w-2xl text-stone-700">
          I am preparing an occasional letter with quiet recommendations, thoughtful links, and new essays.
        </p>
      </section>
    </div>
  );
}
