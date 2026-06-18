
# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add EN/ES localization, a persistent sidebar layout, an admin-able Education & Certifications section, a hardcoded hobbies block, clearer email/WhatsApp CTAs, and a new color palette to Luisa Alzate's portfolio.

**Architecture:** Lightweight client-side i18n (React context + typed message dictionaries, no routing). Velite content is localized two ways — per-locale files for rich MDX bodies (`experience`, `projects`, `blog`) and parallel `_es` frontmatter fields for short-string collections (`skills`, `learning`, `credentials`). Layout shifts from a top sticky nav to a two-column grid with a sticky sidebar on desktop that collapses on mobile. Contact is `mailto:` + `wa.me` deep links built from presets in `site.ts`.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind v4, Velite, Motion, TypeScript.

## Global Constraints

- Node 22 via nvm (Next 16 requires Node ≥ 20.9.0). Run `nvm use 22` before any npm command.
- Tailwind v4: color tokens are CSS custom properties in `@theme` in `src/app/globals.css`, used as `text-(--color-x)` / `bg-(--color-x)`. No `tailwind.config.js`.
- Google Fonts `@import` MUST stay the first line of `globals.css`, before `@import "tailwindcss";` (Tailwind v4 expands inline and pushes later imports below generated CSS — known prior bug).
- No test framework exists. The per-task "test cycle" is `npm run build` (runs Velite + Next typecheck/compile) plus the stated manual `npm run dev` checks. Never invent a test runner.
- Palette: `#000000` (bg), `#FFAC41` (amber, primary accent), `#FF1E56` (pink, secondary accent), `#323232` (lines/borders). Derived shade `#1a1a1a` allowed for elevated surfaces.
- Default locale resolution: `localStorage["locale"]` → else `navigator.language.startsWith("es")` → else `"en"`.
- WhatsApp number stays as the literal placeholder `PEGAR_NUMERO` (digits only, international, no `+`) for Luisa to replace. Photo path `/luisa.jpg` with an initials placeholder until the file exists.
- Commits assume git. The repo is not initialized — Task 0 handles that. If the user declines git, skip every `git commit` step.

---

## Task 0: Initialize git (optional, enables commits)

**Files:**
- Create: `.gitignore` already exists — verify it ignores `.next`, `node_modules`, `.velite`.

- [ ] **Step 1: Check git state**

Run: `git rev-parse --is-inside-work-tree 2>/dev/null || echo "no-git"`
Expected: `no-git` (or `true` if already a repo — then skip to Step 4).

- [ ] **Step 2: Confirm ignores**

Run: `cat .gitignore`
Expected: contains `node_modules`, `.next`, `.velite`. If `.velite` is missing, append it:

```sh
printf '\n.velite\n' >> .gitignore
```

- [ ] **Step 3: Initialize**

```sh
git init && git add -A && git commit -m "chore: baseline before portfolio improvements"
```

- [ ] **Step 4: Confirm Node version**

Run: `nvm use 22 && node -v`
Expected: `v22.x`

---

## Task 1: New color palette

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: CSS tokens `--color-ink`, `--color-ink-soft`, `--color-line`, `--color-paper`, `--color-muted`, `--color-faint`, `--color-accent`, `--color-accent-soft`, `--color-accent-2`. All later tasks reference these names.

- [ ] **Step 1: Replace the `@theme` color block**

In `src/app/globals.css`, replace the palette comment block + color vars (lines under `@theme {` down to `--color-accent-soft`) with:

```css
  /* ── Paleta: negro puro + ámbar (primario) + rosa (secundario) ── */
  --color-ink: #000000;          /* fondo base */
  --color-ink-soft: #1a1a1a;     /* superficies elevadas (cards) */
  --color-line: #323232;         /* hairlines / borders */
  --color-paper: #f5f3ef;        /* texto principal */
  --color-muted: #a8a8a8;        /* texto secundario */
  --color-faint: #6b6b6b;        /* terciario / metadata */
  --color-accent: #ffac41;       /* ámbar — acento primario */
  --color-accent-soft: #e0962f;  /* ámbar hover/pressed */
  --color-accent-2: #ff1e56;     /* rosa — acento secundario */
```

Leave the font tokens, `:root`, `html`, reduced-motion, `body`, `::selection`, and `:focus-visible` blocks unchanged (they already reference `--color-accent` / `--color-ink`).

- [ ] **Step 2: Build to verify CSS compiles**

Run: `nvm use 22 && npm run build`
Expected: build completes, no PostCSS/CSS parse errors.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: background is pure black, text off-white, amber accents render. (Pink not yet used — added later.)

- [ ] **Step 4: Commit**

```sh
git add src/app/globals.css
git commit -m "feat: apply new black/amber/pink palette"
```

---

## Task 2: Site data — contact presets, WhatsApp, hobbies

**Files:**
- Modify: `src/lib/site.ts`

**Interfaces:**
- Produces:
  - `site.whatsapp = { number: string, message: { en: string, es: string } }`
  - `site.contact = { subject: { en: string, es: string }, body: { en: string, es: string } }`
  - `site.hobbies = { en: HobbyLine[], es: HobbyLine[] }` where `HobbyLine = { emoji: string, text: string }`
  - `site.funFact = { en: string, es: string }`
  - existing `site.email`, `site.links`, `site.name`, `site.role`, `site.location` unchanged.

- [ ] **Step 1: Extend `site.ts`**

Append inside the `site` object (before the closing `};`), keeping existing fields:

```ts
  // ── Contacto: presets para los CTAs (mailto + WhatsApp) ──
  whatsapp: {
    number: "PEGAR_NUMERO", // ← reemplazá: solo dígitos, formato internacional sin "+", ej "5493511234567"
    message: {
      en: "Hi Luisa! I saw your portfolio and I'd love to talk.",
      es: "¡Hola Luisa! Vi tu portfolio y me encantaría conversar.",
    },
  },
  contact: {
    subject: {
      en: "Let's work together",
      es: "Trabajemos juntos",
    },
    body: {
      en: "Hi Luisa,\n\nI saw your portfolio and wanted to reach out about...",
      es: "Hola Luisa,\n\nVi tu portfolio y quería escribirte sobre...",
    },
  },

  // ── Dato curioso + hobbies (hardcodeado, editá libremente) ──
  funFact: {
    en: "Outside of code, you'll usually find me here:",
    es: "Fuera del código, normalmente me encontrás acá:",
  },
  hobbies: {
    en: [
      { emoji: "🎸", text: "Music & playing guitar" },
      { emoji: "☕", text: "Specialty coffee" },
      { emoji: "📚", text: "Reading" },
      { emoji: "✈️", text: "Travel" },
    ],
    es: [
      { emoji: "🎸", text: "Música y tocar la guitarra" },
      { emoji: "☕", text: "Café de especialidad" },
      { emoji: "📚", text: "Lectura" },
      { emoji: "✈️", text: "Viajar" },
    ],
  },
```

- [ ] **Step 2: Typecheck**

Run: `nvm use 22 && npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 3: Commit**

```sh
git add src/lib/site.ts
git commit -m "feat: add whatsapp, contact presets and hobbies to site data"
```

---

## Task 3: i18n core — messages, provider, hooks, pick helper

**Files:**
- Create: `src/i18n/messages/en.ts`
- Create: `src/i18n/messages/es.ts`
- Create: `src/i18n/LocaleProvider.tsx`
- Create: `src/i18n/pick.ts`

**Interfaces:**
- Produces:
  - `type Locale = "en" | "es"` (exported from `LocaleProvider.tsx`)
  - `type Messages` = shape of `en.ts` default export (exported from `messages/en.ts`)
  - `<LocaleProvider>` (client component, default-detects locale)
  - `useLocale(): { locale: Locale; setLocale: (l: Locale) => void }`
  - `useT(): Messages`
  - `pick<T>(obj: T, field: keyof T & string, locale: Locale): string` from `pick.ts`

- [ ] **Step 1: Create the EN dictionary**

Create `src/i18n/messages/en.ts`:

```ts
export const en = {
  nav: {
    experience: "Experience",
    skills: "Skills",
    learning: "Learning",
    education: "Education",
    projects: "Projects",
  },
  hero: {
    pre: "Full-Stack Software Engineer",
    lineA: "Building cutting-edge,",
    keyword: "people-centered",
    lineB: "software.",
    blurb: "years across fintech, e-commerce, and enterprise platforms — now expanding into AI engineering. Based in",
  },
  sections: {
    experienceEyebrow: "01 — Experience",
    experienceTitle: "Where I've worked",
    skillsEyebrow: "02 — Skills",
    skillsTitle: "What I work with",
    workingKnowledge: "Working knowledge · growing",
    learningEyebrow: "03 — Currently learning",
    learningTitle: "Where I'm growing",
    educationEyebrow: "04 — Education & Certifications",
    educationTitle: "Where I studied",
    education: "Education",
    certifications: "Certifications",
    projectsEyebrow: "05 — Selected work",
    projectsTitle: "Things I'm building",
    viewAllProjects: "View all projects →",
  },
  cta: {
    email: "Email me →",
    whatsapp: "WhatsApp",
    work: "Let's work together",
    cv: "CV",
  },
  footer: {
    rights: "All rights reserved",
  },
} as const;

export type Messages = typeof en;
export default en;
```

- [ ] **Step 2: Create the ES dictionary**

Create `src/i18n/messages/es.ts` (same shape, translated):

```ts
import type { Messages } from "./en";

export const es: Messages = {
  nav: {
    experience: "Experiencia",
    skills: "Skills",
    learning: "Aprendiendo",
    education: "Educación",
    projects: "Proyectos",
  },
  hero: {
    pre: "Ingeniera de Software Full-Stack",
    lineA: "Construyendo software",
    keyword: "centrado en las personas",
    lineB: "y de vanguardia.",
    blurb: "años en fintech, e-commerce y plataformas empresariales — ahora expandiéndome hacia AI engineering. Desde",
  },
  sections: {
    experienceEyebrow: "01 — Experiencia",
    experienceTitle: "Dónde trabajé",
    skillsEyebrow: "02 — Skills",
    skillsTitle: "Con qué trabajo",
    workingKnowledge: "Conocimiento práctico · creciendo",
    learningEyebrow: "03 — Aprendiendo ahora",
    learningTitle: "Dónde estoy creciendo",
    educationEyebrow: "04 — Educación y Certificaciones",
    educationTitle: "Dónde estudié",
    education: "Educación",
    certifications: "Certificaciones",
    projectsEyebrow: "05 — Trabajo seleccionado",
    projectsTitle: "Lo que estoy construyendo",
    viewAllProjects: "Ver todos los proyectos →",
  },
  cta: {
    email: "Escribime →",
    whatsapp: "WhatsApp",
    work: "Trabajemos juntos",
    cv: "CV",
  },
  footer: {
    rights: "Todos los derechos reservados",
  },
};

export default es;
```

- [ ] **Step 3: Create the pick helper**

Create `src/i18n/pick.ts`:

```ts
import type { Locale } from "./LocaleProvider";

// Returns the _es variant when locale is "es" and it exists, else the base field.
export function pick<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: Locale
): string {
  if (locale === "es") {
    const esVal = obj[`${field}_es`];
    if (typeof esVal === "string" && esVal.length > 0) return esVal;
  }
  const base = obj[field];
  return typeof base === "string" ? base : "";
}
```

- [ ] **Step 4: Create the provider + hooks**

Create `src/i18n/LocaleProvider.tsx`:

```tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en, { type Messages } from "./messages/en";
import es from "./messages/es";

export type Locale = "en" | "es";

const messages: Record<Locale, Messages> = { en, es };

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx | null>(null);

function detectInitial(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("locale");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Detect after mount to avoid hydration mismatch (server always renders "en").
  useEffect(() => {
    const initial = detectInitial();
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT(): Messages {
  return messages[useLocale().locale];
}
```

- [ ] **Step 5: Typecheck**

Run: `nvm use 22 && npx tsc --noEmit`
Expected: no errors (the `es` object must satisfy `Messages` — if a key is missing, tsc fails here; add it).

- [ ] **Step 6: Commit**

```sh
git add src/i18n
git commit -m "feat: add i18n core (provider, hooks, en/es messages, pick helper)"
```

---

## Task 4: Contact link helpers

**Files:**
- Create: `src/lib/contact.ts`

**Interfaces:**
- Consumes: `site.email`, `site.contact`, `site.whatsapp` (Task 2); `Locale` (Task 3).
- Produces: `mailtoHref(locale: Locale): string`, `whatsappHref(locale: Locale): string`.

- [ ] **Step 1: Create `src/lib/contact.ts`**

```ts
import { site } from "./site";
import type { Locale } from "@/i18n/LocaleProvider";

export function mailtoHref(locale: Locale): string {
  const subject = encodeURIComponent(site.contact.subject[locale]);
  const body = encodeURIComponent(site.contact.body[locale]);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function whatsappHref(locale: Locale): string {
  const msg = encodeURIComponent(site.whatsapp.message[locale]);
  return `https://wa.me/${site.whatsapp.number}?text=${msg}`;
}
```

- [ ] **Step 2: Typecheck**

Run: `nvm use 22 && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```sh
git add src/lib/contact.ts
git commit -m "feat: add mailto and whatsapp link helpers"
```

---

## Task 5: Velite schema — locale fields + credentials collection

**Files:**
- Modify: `velite.config.ts`

**Interfaces:**
- Produces (in `#content`): `experience[].locale`, `projects[].locale`, `blog[].locale`; `learning[].note_es?`, `learning[].category_es?`; `skills[].group_es?`; new `credentials` collection exported as `credentials`.
- `slug` on experience/projects/blog now strips a trailing `.en`/`.es` from the filename so both locale files share a slug.

- [ ] **Step 1: Add `locale` + slug-from-filename to experience**

In `velite.config.ts`, the `experience` schema currently derives slug from `company`. Change it to add `locale` and derive a locale-stripped slug from the file path. Replace the `experience` definition with:

```ts
const experience = defineCollection({
  name: "Experience",
  pattern: "experience/**/*.mdx",
  schema: s
    .object({
      company: s.string(),
      role: s.string(),
      role_es: s.string().optional(),
      location: s.string().optional(),
      context: s.string().optional(),
      context_es: s.string().optional(),
      start: s.string(),
      end: s.string().default("Present"),
      order: s.number().default(0),
      stack: s.array(s.string()).default([]),
      summary: s.string().optional(),
      summary_es: s.string().optional(),
      locale: s.enum(["en", "es"]).default("en"),
      content: s.mdx(),
      path: s.path(),
    })
    .transform((data) => ({
      ...data,
      // strip "experience/foo.en" → slug "foo"
      slug: data.path.split("/").pop()!.replace(/\.(en|es)$/, ""),
    })),
});
```

Note: `s.path()` returns the file path without extension (Velite built-in), e.g. `experience/kiwi-financial.en`.

- [ ] **Step 2: Add `locale` to projects and blog**

In the `projects` schema, add `locale: s.enum(["en", "es"]).default("en"),` and `path: s.path(),`, and change its transform slug to:

```ts
    .transform((data) => ({
      ...data,
      slug: data.path.split("/").pop()!.replace(/\.(en|es)$/, ""),
    })),
```

In the `blog` schema, do the same: add `locale: s.enum(["en", "es"]).default("en"),`, `path: s.path(),`, and the same slug transform.

- [ ] **Step 3: Add `_es` fields to learning and skills**

In `learning` schema add: `note_es: s.string().optional(),` and `category_es: s.string().optional(),`.
In `skills` schema add: `group_es: s.string().optional(),`.

- [ ] **Step 4: Add the credentials collection**

Add before `export default defineConfig(...)`:

```ts
// ── Educación & Certificaciones (administrable) ──────────────────────
const credentials = defineCollection({
  name: "Credential",
  pattern: "credentials/**/*.mdx",
  schema: s.object({
    type: s.enum(["education", "certification"]),
    title: s.string(),
    institution: s.string(),
    start: s.string().optional(),
    end: s.string().optional(),
    url: s.string().url().optional(),
    note: s.string().optional(),
    note_es: s.string().optional(),
    order: s.number().default(0),
  }),
});
```

Then add `credentials` to the `collections` object:

```ts
  collections: { experience, projects, learning, skills, blog, credentials },
```

- [ ] **Step 5: Run Velite to verify schema + regenerate types**

Run: `nvm use 22 && npm run velite`
Expected: completes; `.velite` regenerated with `credentials` and new fields. No schema validation errors against existing files (existing files have no `locale` → defaults to `"en"`; slug now derives from filename — verify existing detail pages still resolve in Task 9).

- [ ] **Step 6: Commit**

```sh
git add velite.config.ts
git commit -m "feat: add locale fields and credentials collection to velite"
```

---

## Task 6: Localize + seed content (MDX)

**Files:**
- Rename/Create: `content/experience/*.en.mdx` + `*.es.mdx` (for `ceindetec`, `freelance`, `kiwi-financial`)
- Rename/Create: `content/projects/profetai.en.mdx` + `.es.mdx`
- Modify: `content/learning/*.mdx` (add `note_es`, `category_es`)
- Modify: `content/skills/*.mdx` (add `group_es`)
- Create: `content/credentials/example-degree.mdx`, `content/credentials/example-cert.mdx`

**Interfaces:**
- Consumes: schema from Task 5.
- Produces: every experience/project slug has both `en` and `es` files; learning/skills carry `_es`; ≥2 credentials seeded.

- [ ] **Step 1: Split each experience file into `.en.mdx` and `.es.mdx`**

For each of `ceindetec`, `freelance`, `kiwi-financial`: rename the existing file to `<name>.en.mdx` (add `locale: "en"` to frontmatter), then create `<name>.es.mdx` with `locale: "es"` and the body + summary/role/context translated to Spanish.

Example — `content/experience/kiwi-financial.es.mdx`:

```mdx
---
company: "Kiwi Financial"
role: "Desarrolladora de Software"
location: "Remoto"
context: "Fintech · mercado Puerto Rico / EE.UU."
start: "Ago 2024"
end: "Presente"
order: 3
stack: ["Node.js", "TypeScript", "React", "PostgreSQL", "AWS"]
summary: "Plataforma de préstamos en la nube para consumidores latinos en EE.UU. y Puerto Rico, con foco en cumplimiento, performance y seguridad."
locale: "es"
---

Desarrollé features full-stack de punta a punta con Node.js (Express + TypeScript) y React — en pagos, verificación de identidad, recompensas e internacionalización, desde el diseño y las discusiones de arquitectura hasta el deploy en AWS.

- Construí un sistema de internacionalización (i18n) para toda la app desde cero — integré i18next en todos los flujos principales y agregué una capa de enforcement en CI (GitHub Actions + config de ESLint custom + scripts de escaneo) que bloquea strings sin traducir en cada PR. Capacité al equipo para adoptarlo y extenderlo.
- Diseñé hooks de React reutilizables para flujos de pago e identidad — gating regional, lógica de reintentos y verificación de wallet — encapsulando reglas de negocio complejas en interfaces limpias y componibles.
- Construí y mantuve APIs RESTful y servicios backend, incluyendo integraciones con TinCheck, webhooks de LoanPro y Persona para verificación de identidad.
- Diseñé y optimicé esquemas y queries de PostgreSQL que soportan los flujos centrales de préstamos.
- Impulsé la observabilidad — instrumenté eventos custom con LogRocket, Mixpanel y Datadog; construí dashboards y embudos; usé Sentry para monitoreo de errores y Statsig para feature rollouts.
- Escribí tests con Jest en frontend y backend para proteger los caminos críticos.
```

And `content/experience/kiwi-financial.en.mdx` is the current file with `locale: "en"` added to frontmatter. Apply the same en/es split to `ceindetec` and `freelance` (translate their bodies/summaries equivalently).

- [ ] **Step 2: Split the project file**

Rename `content/projects/profetai.mdx` → `content/projects/profetai.en.mdx` (add `locale: "en"`). Create `content/projects/profetai.es.mdx` with `locale: "es"`, translating `description` and the MDX body; keep `title`, `stack`, `repo`, `demo`, `date`, `status` identical so the slug matches.

- [ ] **Step 3: Add `_es` to learning files**

For each `content/learning/*.mdx`, add translated `note_es` and (if `category` present) `category_es`. Example for `ai-engineering.mdx`:

```yaml
note_es: "Inscripta en el AI Engineer Path de Scrimba. Construyendo features de LLM con mentalidad de producción — RAG, normalización basada en embeddings y workflows agénticos."
category_es: "AI Engineering"
```

Repeat for `python-ai.mdx` and `embeddings.mdx`.

- [ ] **Step 4: Add `group_es` to skills files**

For each `content/skills/*.mdx`, add `group_es`. Mapping:
- `languages.mdx` → `group_es: "Lenguajes"`
- `frontend.mdx` → `group_es: "Frontend"`
- `backend.mdx` → `group_es: "Backend"`
- `data-cloud.mdx` → `group_es: "Datos y Cloud"`
- `working-knowledge.mdx` → `group_es: "Conocimiento práctico"`

(Open each file to confirm its actual `group` value before editing.)

- [ ] **Step 5: Seed credentials**

Create `content/credentials/example-degree.mdx`:

```mdx
---
type: "education"
title: "Ingeniería en Sistemas de Información"
institution: "Universidad — EDITAR"
start: "2016"
end: "2021"
order: 1
note: "Replace with your real degree, institution and dates."
note_es: "Reemplazá con tu título, institución y fechas reales."
---
```

Create `content/credentials/example-cert.mdx`:

```mdx
---
type: "certification"
title: "AWS Certified Cloud Practitioner — EDITAR"
institution: "Amazon Web Services"
end: "2025"
url: "https://www.credly.com/"
order: 1
note: "Replace with a real certification and its verification link."
note_es: "Reemplazá con una certificación real y su link de verificación."
---
```

- [ ] **Step 6: Rebuild content**

Run: `nvm use 22 && npm run velite`
Expected: all files validate; collections include both locales and the two credentials.

- [ ] **Step 7: Commit**

```sh
git add content
git commit -m "feat: localize content (en/es) and seed credentials"
```

---

## Task 7: Sidebar + LanguageToggle + layout grid

**Files:**
- Create: `src/components/Sidebar.tsx`
- Create: `src/components/LanguageToggle.tsx`
- Modify: `src/app/layout.tsx`
- Delete: `src/components/Nav.tsx`

**Interfaces:**
- Consumes: `useT`, `useLocale`, `LocaleProvider` (Task 3); `mailtoHref`, `whatsappHref` (Task 4); `site` (Task 2).
- Produces: `<Sidebar />`, `<LanguageToggle />`. Layout renders `LocaleProvider > grid[Sidebar | main]`.

- [ ] **Step 1: Create `LanguageToggle.tsx`**

```tsx
"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="inline-flex items-center gap-1 font-mono text-xs">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            locale === l
              ? "text-(--color-accent)"
              : "text-(--color-faint) transition-colors hover:text-(--color-paper)"
          }
        >
          {l.toUpperCase()}
        </button>
      )).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, <span key={`sep${i}`} className="text-(--color-faint)">/</span>, el]), [] as React.ReactNode[])}
    </div>
  );
}
```

- [ ] **Step 2: Create `Sidebar.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/site";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { mailtoHref, whatsappHref } from "@/lib/contact";
import { LanguageToggle } from "./LanguageToggle";

function PhotoBlock() {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-(--color-accent) font-display text-5xl text-(--color-ink)">
        LA
      </div>
    );
  }
  return (
    <Image
      src="/luisa.jpg"
      alt={site.name}
      width={320}
      height={320}
      onError={() => setOk(false)}
      className="aspect-square w-full rounded-2xl object-cover"
    />
  );
}

export function Sidebar() {
  const t = useT();
  const { locale } = useLocale();

  const navItems = [
    { href: "/#experience", label: t.nav.experience },
    { href: "/#skills", label: t.nav.skills },
    { href: "/#learning", label: t.nav.learning },
    { href: "/#education", label: t.nav.education },
    { href: "/projects", label: t.nav.projects },
  ];

  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:overflow-y-auto border-(--color-line) px-6 py-8 lg:border-r lg:px-8">
      <div>
        <Link href="/" className="block max-w-[220px]">
          <PhotoBlock />
        </Link>
        <h1 className="mt-6 font-display text-2xl text-(--color-paper)">{site.name}</h1>
        <p className="mt-1 text-sm text-(--color-muted)">{t.hero.pre}</p>
        <p className="mt-1 font-mono text-xs text-(--color-faint)">{site.location}</p>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3">
          <a
            href={mailtoHref(locale)}
            className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-5 py-2.5 font-mono text-sm text-(--color-ink) transition-colors hover:bg-(--color-accent-soft)"
          >
            {t.cta.email}
          </a>
          <a
            href={whatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-(--color-accent-2) px-5 py-2.5 font-mono text-sm text-(--color-accent-2) transition-colors hover:bg-(--color-accent-2) hover:text-(--color-ink)"
          >
            {t.cta.whatsapp}
          </a>
        </div>

        {/* Section nav (desktop) */}
        <nav className="mt-8 hidden lg:block">
          <ul className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-(--color-muted) transition-colors hover:text-(--color-paper)">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-(--color-line) pt-6">
        <div className="flex gap-4 font-mono text-xs text-(--color-muted)">
          <a target="_blank" href={site.links.github} className="transition-colors hover:text-(--color-paper)">GitHub</a>
          <a target="_blank" href={site.links.linkedin} className="transition-colors hover:text-(--color-paper)">LinkedIn</a>
          <a target="_blank" href={site.links.cv} className="transition-colors hover:text-(--color-paper)">{t.cta.cv}</a>
        </div>
        <LanguageToggle />
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Rewrite `layout.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.headline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.headline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <div className="lg:grid lg:grid-cols-[320px_1fr]">
            <Sidebar />
            <div className="min-w-0">
              <main className="mx-auto w-full max-w-4xl px-6 md:px-8">{children}</main>
              <Footer />
            </div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Delete the old Nav**

```sh
rm src/components/Nav.tsx
```

- [ ] **Step 5: Build (catches the dangling Nav import + types)**

Run: `nvm use 22 && npm run build`
Expected: build passes. If it fails on a missing `Nav` import, confirm `layout.tsx` no longer imports it (it doesn't above).

- [ ] **Step 6: Visual check**

Run: `npm run dev`. Desktop ≥1024px: sidebar fixed on the left, stays put while main scrolls; photo shows "LA" placeholder (no `/luisa.jpg` yet); EN/ES toggle flips nav labels + CTA labels and persists on reload. Mobile <1024px: sidebar stacks at the top.
Expected: all true.

- [ ] **Step 7: Commit**

```sh
git add src/components/Sidebar.tsx src/components/LanguageToggle.tsx src/app/layout.tsx
git rm src/components/Nav.tsx
git commit -m "feat: persistent sidebar layout with photo, CTAs and language toggle"
```

---

## Task 8: Localize home page + add credentials & hobbies sections

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/HomeSections.tsx`

**Interfaces:**
- Consumes: `#content` (`experience`, `skills`, `learning`, `projects`, `credentials`); `useT`, `useLocale`, `pick`; `site.hobbies`, `site.funFact`.
- Produces: `<HomeSections data={...} />` client component rendering all home sections localized.

**Why a new client component:** `page.tsx` is a server component reading Velite data. The sections need `useT()`/`useLocale()` (client). So `page.tsx` stays a thin server component that reads data and passes it to a `"use client"` `HomeSections` that does the localization. This keeps the data read on the server and the locale switching on the client.

- [ ] **Step 1: Create `HomeSections.tsx` with localized rendering**

Create `src/components/HomeSections.tsx`. It receives the full collections as props and uses the current locale to filter experience/projects by `locale` (fallback to `en`) and `pick()` for learning/skills/credentials. Render order: Hero, Experience (01), Skills (02), Learning (03), Hobbies strip, Education & Certifications (04), Projects (05).

```tsx
"use client";

import Link from "next/link";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/pick";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { MDXContent } from "@/components/MDXContent";

type Exp = (typeof import("#content"))["experience"][number];
type Skill = (typeof import("#content"))["skills"][number];
type Learn = (typeof import("#content"))["learning"][number];
type Proj = (typeof import("#content"))["projects"][number];
type Cred = (typeof import("#content"))["credentials"][number];

export function HomeSections({
  experience,
  skills,
  learning,
  projects,
  credentials,
}: {
  experience: Exp[];
  skills: Skill[];
  learning: Learn[];
  projects: Proj[];
  credentials: Cred[];
}) {
  const t = useT();
  const { locale } = useLocale();

  // pick locale variant of rich-body collections, fall back to en
  const byLocale = <T extends { slug: string; locale: string }>(items: T[]) => {
    const wanted = items.filter((i) => i.locale === locale);
    const seen = new Set(wanted.map((i) => i.slug));
    const fallback = items.filter((i) => i.locale === "en" && !seen.has(i.slug));
    return [...wanted, ...fallback];
  };

  const sortedExp = byLocale(experience).sort((a, b) => b.order - a.order);
  const coreSkills = skills.filter((s) => s.tier === "core").sort((a, b) => a.order - b.order);
  const workingSkills = skills.find((s) => s.tier === "working");
  const activeLearning = learning.filter((l) => l.active).sort((a, b) => a.order - b.order);
  const featured = byLocale(projects).filter((p) => p.featured);
  const hobbies = site.hobbies[locale];

  const education = credentials.filter((c) => c.type === "education").sort((a, b) => a.order - b.order);
  const certs = credentials.filter((c) => c.type === "certification").sort((a, b) => a.order - b.order);

  return (
    <>
      {/* HERO */}
      <section className="flex min-h-[70vh] flex-col justify-center py-20">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-widest text-(--color-accent)">{t.hero.pre}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-(--color-paper) md:text-7xl">
            {t.hero.lineA} <span className="text-(--color-accent-2)">{t.hero.keyword}</span> {t.hero.lineB}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-(--color-muted)">
            {site.yearsExperience} {t.hero.blurb} {site.location}.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-(--color-line) pt-10 sm:grid-cols-3">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-4xl text-(--color-paper)">{stat.value}</dt>
                <dd className="mt-2 font-mono text-xs uppercase tracking-wider text-(--color-faint)">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow={t.sections.experienceEyebrow} title={t.sections.experienceTitle}>
        <div className="flex flex-col">
          {sortedExp.map((job) => (
            <Reveal key={job.slug}>
              <article className="grid grid-cols-1 gap-4 border-t border-(--color-line) py-10 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="font-mono text-xs text-(--color-faint)">{job.start} — {job.end}</p>
                  {pick(job, "context", locale) && (
                    <p className="mt-2 text-xs text-(--color-faint)">{pick(job, "context", locale)}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-(--color-paper)">{pick(job, "role", locale)}</h3>
                  <p className="mt-1 text-(--color-accent)">{job.company}</p>
                  {pick(job, "summary", locale) && (
                    <p className="mt-4 leading-relaxed text-(--color-muted)">{pick(job, "summary", locale)}</p>
                  )}
                  <div className="prose-mdx mt-4 text-sm leading-relaxed text-(--color-muted)">
                    <MDXContent code={job.content} />
                  </div>
                  {job.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li key={tech} className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)">{tech}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow={t.sections.skillsEyebrow} title={t.sections.skillsTitle}>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {coreSkills.map((group) => (
            <Reveal key={group.group}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">{pick(group, "group", locale)}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between border-b border-(--color-line) pb-2">
                      <span className="text-(--color-paper)">{item.name}</span>
                      {item.years && <span className="font-mono text-xs text-(--color-faint)">{item.years}y</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        {workingSkills && (
          <Reveal>
            <div className="mt-12 border-t border-(--color-line) pt-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">{t.sections.workingKnowledge}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {workingSkills.items.map((item) => (
                  <li key={item.name} className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)">{item.name}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </Section>

      {/* LEARNING */}
      <Section id="learning" eyebrow={t.sections.learningEyebrow} title={t.sections.learningTitle}>
        <div className="flex flex-col">
          {activeLearning.map((item) => (
            <Reveal key={item.topic}>
              <div className="grid grid-cols-1 gap-2 border-t border-(--color-line) py-6 md:grid-cols-[200px_1fr]">
                <div>
                  <h3 className="text-(--color-paper)">{item.topic}</h3>
                  {pick(item, "category", locale) && <p className="mt-1 font-mono text-xs text-(--color-faint)">{pick(item, "category", locale)}</p>}
                </div>
                <p className="leading-relaxed text-(--color-muted)">{pick(item, "note", locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOBBIES (hardcoded) */}
      <Reveal>
        <section className="border-t border-(--color-line) py-10">
          <p className="text-(--color-muted)">{site.funFact[locale]}</p>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {hobbies.map((h) => (
              <li key={h.text} className="flex items-center gap-2 text-(--color-paper)">
                <span className="text-xl">{h.emoji}</span>
                <span className="text-sm">{h.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* EDUCATION & CERTIFICATIONS */}
      <Section id="education" eyebrow={t.sections.educationEyebrow} title={t.sections.educationTitle}>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {[
            { label: t.sections.education, items: education },
            { label: t.sections.certifications, items: certs },
          ].map((col) => (
            <div key={col.label}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">{col.label}</h3>
              <div className="mt-4 flex flex-col">
                {col.items.map((c, i) => (
                  <Reveal key={`${c.title}-${i}`}>
                    <div className="border-t border-(--color-line) py-5">
                      <h4 className="text-(--color-paper)">{c.title}</h4>
                      <p className="mt-1 text-sm text-(--color-muted)">{c.institution}</p>
                      <p className="mt-1 font-mono text-xs text-(--color-faint)">
                        {[c.start, c.end].filter(Boolean).join(" — ")}
                      </p>
                      {pick(c, "note", locale) && <p className="mt-2 text-sm text-(--color-muted)">{pick(c, "note", locale)}</p>}
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-xs text-(--color-accent) hover:underline">
                          ↗ verify
                        </a>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      {featured.length > 0 && (
        <Section id="projects" eyebrow={t.sections.projectsEyebrow} title={t.sections.projectsTitle}>
          <div className="grid grid-cols-1 gap-6">
            {featured.map((project) => (
              <Reveal key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="group block rounded-xl border border-(--color-line) bg-(--color-ink-soft) p-8 transition-colors hover:border-(--color-accent)">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-(--color-paper) transition-colors group-hover:text-(--color-accent)">{project.title}</h3>
                    <span className="font-mono text-xs text-(--color-faint)">{project.status}</span>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-(--color-muted)">{project.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (<li key={tech} className="font-mono text-xs text-(--color-faint)">{tech}</li>))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/projects" className="mt-8 inline-block font-mono text-sm text-(--color-accent) hover:underline">{t.sections.viewAllProjects}</Link>
          </Reveal>
        </Section>
      )}
    </>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">{eyebrow}</p>
        <h2 className="mt-4 font-display text-4xl tracking-tight text-(--color-paper) md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Slim down `page.tsx` to a server data-loader**

Replace the entire `src/app/page.tsx` with:

```tsx
import { experience, skills, learning, projects, credentials } from "#content";
import { HomeSections } from "@/components/HomeSections";

export default function Home() {
  return (
    <HomeSections
      experience={experience}
      skills={skills}
      learning={learning}
      projects={projects}
      credentials={credentials}
    />
  );
}
```

- [ ] **Step 3: Build**

Run: `nvm use 22 && npm run build`
Expected: passes. If TS complains about the `import("#content")` type helpers, replace the `type Exp = ...` lines with concrete imports: `import type { Experience, Skill, Learning, Project, Credential } from "#content";` and use those names instead.

- [ ] **Step 4: Visual check**

Run: `npm run dev`. Verify: all five numbered sections render; Education shows two columns with the seeded entries; hobbies strip shows emojis; toggling ES translates eyebrows, titles, hero, experience summaries/roles, learning notes, skill group labels, credentials notes, and hobbies; hero keyword is pink.
Expected: all true.

- [ ] **Step 5: Commit**

```sh
git add src/app/page.tsx src/components/HomeSections.tsx
git commit -m "feat: localized home with education and hobbies sections"
```

---

## Task 9: Footer CTAs + projects/blog locale + final verification

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Read to confirm: `src/app/blog/page.tsx`

**Interfaces:**
- Consumes: `useT`, `useLocale`, `mailtoHref`, `whatsappHref`, `site`.

- [ ] **Step 1: Rewrite `Footer.tsx` with CTA buttons (no raw email text)**

```tsx
"use client";

import { site } from "@/lib/site";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { mailtoHref, whatsappHref } from "@/lib/contact";

export function Footer() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <footer id="contact" className="mx-auto mt-32 w-full max-w-4xl border-t border-(--color-line) px-6 py-16 md:px-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">{t.cta.work}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={mailtoHref(locale)} className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 font-mono text-sm text-(--color-ink) transition-colors hover:bg-(--color-accent-soft)">
              {t.cta.email}
            </a>
            <a href={whatsappHref(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-(--color-accent-2) px-6 py-3 font-mono text-sm text-(--color-accent-2) transition-colors hover:bg-(--color-accent-2) hover:text-(--color-ink)">
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
        <div className="flex gap-6 font-mono text-sm text-(--color-muted)">
          <a href={site.links.github} className="transition-colors hover:text-(--color-paper)">GitHub</a>
          <a href={site.links.linkedin} className="transition-colors hover:text-(--color-paper)">LinkedIn</a>
          <a href={site.links.cv} className="transition-colors hover:text-(--color-paper)">{t.cta.cv}</a>
        </div>
      </div>
      <p className="mt-12 font-mono text-xs text-(--color-faint)">© {new Date().getFullYear()} {site.name} · {site.location}</p>
    </footer>
  );
}
```

- [ ] **Step 2: Make projects list locale-aware**

Open `src/app/projects/page.tsx`. It reads `projects` from `#content` and now sees both locales (duplicate slugs). Filter to one locale per slug. Since this page is likely a server component, the simplest correct fix is to default-render `en` and dedupe by slug. Add right after the projects import/use:

```tsx
const byEn = projects.filter((p) => p.locale === "en");
const seen = new Set(byEn.map((p) => p.slug));
const list = [...byEn, ...projects.filter((p) => p.locale === "es" && !seen.has(p.slug))];
```

Then map over `list` instead of `projects`. (Full client localization of secondary pages is out of scope; they default to EN content, UI chrome still comes from the sidebar/footer toggle.)

- [ ] **Step 3: Fix the project detail page slug lookup**

Open `src/app/projects/[slug]/page.tsx`. Where it finds a project by slug, ensure it picks one locale (slugs now duplicate). Update the find + `generateStaticParams`:

```tsx
// in the page component:
const project = projects.find((p) => p.slug === slug && p.locale === "en")
  ?? projects.find((p) => p.slug === slug);

// in generateStaticParams (dedupe slugs):
export function generateStaticParams() {
  return [...new Set(projects.map((p) => p.slug))].map((slug) => ({ slug }));
}
```

Adjust to match the file's existing variable names (read it first).

- [ ] **Step 4: Confirm blog page still builds**

Read `src/app/blog/page.tsx`. If it maps over `blog` and the collection is empty, no change needed. If it derives slugs, apply the same dedupe pattern as Step 2.

- [ ] **Step 5: Full build**

Run: `nvm use 22 && npm run build`
Expected: build + static generation succeed; no duplicate-slug route collisions.

- [ ] **Step 6: Full manual pass**

Run: `npm run dev`. Verify end to end:
- Footer shows two CTA buttons (no raw email text); email opens `mailto:` with prefilled subject/body matching locale; WhatsApp opens `wa.me/PEGAR_NUMERO?text=...` with the localized message.
- Language toggle persists across reload and across navigation to `/projects`.
- Sidebar stays fixed on desktop scroll; collapses on mobile.
- `/projects` and a project detail page render without errors.

- [ ] **Step 7: Commit**

```sh
git add src/components/Footer.tsx src/app/projects src/app/blog
git commit -m "feat: contact CTAs in footer and locale-safe project routes"
```

---

## Self-Review (completed during authoring)

- **Spec coverage:** i18n (Tasks 3, 6, 8) ✓ · sidebar persistent (Task 7) ✓ · education/certs admin-able (Tasks 5, 6, 8) ✓ · hobbies hardcoded (Tasks 2, 8) ✓ · contact CTAs email+WhatsApp (Tasks 2, 4, 7, 9) ✓ · palette (Task 1) ✓.
- **Placeholder scan:** intentional placeholders only — `PEGAR_NUMERO` (WhatsApp), `/luisa.jpg` (photo), seed credential `EDITAR` markers. No "TODO/TBD" implementation gaps.
- **Type consistency:** `Locale`, `Messages`, `useLocale`, `useT`, `pick`, `mailtoHref`, `whatsappHref` used with identical signatures across Tasks 3, 4, 7, 8, 9. `slug` derivation unified to filename-strip across experience/projects/blog.

## Post-implementation follow-ups (not in scope)

- Replace `PEGAR_NUMERO` with the real WhatsApp number and drop `luisa.jpg` into `/public`.
- Fill real degree/certification data in `content/credentials/` and remove the `EDITAR` examples.
- Review ES translations for tone.
- Optional later: localize project/blog detail bodies fully (currently default to EN).

