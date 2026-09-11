# luisaalzate.dev

Commercial site for Luisa Alzate, Independent Software Engineer. Built with
**Next.js 16 (App Router) + Tailwind v4 + Velite (MDX)**, served at `/en` and
`/es` via route-based i18n.

## Stack

- **Next.js 16** (App Router, static generation, `src/proxy.ts` for locale routing)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css` — light theme, single accent color)
- **Velite** — Git-as-CMS for the "Selected Work" case studies
- **Resend** — sends the contact-form lead email (`src/app/api/contact/route.ts`)
- **Motion** — hero entrance animation only (kept deliberately minimal)

Marketing copy (hero, services, process, FAQ, etc.) lives as typed dictionaries in
`src/i18n/messages/en.ts` / `es.ts` — not MDX, since it's short structured UI copy
rather than long-form content.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY to test the contact form
npm run dev                  # runs velite + next dev
```

Open http://localhost:3000 — it redirects to `/en` or `/es` based on `Accept-Language`.

`npm run build` runs Velite first, then the Next build.

## i18n routing

`src/proxy.ts` redirects `/` to `/en` or `/es`. `src/app/[locale]/layout.tsx` and
`page.tsx` render per locale, with `generateStaticParams` for both. Add a locale by
extending `locales` in `src/i18n/getMessages.ts` and adding a `messages/<locale>.ts`
dictionary satisfying the `Messages` type.

## Selected Work (case studies)

Each case study is a pair of MDX files in `content/projects/`:

```mdx
---
title: "Case study title"
description: "One-line summary."
category: "custom" | "integration" | "modernization"
problem: "..."
approach: "..."
outcome: "..."
stack: ["Next.js", "PostgreSQL"]
featured: true   # shows on the homepage — exactly one per category is shown
locale: "en"      # matching .es.mdx file uses locale: "es"
---
```

Several of the current case studies are marked `PLACEHOLDER` in their `outcome`
field and with an MDX comment — review and confirm real metrics before treating
them as final marketing copy.

## Before deploying — fill in your details

Edit `src/lib/site.ts`:
- `bookingUrl` — currently a placeholder Cal.com link, replace with the real one
- `links.github` / `links.linkedin` — confirm these are correct
- `email`

Set `RESEND_API_KEY` (see `.env.example`) in your deploy environment so the
contact form can send email — the `from` address in `src/app/api/contact/route.ts`
uses Resend's sandbox sender until a `luisaalzate.dev` sender is verified.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (it auto-detects Next.js).
3. Add the `RESEND_API_KEY` env var.
4. Point the `luisaalzate.dev` domain at it in Vercel project settings → Domains.
