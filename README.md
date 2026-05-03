# Quiet Blog

A calm, minimal site with **three independent editorial branches** (English, Czech, Vietnamese) in one Next.js (App Router) codebase. Content in each language is **not** a translation of the others—each folder is its own voice.

## Stack

- Next.js (App Router), TypeScript
- Tailwind CSS + `@tailwindcss/typography` (prose)
- `gray-matter` + `remark` + `remark-gfm` + `remark-html`
- Cloudinary for cover images (public IDs in frontmatter)
- Config-driven gateway at `/` (`src/lib/blog/config.ts`)

## Routes

| Path | Purpose |
|------|---------|
| `/` | Soft gateway (“three doors”) into the three branches |
| `/en`, `/cs`, `/vi` | Blog index for that branch only |
| `/en/[slug]`, … | Post in that branch only |
| `/en/about`, … | About copy per branch (independent text) |

Unsupported locales → `404` (`notFound()`).

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` (set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` for images).
3. `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Content layout

| Path | Purpose |
|------|---------|
| `content/en/` | English posts (`.md` / `.mdx`) |
| `content/cs/` | Czech posts |
| `content/vi/` | Vietnamese posts |
| `content/drafts/` | Optional; **not** read by the app (use or ignore) |

The loader only reads `content/<locale>/` for `locale` in `en` | `cs` | `vi`.

### Adding a new post

1. Choose the language folder: `content/en`, `content/cs`, or `content/vi`.
2. Add `my-post.md` (or `.mdx`) with YAML frontmatter and Markdown body.
3. Set `slug` to the URL segment: e.g. `slug: my-post` → `/en/my-post`.
4. Commit and deploy; `generateStaticParams` picks up new slugs on build.

### Frontmatter (required fields)

```yaml
title: string
description: string   # SEO / meta
date: string          # ISO, e.g. "2026-03-28"
slug: string
excerpt: string       # Card / list preview
draft: boolean
coverImage: string    # Cloudinary public ID or ""
coverAlt: string      # optional; use "" if no image
tags:                 # optional list
  - tag-one
```

`draft: true` posts are omitted from listings and static routes.

## Editing the gateway copy

Invitation cards and site strings live in **`src/lib/blog/config.ts`** (`siteConfig.gateway`, `editorialBranches`, `branchTagline`). Change text there—no need to edit JSX structure.

## Cafe Corner sub-site

Cafe Corner is a host-aware micro-site inside the same Next.js app. Requests for
`cafecorner.tamwriting.com` are rewritten by `src/middleware.ts` into the internal
route namespace `/__cafecorner`, so visitors keep clean subdomain URLs like
`https://cafecorner.tamwriting.com/menu` while the app serves the matching
Cafe Corner route.

The route files live under `src/app/%5F%5Fcafecorner`. Next.js treats folders
that begin with `_` as private, so the encoded folder name is the App Router-safe
way to create the internal `/__cafecorner` namespace.

The internal `__cafecorner` path is not intended as a public URL on the main host.
Cafe Corner metadata uses `https://cafecorner.tamwriting.com` for canonicals and
Open Graph URLs to avoid duplicate SEO surfaces.

### Adding Cafe Corner pages

Add new pages under `src/app/%5F%5Fcafecorner`. For example:

```text
src/app/%5F%5Fcafecorner/new-room/page.tsx
```

Use Cafe Corner components from `src/components/cafecorner` so the micro-site can
evolve independently from the main blog design.

### Cafe Corner config and theme

Shared Cafe Corner labels, navigation, metadata, hotspot destinations, and
hotspot positions live in `src/lib/cafecorner/config.ts`.

Visual tokens live in `src/lib/cafecorner/theme.ts`. Adjust colors, shadows,
radius values, and texture references there before changing component markup.

The landing scene uses the Cloudinary public ID `cafecornerintro`, configured as
`cafeCornerConfig.introImage`. Hotspot positions are percentage-based rectangles
over that responsive image. Tune the `position` values in
`cafeCornerConfig.hotspots` when the image crop or composition changes.

### Local Cafe Corner development

Run the normal dev server:

```bash
npm run dev
```

Then use `http://cafecorner.localhost:3000` for the subdomain route locally.
`http://localhost:3000` remains the main Tam Writing site.

## Environment variables

See `.env.example` (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_SITE_URL`, etc.).

## Project structure (high level)

```text
src/
├── app/
│   ├── page.tsx              # Gateway /
│   ├── layout.tsx
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx          # Branch index
│       ├── about/page.tsx
│       └── [slug]/page.tsx   # Post
├── components/
│   ├── home/                 # Gateway UI
│   └── blog/                 # Locale header, cards, article
└── lib/blog/
    ├── config.ts             # Locales, gateway, taglines
    ├── posts.ts              # Loaders per locale
    ├── metadata.ts           # SEO helpers
    ├── routing.ts
    ├── about.ts
    └── types.ts
```

## Netlify

`netlify.toml` uses `@netlify/plugin-nextjs` and `publish = ".next"`. Set env vars in the Netlify UI. If the UI still forces **Publish directory** = `build`, clear it or set `.next` (see earlier deploy notes).

## Scripts

- `npm run dev` — Development
- `npm run build` — Production build
- `npm run start` — Production server locally
- `npm run lint` — Lint
