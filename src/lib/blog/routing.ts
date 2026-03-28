import { LOCALES, type Locale } from "@/lib/blog/config";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
