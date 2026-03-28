import type { Metadata } from "next";

/** Supported URL segments only — not i18n translations, three editorial branches. */
export const LOCALES = ["en", "cs", "vi"] as const;
export type Locale = (typeof LOCALES)[number];

export type EditorialBranch = {
  locale: Locale;
  /** Absolute path for this branch’s home (blog index). */
  path: string;
  /** Card title on the gateway. */
  label: string;
  /** Card body copy. */
  description: string;
  /** Optional byline or persona hint for the branch. */
  personaName?: string;
};

export const siteConfig = {
  name: "Quiet Notes",
  /** Gateway hero — easy to edit in one place. */
  gateway: {
    eyebrow: "Three doors. Three voices.",
    title: "Welcome.",
    supporting: "Step into the corner of Tam that speaks to you."
  },
  /** Per-locale index page subtitles (editorial tone). */
  branchTagline: {
    en: "English essays, reflections, and quiet thoughts.",
    cs: "Česky o životě, dnech a věcech blízko domova.",
    vi: "Những mảnh viết gần gũi, riêng tư và dịu dàng."
  } satisfies Record<Locale, string>
} as const;

/** Single source of truth for gateway cards and locale list. */
export const editorialBranches: EditorialBranch[] = [
  {
    locale: "en",
    path: "/en",
    label: "Come on in",
    description: "English essays, reflections, and quiet thoughts."
  },
  {
    locale: "cs",
    path: "/cs",
    label: "Pojď dál",
    description: "Česky o životě, dnech a věcech blízko domova."
  },
  {
    locale: "vi",
    path: "/vi",
    label: "Bước vào góc nhỏ của Tâm",
    description: "Những mảnh viết gần gũi, riêng tư và dịu dàng."
  }
];

export function branchByLocale(locale: Locale): EditorialBranch | undefined {
  return editorialBranches.find((b) => b.locale === locale);
}

/** Root `/` metadata — warm, non-technical. */
export const gatewayMetadata: Metadata = {
  title: `${siteConfig.name} — Welcome`,
  description:
    "Three doors, three voices. Step into the corner of Tam that speaks to you — in English, Czech, or Vietnamese."
};
