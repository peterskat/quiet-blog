import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { LocaleHeader } from "@/components/blog/locale-header";
import { LOCALES, type Locale } from "@/lib/blog/config";
import { isLocale } from "@/lib/blog/routing";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <div lang={locale}>
      <LocaleHeader locale={locale} />
      {children}
      <Footer />
    </div>
  );
}
