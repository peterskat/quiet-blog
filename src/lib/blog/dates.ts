import type { Locale } from "@/lib/blog/config";

const localeToCalendar: Record<Locale, string> = {
  en: "en-US",
  cs: "cs-CZ",
  vi: "vi-VN"
};

export function formatPostDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeToCalendar[locale], {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
