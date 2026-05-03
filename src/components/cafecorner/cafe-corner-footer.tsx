import Link from "next/link";
import { cafeCornerConfig } from "@/lib/cafecorner/config";

export function CafeCornerFooter() {
  return (
    <footer className="border-t border-[color:rgb(139_118_89_/_0.24)] bg-[color:rgb(47_39_31_/_0.06)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-[var(--cc-text-soft)] sm:grid-cols-[1fr_auto] sm:px-8">
        <div>
          <p className="font-serif text-2xl text-[var(--cc-text)]">{cafeCornerConfig.siteName}</p>
          <p className="mt-3 max-w-xl leading-7">{cafeCornerConfig.description}</p>
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-end">
          {cafeCornerConfig.spotlightLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full outline-offset-4 transition hover:text-[var(--cc-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cc-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
