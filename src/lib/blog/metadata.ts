import type { Metadata } from "next";
import { branchByLocale, siteConfig, type Locale } from "@/lib/blog/config";
import type { PostSummary } from "@/lib/blog/types";
import { cloudinaryUrl } from "@/lib/cloudinary";

function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!base) return path;
  const normalized = /^https?:\/\//i.test(base) ? base : `https://${base}`;
  return new URL(path, normalized.endsWith("/") ? normalized : `${normalized}/`).toString();
}

export function buildLocaleIndexMetadata(locale: Locale): Metadata {
  const branch = branchByLocale(locale);
  const title = branch ? `${siteConfig.name} — ${branch.label}` : `${siteConfig.name}`;
  const description = branch?.description ?? siteConfig.branchTagline[locale];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "cs" ? "cs_CZ" : "vi_VN"
    }
  };
}

export function buildPostMetadata(locale: Locale, post: PostSummary): Metadata {
  const title = post.title;
  const description = post.description;
  const ogImage =
    post.coverImage.trim() && cloudinaryUrl(post.coverImage, { width: 1200, height: 630, crop: "limit" });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      locale: locale === "en" ? "en_US" : locale === "cs" ? "cs_CZ" : "vi_VN",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: post.coverAlt ?? "" }] } : {})
    },
    twitter: {
      card: post.coverImage.trim() ? "summary_large_image" : "summary",
      title,
      description
    },
    alternates: {
      canonical: absoluteUrl(`/${locale}/${post.slug}`)
    }
  };
}
