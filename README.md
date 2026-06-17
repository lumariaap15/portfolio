# Portfolio — Luisa Alzate

Personal portfolio built with **Next.js 16 + Tailwind v4 + Velite (MDX)**.
Content lives as `.mdx` files in `content/` — edit a file, push, and Vercel redeploys.

## Stack

- **Next.js 16** (App Router, static generation)
- **Tailwind CSS v4** (design tokens in `src/app/globals.css`)
- **Velite** — Git-as-CMS: typed content collections from MDX
- **Motion** — scroll reveals and micro-interactions

## Run locally

```bash
npm install
npm run dev     # runs velite + next dev
```

Open http://localhost:3000

`npm run build` runs Velite first, then the Next build.

## How the CMS works

All content is MDX under `content/`. Each folder is a collection defined in
`velite.config.ts`. To update the site, you edit or add a file — no admin panel,
no external service.

```
content/
  experience/   -> work history       (one .mdx per job)
  skills/        -> skills + years     (grouped, core vs working)
  learning/      -> what you're learning now
  projects/      -> project case studies (supports embedded demos)
  blog/          -> posts (empty for now)
```

### Add a job
Create `content/experience/company-name.mdx`:

```mdx
---
company: "Company"
role: "Your Role"
context: "Industry - Location"
start: "Jan 2025"
end: "Present"
order: 4          # higher = shown first
stack: ["Next.js", "PostgreSQL"]
summary: "One-line description."
---

Bullet points and details in Markdown here.
```

### Add a "currently learning" item
Create `content/learning/topic.mdx`:

```mdx
---
topic: "LangGraph"
category: "AI Engineering"
note: "What you're doing with it and why."
active: true
order: 4
---
```

### Add a project (with a live demo slot)
Create `content/projects/name.mdx`. Inside the body you can embed React:

```mdx
---
title: "Project"
description: "Short description."
stack: ["Next.js", "OpenAI"]
status: "en-progreso"   # en-progreso | completado | concepto
featured: true          # shows on the home page
---

Write the case study. Embed a live AI demo with:

<DemoSlot label="Demo coming soon" />
```

When you build a real demo, replace `DemoSlot` with your own interactive
component (register it in `src/components/MDXContent.tsx`).

## Before deploying — fill in your details

Edit `src/lib/site.ts`:
- `links.github` and `links.linkedin` (currently placeholders)
- confirm `email` and `stats`

The skill-year numbers in `content/skills/*.mdx` are estimates derived from the CV —
review and adjust.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (it auto-detects Next.js).
3. No env vars needed. Done.

Custom domain: add it in Vercel project settings -> Domains.

## Next steps (roadmap)

See ROADMAP.md.
