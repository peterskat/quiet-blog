import type { Metadata } from "next";
import { cafeCornerTheme } from "@/lib/cafecorner/theme";

export type CafeCornerNavItem = {
  href: string;
  label: string;
  description?: string;
};

export type CafeCornerHotspot = {
  id: "speaker" | "books" | "menu" | "plant" | "open";
  label: string;
  href: string;
  ariaLabel: string;
  hint: string;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

export const cafeCornerConfig = {
  siteName: "Cafe Corner",
  subdomain: "cafecorner.tamwriting.com",
  localSubdomain: "cafecorner.localhost",
  baseUrl: "https://cafecorner.tamwriting.com",
  description:
    "A quiet cafe corner for listening, reading, small menus, leafy atmosphere, and warm notes from Tam Writing.",
  introImage: {
    publicId: "v1776445427/cafecornerintro",
    width: 1024,
    height: 1536,
    alt: ""
  },
  socialImage: {
    path: "/og/cafecorner.png",
    width: 1200,
    height: 630,
    alt: "Cafe Corner, a warm illustrated cafe reading nook"
  },
  navItems: [
    { href: "/", label: "Welcome", description: "Step into the cafe." },
    { href: "/menu", label: "Menu", description: "Small offerings and routes through the space." },
    { href: "/journal", label: "Journal", description: "Notes from the corner table." },
    { href: "/events", label: "Events", description: "Gatherings, readings, and gentle announcements." },
    { href: "/about", label: "About", description: "The mood and intention behind the room." },
    { href: "/contacts", label: "Contacts", description: "How to reach the counter." }
  ] satisfies CafeCornerNavItem[],
  spotlightLinks: [
    { href: "/listen", label: "Listen", description: "A soft speaker hums with ambience and audio notes." },
    { href: "/reading", label: "Reading", description: "Books, essays, and things worth lingering with." },
    { href: "/plants", label: "Plants", description: "A little green atmosphere for the windowsill." }
  ] satisfies CafeCornerNavItem[],
  hotspots: [
    {
      id: "speaker",
      label: "Speaker",
      href: "/listen",
      ariaLabel: "Open the listening corner from the speaker",
      hint: "A low-volume room tone.",
      position: { left: "5%", top: "50%", width: "25%", height: "15%" }
    },
    {
      id: "books",
      label: "Book pile",
      href: "/reading",
      ariaLabel: "Open the reading table from the book pile",
      hint: "Pages stacked for later.",
      position: { left: "8%", top: "73%", width: "34%", height: "13%" }
    },
    {
      id: "menu",
      label: "Menu",
      href: "/menu",
      ariaLabel: "Open the Cafe Corner menu from the chalkboard",
      hint: "A small chalkboard of paths.",
      position: { left: "71%", top: "48%", width: "22%", height: "23%" }
    },
    {
      id: "plant",
      label: "Plant pot",
      href: "/plants",
      ariaLabel: "Open the plant corner from the potted plant",
      hint: "Something leafy by the light.",
      position: { left: "65%", top: "31%", width: "24%", height: "19%" }
    },
    {
      id: "open",
      label: "Open sign",
      href: "/latest",
      ariaLabel: "Open the latest notes from the hanging open sign",
      hint: "The door is warm today.",
      position: { left: "67%", top: "17%", width: "20%", height: "12%" }
    }
  ] satisfies CafeCornerHotspot[],
  theme: cafeCornerTheme
} as const;

export function cafeCornerUrl(path = "/"): string {
  return new URL(path, cafeCornerConfig.baseUrl).toString();
}

export function buildCafeCornerMetadata(options?: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const title = options?.title
    ? `${options.title} · ${cafeCornerConfig.siteName}`
    : cafeCornerConfig.siteName;
  const description = options?.description ?? cafeCornerConfig.description;
  const path = options?.path ?? "/";
  const url = cafeCornerUrl(path);

  return {
    title,
    description,
    metadataBase: new URL(cafeCornerConfig.baseUrl),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: cafeCornerConfig.siteName,
      type: "website",
      images: [
        {
          url: cafeCornerUrl(cafeCornerConfig.socialImage.path),
          width: cafeCornerConfig.socialImage.width,
          height: cafeCornerConfig.socialImage.height,
          alt: cafeCornerConfig.socialImage.alt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}
