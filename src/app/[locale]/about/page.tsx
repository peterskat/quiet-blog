import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/blog/config";
import { aboutByLocale } from "@/lib/blog/about";
import type { Locale } from "@/lib/blog/config";
import { isLocale } from "@/lib/blog/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const { title, paragraphs } = aboutByLocale[raw];
  return {
    title: `${title} · ${siteConfig.name}`,
    description: paragraphs[0]
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const { title, paragraphs } = aboutByLocale[locale];

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20" lang={locale}>
      <h1 className="font-serif text-5xl leading-tight text-stone-900">{title}</h1>
      <div className="mt-8 space-y-6 text-lg leading-8 text-stone-700">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </div>
  );
}
