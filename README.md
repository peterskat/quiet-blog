# Quiet Blog

A calm, minimal blog built with Next.js (App Router), Tailwind CSS, and Markdown/MDX files in the repo.

## Stack

- Next.js (App Router)
- Tailwind CSS + `@tailwindcss/typography` (prose)
- TypeScript
- `gray-matter` + `remark` + `remark-gfm` + `remark-html` (GFM tables, lists, etc.)
- Cloudinary for blog images (public IDs in frontmatter)

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and set at least `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` if you want cover images and `BlogImage` to render.
3. `npm run dev` → [http://localhost:3000](http://localhost:3000)

## Content layout

| Path | Purpose |
|------|---------|
| `content/posts/` | Published posts only (`.md` or `.mdx`) |
| `content/drafts/` | Work in progress — **never** read by the app |

The loader only scans `content/posts`. Anything under `content/drafts` is ignored.

## Frontmatter (strict)

Every post must include exactly these fields:

```yaml
title: string
date: string          # ISO, e.g. "2026-03-28"
description: string
draft: boolean
tags: string[]
slug: string          # used in /blog/[slug] — no dates in the URL
coverImage: string    # Cloudinary public ID, e.g. blog/morning-light
coverAlt: string
```

Use `draft: true` to keep a file under `content/posts` hidden from the site (or keep drafts in `content/drafts` and move when ready).

## Writing in Obsidian

1. Open this repo as an Obsidian vault (or symlink `content/posts` into a vault).
2. Create a note under `content/posts` with `.md` or `.mdx`.
3. Add the YAML frontmatter above. The `slug` is the URL segment (`/blog/my-slug`).
4. Write the body in Markdown; Git is the source of truth.

## Publishing a post

1. Ensure `draft: false` and the file lives in `content/posts` (not `content/drafts`).
2. Commit and push. Netlify (or any host) runs `npm run build`; routes are generated from your files.

## Images with Cloudinary

1. Upload images in the [Cloudinary Media Library](https://cloudinary.com/).
2. Copy the **public ID** (e.g. `folder/my-image`), not the full URL.
3. Set `coverImage` to that public ID and `coverAlt` to a short description.
4. Set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local` (and in Netlify **Site settings → Environment variables**).

The `<BlogImage />` component and cover slots use `next/image` with a Cloudinary URL loader. Inline images inside Markdown are not wired to Cloudinary yet; use covers and future `BlogImage` placements for now.

## Environment variables

See `.env.example`:

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — required for images in the UI
- `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — reserved for future uploads; not required for reading public images
- `NEXT_PUBLIC_SITE_URL` — optional canonical URL for metadata (set to your production URL on Netlify)

## Project structure

```text
quiet-blog/
├── content/
│   ├── posts/           # Published .md / .mdx
│   └── drafts/          # Never loaded by the app
├── src/
│   ├── app/blog/        # /blog and /blog/[slug]
│   ├── components/      # BlogImage, layouts, cards
│   ├── lib/             # posts.ts, cloudinary.ts
│   └── types/post.ts
├── netlify.toml
└── .env.example
```

## Pages

- `/` — Home, featured + recent posts
- `/blog` — Index with tag filters
- `/blog/[slug]` — Post (SEO metadata + optional OG image when cover is set)
- `/about` — About

## Netlify deployment

This repo includes `netlify.toml` with `@netlify/plugin-nextjs` so Next.js runs correctly on Netlify (SSR, routing, images).

1. Push the repo to GitHub/GitLab/Bitbucket.
2. **New site from Git** in Netlify and pick the repo.
3. Build settings are read from `netlify.toml` (`npm run build`, `publish = ".next"`).
4. Under **Site settings → Environment variables**, add the same keys as `.env.example` (at minimum `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and `NEXT_PUBLIC_SITE_URL` for production URLs).

**If the deploy fails with “publish directory was not found at …/build”:** your site may still have **Publish directory** set to `build` in the Netlify UI. Either remove it so `netlify.toml` wins, or set **Publish directory** to `.next` to match `next build` output. Do not use `build` unless your build script actually creates a `build/` folder.

## Scripts

- `npm run dev` — Development
- `npm run build` — Production build
- `npm run start` — Run production server locally
- `npm run lint` — Lint
