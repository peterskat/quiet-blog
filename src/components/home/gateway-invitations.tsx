import Link from "next/link";
import { editorialBranches, siteConfig } from "@/lib/blog/config";

export function GatewayInvitations() {
  const { eyebrow, title, supporting } = siteConfig.gateway;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <p className="text-center text-xs uppercase tracking-[0.28em] text-stone-500">{eyebrow}</p>
      <h1 className="mt-6 text-center font-serif text-4xl leading-tight text-stone-900 sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed text-stone-700 sm:text-xl">
        {supporting}
      </p>

      <ul className="mt-16 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {editorialBranches.map((branch) => (
          <li key={branch.locale}>
            <Link
              href={branch.path}
              className="group flex h-full flex-col rounded-2xl border border-stone-200/90 bg-[#fbf7f1] p-7 shadow-sm transition hover:border-stone-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-500"
            >
              {branch.personaName ? (
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{branch.personaName}</p>
              ) : null}
              <span className="mt-2 font-serif text-2xl leading-snug text-stone-900 group-hover:underline">
                {branch.label}
              </span>
              <p className="mt-4 flex-1 text-base leading-relaxed text-stone-700">{branch.description}</p>
              <span className="mt-6 text-sm font-medium text-stone-600 transition group-hover:text-stone-900">
                Enter →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
