import Link from "next/link";
import type { Locale } from "@/lib/blog/config";
import { siteConfig } from "@/lib/blog/config";

type LocaleHeaderProps = {
  locale: Locale;
};

const nav = (locale: Locale) => [
  { href: "/", label: "Home" },
  { href: `/${locale}`, label: "Writing" },
  { href: `/${locale}/about`, label: "About" }
];

export function LocaleHeader({ locale }: LocaleHeaderProps) {
  return (
    <header className="border-b border-stone-200/80 bg-[#f7f1e8]/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <Link
            href="/"
            className="text-sm uppercase tracking-[0.18em] text-stone-600 transition hover:text-stone-900"
          >
            {siteConfig.name}
          </Link>
          <span className="text-xs tracking-wide text-stone-500" aria-hidden>
            {locale.toUpperCase()}
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-6" aria-label="Primary">
          {nav(locale).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-stone-600 outline-offset-4 transition hover:text-stone-900 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-stone-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
