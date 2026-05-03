import Link from "next/link";
import { cafeCornerConfig } from "@/lib/cafecorner/config";

export function CafeCornerNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:rgb(139_118_89_/_0.28)] bg-[color:rgb(239_225_197_/_0.88)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link
          href="/"
          className="w-fit font-serif text-2xl font-semibold leading-none tracking-wide text-[var(--cc-charcoal)] outline-offset-4 transition hover:text-[var(--cc-accent)] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cc-accent)]"
        >
          {cafeCornerConfig.siteName}
        </Link>
        <nav className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0" aria-label="Cafe Corner">
          {cafeCornerConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[color:rgb(139_118_89_/_0.28)] bg-[color:rgb(255_247_231_/_0.56)] px-3 py-2 text-sm font-medium text-[var(--cc-text-soft)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--cc-accent)] hover:text-[var(--cc-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cc-accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
