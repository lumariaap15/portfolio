# Portfolio Improvements — Design Spec

**Date:** 2026-06-17
**Status:** Approved
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind v4 · Velite (MDX content layer) · Motion

## Goal

Six improvements to Luisa Alzate's portfolio:

1. EN/ES localization with a language toggle and full content translation.
2. Persistent sidebar layout (photo, navigation, contact buttons) à la the "Diaz" reference.
3. Admin-able Education & Certifications section.
4. Small, hardcoded "fun fact & hobbies" block with emojis.
5. Clearer contact CTAs: email opens prefilled `mailto:`, the displayed email becomes a CTA button, plus a WhatsApp link with a predefined message.
6. New palette: `#000000`, `#FFAC41`, `#FF1E56`, `#323232`.

Out of scope (stays in ROADMAP): real contact-form backend, dynamic OG image, analytics, per-locale SEO routes.

---

## 1. Localization (EN/ES) — lightweight toggle, no routes

### UI strings
- `src/i18n/messages/en.ts` and `src/i18n/messages/es.ts` export a typed dictionary (same shape, keys for all UI labels: nav items, section eyebrows/titles, CTA labels, footer text, hobbies block, etc.).
- `src/i18n/LocaleProvider.tsx` (client): React context holding `locale` (`"en" | "es"`) and a setter.
  - On first mount: read `localStorage["locale"]`; if absent, detect from `navigator.language` (`startsWith("es")` → `"es"`, else `"en"`); fall back to `"en"`.
  - On change: persist to `localStorage` and set `document.documentElement.lang`.
- Hooks: `useLocale()` returns `{ locale, setLocale }`; `useT()` returns the resolved messages object for the current locale.
- `LocaleProvider` wraps `<body>` children in `src/app/layout.tsx`. `<html lang>` starts as `"en"` server-side and is corrected client-side after detection.

### Content (Velite)
- **Rich-MDX-body collections (`experience`, `projects`, `blog`)** → one file per locale:
  - Filenames: `kiwi-financial.en.mdx`, `kiwi-financial.es.mdx`.
  - Schema gains `locale: s.enum(["en", "es"])`.
  - `transform` derives a shared `slug` from the filename **with the locale suffix stripped**, so both files share a slug.
  - Render: filter the collection by current `locale`, keyed by `slug`; if a locale variant is missing, fall back to the `en` variant.
- **Short-string collections (`skills`, `learning`, `credentials`)** → parallel frontmatter fields:
  - e.g. `note` + `note_es`, `category` + `category_es`, `group` + `group_es`.
  - Item names (e.g. "Python", "AWS") are not translated.
  - Helper `pick(obj, field, locale)` in `src/i18n/pick.ts` returns `obj[`${field}_es`]` when `locale === "es"` and it exists, else `obj[field]`.
- All translatable content is translated to ES; EN is initialized from current content.

### Server/client boundary
- `page.tsx` (server) reads all Velite data (both locales) and passes it to client section components.
- Components that render localized text become client components using `useT()` / `useLocale()` / `pick()`.
- Both-locale data is already bundled; selection happens client-side via context. No routing, no middleware.

---

## 2. Persistent sidebar layout

- New `src/components/Sidebar.tsx`.
- **Desktop (≥ `lg`):** left column, `sticky top-0` and full viewport height, never scrolls away. Contains, top to bottom:
  - Photo (`/public/luisa.jpg`; placeholder = initials "LA" on an accent block until the file exists).
  - Name, role, location.
  - Primary CTA button (email — see §5).
  - WhatsApp button (see §5).
  - Section navigation (anchors: Experience, Skills, Learning, Education, Projects).
  - Social icons: GitHub, LinkedIn, CV.
  - Language toggle `EN | ES`.
- **Layout:** `src/app/layout.tsx` main wrapper becomes `grid lg:grid-cols-[320px_1fr]`. Sidebar in column 1, scrolling `<main>` in column 2.
- **Mobile (< `lg`):** sidebar collapses to a stacked header at the top (photo small + name + role + CTAs) plus a slim **sticky** top mini-bar holding the language toggle and section anchors.
- The current top `Nav.tsx` sticky bar is removed; its responsibilities move into the sidebar / mobile mini-bar.

---

## 3. Education & Certifications (admin-able)

- New Velite collection `credentials`, pattern `credentials/**/*.mdx`:
  ```ts
  {
    type: s.enum(["education", "certification"]),
    title: s.string(),
    institution: s.string(),
    start: s.string().optional(),
    end: s.string().optional(),
    url: s.string().url().optional(),     // credential / verification link
    note: s.string().optional(),
    note_es: s.string().optional(),
    order: s.number().default(0),
  }
  ```
- New home section, eyebrow `05 — Education & Certifications`, with two subgroups (Education, Certifications), sorted by `order`. Each entry is a card showing title, institution, dates, optional verify link, optional note (localized via `pick`).
- Seed 1–2 example MDX files for Luisa to edit.

---

## 4. Fun fact & hobbies (hardcoded)

- Lives in `src/lib/site.ts` as a small structure with EN/ES strings and an emoji per item, well-commented for easy editing. Example placeholders: 🎸 música, ☕ café de especialidad, 📚 lectura.
- Rendered as a compact strip on the home page after the Learning section. Not a Velite collection.

---

## 5. Contact CTAs

- `src/lib/site.ts` gains:
  - `whatsapp`: number placeholder `PEGAR_NUMERO` (international format, digits only) + a predefined message string (EN/ES).
  - email subject/body presets (EN/ES) for the `mailto:` link.
- Helpers (e.g. in `src/lib/contact.ts`): `mailtoHref(locale)` → `mailto:<email>?subject=...&body=...`; `whatsappHref(locale)` → `https://wa.me/<number>?text=<encoded message>`.
- **Footer:** the displayed email text is replaced by a primary CTA button "Escribime → / Email me →" using `mailtoHref`. WhatsApp button alongside it.
- **Sidebar:** same two CTAs, always visible.

---

## 6. Palette

Update `@theme` tokens in `src/app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-ink` | `#000000` | page background |
| `--color-ink-soft` | `#1a1a1a` | elevated surfaces (cards) |
| `--color-line` | `#323232` | hairlines / borders |
| `--color-paper` | `#F5F3EF` | primary text |
| `--color-muted` | `#A8A8A8` | secondary text |
| `--color-faint` | `#6B6B6B` | tertiary / metadata |
| `--color-accent` | `#FFAC41` | primary accent: links, eyebrows, hover, primary CTA |
| `--color-accent-2` | `#FF1E56` | secondary accent: hero keyword, WhatsApp CTA, badges |

- Update `::selection` and `:focus-visible` to use `--color-accent`.
- Fonts unchanged. Hero keyword switches from amber to `--color-accent-2` (pink) per the chosen mapping.

---

## Components touched / created

- **New:** `Sidebar.tsx`, `LanguageToggle.tsx`, `i18n/LocaleProvider.tsx`, `i18n/messages/{en,es}.ts`, `i18n/pick.ts`, `lib/contact.ts`, `content/credentials/*.mdx`, localized MDX files.
- **Modified:** `layout.tsx` (provider + grid), `page.tsx` (sections become localized client components, new credentials & hobbies sections), `Footer.tsx` (CTA buttons), `globals.css` (palette), `velite.config.ts` (locale fields + credentials collection), `lib/site.ts` (whatsapp, hobbies, contact presets).
- **Removed/absorbed:** `Nav.tsx` (logic moves into Sidebar / mobile mini-bar).

## Verification

- `npm run dev` (Node 22 via nvm) builds Velite + Next with zero errors.
- Manual checks: language toggle flips all UI + content and persists across reload; sidebar stays fixed on desktop scroll and collapses correctly on mobile; email CTA opens prefilled `mailto`; WhatsApp link opens with predefined message; credentials render in both subgroups; palette applied throughout.
- `npm run build` passes.
