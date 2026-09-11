---
name: Luisa Alzate — Portfolio
description: A live build pipeline for a solo software engineer's portfolio — the visitor watches trust get earned stage by stage, the accent shifting color as the run progresses through eight stages, closing the loop back to indigo at dispatch.
colors:
  paper: "#ffffff"
  paper-soft: "#f6f5f2"
  line: "#e4e2dd"
  ink: "#111111"
  muted: "#55534e"
  faint: "#6b6862"
  accent: "#4f46e5"
  accent-soft: "#4338ca"
  accent-bg: "#eef2ff"
typography:
  display:
    fontFamily: "var(--font-display-face), Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-display-face), Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "var(--font-display-face), Inter, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-body-face), Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "var(--font-geist-mono), ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.05em"
rounded:
  md: "6px"
  full: "9999px"
  2xl: "16px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "40px"
  2xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent-soft}"
  button-header-cta:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
    typography: "{typography.label}"
  button-form-submit:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-form-submit-hover:
    backgroundColor: "{colors.accent}"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  avatar-image:
    rounded: "{rounded.2xl}"
    width: "160px"
    height: "160px"
---

# Design System: Luisa Alzate — Portfolio

## Overview

**Creative North Star: "The Build Pipeline"**

The homepage is a CI/CD run, not a scrolling brochure: a fixed status header and a numbered left-hand stage rail track the visitor's progress through eight pipeline stages (init → build:services → build:ai → pipeline → deploy → profile → docs → dispatch) as they scroll. The surface is a near-white build log — paper and hairline dividers, Bricolage Grotesque extrabold display headlines, Hanken Grotesk prose, Geist Mono for anything that reads as machine output (status, numbers, labels, nav) — with an accent that shifts hue stage by stage (indigo → violet → fuchsia → rose → amber → emerald → cyan → indigo again at dispatch, closing the loop), cascaded through a CSS custom-property wrapper and cross-fading with a 500ms color transition as the visitor scrolls. The shifting hue reads as mood/momentum; it never breaks status semantics — queued/active/passed is still carried by the drawn marker shape (hollow ring / ring+dot / filled check), never by which color is currently live.

The system is flat by construction: no shadows, no blur, no glass anywhere in the build. Depth and hierarchy come from hairline borders (`--color-line`), color (ink vs. muted vs. faint), and weight, never from elevation. Selection and state are communicated by font-weight and color shifts alone.

Revised twice since the original build. First (token-level): the signal-green accent was swapped for electric indigo and Unbounded was added as the display face. Second, at explicit follow-up request: the forced full-viewport section height and mandatory scroll-snap were relaxed; the display/body pairing changed again (Unbounded → Bricolage Grotesque at an explicit extrabold weight, Geist Sans → Hanken Grotesk); the single static accent became an eight-stage animated accent cascade; Philosophy, Why-Me, and the personal bio were merged from three stages into one ("profile"); real monochrome tech-brand marks and a grayscale bio photo were added; and `cursor-pointer` was swept across every custom interactive element (Tailwind v4 no longer defaults buttons to a pointer cursor). Structure, copy voice, and the flat/no-shadow/drawn-icon system were left untouched by both revisions.

**Key Characteristics:**
- Accent shifts per pipeline stage (indigo → violet → fuchsia → rose → amber → emerald → cyan → indigo), not one fixed site-wide hue; queued/active/passed status is always carried by marker shape, never by the current hue.
- Bricolage Grotesque, set extrabold (800), for every h1/h2/h3 display headline; Hanken Grotesk for body/paragraph copy; Geist Mono for status pills, stage numbers, metadata/tag labels, and nav only.
- Fully flat: hairline 1px borders, zero shadows, zero backdrop-blur.
- Drawn SVG stage markers (hollow ring / ring+dot / filled check) — never unicode glyphs or emoji; the active marker's inner dot carries the `stage-pulse` live-motion signature.
- List+detail is the signature content pattern across Services, Process, and Selected Work.

## Colors

Near-white build-log neutrals plus a per-stage accent triplet that cascades as the visitor scrolls; no fixed secondary/tertiary hue — the "secondary" role is filled by whichever stage is currently active.

### Primary
- **Electric Indigo** (`#4f46e5`): the default/fallback accent (`@theme` base value) and the stage-1 ("init") and stage-8 ("dispatch") triplet, closing the loop. Used for the "passed"/"active" stage-status color, the primary CTA background, active-state rail/pill icons and text, and links inside detail panels, whichever hue is currently live.
- **Electric Indigo, Pressed** (`#4338ca`): hover/active companion to the stage-1/8 triplet.
- **Indigo Wash** (`#eef2ff`): status-pill background wash companion to the stage-1/8 triplet.

### Named Rules
**The Accent-Per-Stage Rule.** `accent-palette.ts` defines eight `{accent, soft, bg}` triplets (indigo, violet, fuchsia, rose, amber, emerald, cyan, indigo) at ~Tailwind-700 depth (≥4.5:1 on white as text). `StageProvider` writes the active stage's triplet onto `--color-accent`/`--color-accent-soft`/`--color-accent-bg` on an inline-styled wrapper div; every consumer transitions with `transition-colors duration-500` so the hue drifts rather than snaps between stages.
**The Shape-Carries-Status Rule.** The stage marker's drawn shape (hollow ring = queued, ring+dot = active, filled check = passed) is the only carrier of pipeline status. The cascading accent hue is mood/momentum only and must never be read as a status signal.
**The One Signal Rule.** Whichever hue is currently live is reserved for "passed," "active," and the dispatch action within that stage. It never decorates a card, a divider, or a heading; if nothing has completed or isn't actionable, the element stays ink/muted/faint.

### Neutral
- **Paper** (`#ffffff`): base page background.
- **Paper Soft** (`#f6f5f2`): reserved for subtly elevated surfaces (defined in tokens; not yet drawn on by any shipped component).
- **Hairline** (`#e4e2dd`): all borders and dividers — header/rail bottom-border, stage-list row dividers, chip/tag borders, footer rule.
- **Ink** (`#111111`): primary text, headings, active list-row selection color, the form-submit button background.
- **Muted** (`#55534e`): secondary/body copy color throughout.
- **Faint** (`#6b6862`): tertiary/metadata color — stage numbers, timestamps, footer copyright line, queued-stage icons/text. Confirmed ≥4.5:1 on white.

## Typography

**Display Font:** Bricolage Grotesque, extrabold (800) (self-hosted via `next/font/google`, weights loaded `["600","800"]`, CSS var `--font-display-face`; with Inter, system-ui fallback)
**Body Font:** Hanken Grotesk (self-hosted via `next/font/google`, weights loaded `["400","500","600"]`, CSS var `--font-body-face`; with Inter, system-ui fallback)
**Label/Mono Font:** Geist Mono (with ui-monospace fallback)

**Character:** A heavy-geometric-display-over-humanist-workhorse pairing — Bricolage Grotesque carries every h1/h2/h3 headline at an explicit `font-extrabold` weight for a genuinely distinctive, unmistakably-not-generic-SaaS voice; Hanken Grotesk carries paragraph prose in a plain, legible register; Geist Mono marks anything that reads as generated machine output: status pills, stage numbers, tag/category/metadata labels, and footer/nav links. Geist Mono is no longer used for button/CTA copy in the current build (buttons render in the mono label size/tracking but the family comes through the shared `--font-mono` stack applied at the label-size level, not a headline override).

### Hierarchy
- **Display** (Bricolage Grotesque, 800, `text-4xl sm:text-5xl md:text-6xl`, `leading-[1.1]`, `tracking-tight`): the hero `<h1>` only.
- **Headline** (Bricolage Grotesque, 800, `text-2xl sm:text-3xl` up to `text-3xl sm:text-4xl`): the per-stage section heading (Services, AI Capability, Process, Selected Work, Profile, FAQ, Final CTA).
- **Title** (Bricolage Grotesque, 800, `text-xl sm:text-2xl` or `text-2xl sm:text-3xl`): sub-headings inside a stage (service/process/project item titles, the merged Profile stage's three sub-sections).
- **Body** (Hanken Grotesk, 400, base size, `leading-relaxed`, `text-(--color-muted)`): paragraph copy; kept to a `max-w-xl`/`max-w-2xl` measure.
- **Label** (Geist Mono, 400, `text-xs`/`text-[11px]`/`text-[10px]`, `tracking-wider`, sometimes uppercase): status pills, stage numbers, field labels, tag lists, category labels, footer/nav copy.

### Named Rules
**The Mono-Is-Machine-Output Rule.** Mono type marks anything that reads as system-generated: counters, statuses, tags, labels, and nav. Body copy stays Hanken Grotesk.
**The Display-Is-Headline Rule.** Bricolage Grotesque, always at `font-extrabold`, is reserved for h1/h2/h3 structural headings only, applied via the shared `--font-display` token (`[font-family:var(--font-display)]` + `font-extrabold`); it never appears in body prose or labels.

## Layout

Single-column content column (`max-w-3xl` for prose stages; `max-w-4xl` for list+detail stages), centered with `mx-auto px-4 sm:px-6`. A fixed `4rem`-tall header (`--header-h`) spans the full width; a fixed `3.5rem`-wide left stage rail (`--rail-w`) runs the remaining viewport height on desktop (`md:` and up), collapsing to a fixed bottom stage strip on mobile.

Each of the eight sections (`Stage.tsx`) is a natural-content-height `<section>` — no forced `min-h`/`dvh` — padded `pt-[calc(header+3rem)] pb-24` and, on desktop, `pl-[calc(rail+1.5rem)]` to clear the fixed chrome. Scroll-snap is `scroll-snap-type: y proximity` (relaxed from an earlier `mandatory`), since section heights now vary considerably by content; sections still declare `scroll-snap-align: start` so they remain discrete, navigable beats without forcing every section to fill the viewport or stranding short content mid-scroll.

Spacing rhythm is generous and consistent: `mt-6`–`mt-10` (24–40px) between a heading and its following block, `space-y-4` (16px) between paragraphs, `gap-8`/`gap-10` (32–40px) for two-column grids (Profile headshot+bio, list+detail columns), and a `mt-16` (64px) top rule before internal stage sub-sections and the footer.

## Elevation & Depth

Fully flat. No `box-shadow`, no `backdrop-filter`/blur, no glass anywhere in the shipped build — this includes the fixed header and stage rail, which are solid, fully opaque `--color-paper` panes with a single 1px `--color-line` border, not translucent chrome. Depth and separation are conveyed entirely by hairline borders and by ink/muted/faint color steps, never by shadow or layering. Unchanged by this revision.

### Named Rules
**The No-Shadow Rule.** Nothing in this system casts a shadow or sits behind blur. A divider is a 1px hairline; a raised surface does not exist as a device.

## Shapes

Two radius steps plus one exception. Interactive pill controls (primary CTA, header CTA, form submit, process tag chips, rail stage markers' hit area) use a fully rounded `rounded-full` (9999px) capsule. Form inputs/textarea use a modest `rounded-md` (6px). The Profile-section headshot uses `rounded-2xl` (16px) — a soft-cornered rectangle, not a circular or geometric occlusion mask — and now renders `grayscale`. Borders are exclusively 1px hairlines in `--color-line`; there are no thick borders, no side-stripe accent borders, and no hard-offset "sticker" shadows anywhere in the build.

## Components

### Buttons
- **Shape:** fully rounded capsule (`rounded-full`).
- **Primary (dispatch CTA):** `bg-(--color-accent)` / `text-paper`, mono label, `px-6 py-3` in-page or `px-3.5–4 py-2` in the header; hover shifts to `bg-(--color-accent-soft)`; both transition with `transition-colors duration-500` to track the cascading per-stage hue. Every interactive control (`<button>`, `<a>` styled as a button) carries explicit `cursor-pointer`.
- **Form submit:** inverted — `bg-ink` / `text-paper` at rest, hovers to `bg-(--color-accent)`; `disabled:opacity-60 disabled:cursor-not-allowed` while sending.
- **Secondary/text link:** mono, `text-muted`, underline with `decoration-line`, hover to `text-ink` or `text-(--color-accent-soft)`.

### Cards / Containers
This system does not use a card container as a structural device anywhere. Content sits directly on the paper background inside its stage section; the only recurring "container" boundary is a 1px top hairline rule between stacked rows (list+detail rows, Profile benefit blocks and sub-sections, FAQ items, footer).

### Inputs / Fields
- **Style:** `rounded-md`, 1px `--color-line` border, `bg-paper`/`text-ink`, mono uppercase-tracking-wider label above the field.
- **Focus:** border color shifts to `--color-accent` (no glow, no ring shadow).
- **Error / Disabled:** error copy renders in `--color-accent` text below the form; the submit button dims to 60% opacity and shows `cursor-not-allowed` while disabled/sending.

### Navigation
- **Header:** fixed, fully opaque, 1px bottom hairline; site name (display face) left, status pill (mono, center-right, hidden below `sm`), language toggle (mono `EN`/`ES`, active = `text-(--color-accent)`, both states `cursor-pointer`), and the accent CTA pill, right.
- **Stage rail:** fixed left column on desktop (bottom strip on mobile); each stage is a drawn SVG marker (hollow ring = queued/faint, ring+dot = active/accent, filled check = passed/accent) plus a mono two-digit `tabular-nums` index; each stage hit-target carries `cursor-pointer`. Hover shifts queued/passed color toward `--color-accent-soft`. The active marker's inner dot has a `stage-pulse` class — a slow breathing opacity/scale keyframe (1.8s, ease-in-out, infinite) — the system's one signature live-motion detail, disabled under `prefers-reduced-motion`.

### List + Detail (signature component)
The recurring content pattern for Services, Process, and Selected Work: a left-hand vertical tab list (hairline-divided rows, mono metadata line + sans label, each row a `<button>` with `cursor-pointer`) beside a right-hand detail panel that cross-fades/slides in on selection (`opacity`/`y:8px`, 0.22s, custom ease, respecting `prefers-reduced-motion`). **The selection cue is font-weight and color only** — the active row goes `font-medium text-ink`; inactive rows stay `text-muted`. There is no side-stripe border, background fill, or icon on the selected row.

### Tech Brand Marks
`TechLogo.tsx` renders a monochrome (`fill="currentColor"`, ink-colored) inline SVG brand mark from the `simple-icons` package next to a Selected Work stack tag, but only for the eight technologies with a real catalog entry shipped (Node.js, TypeScript, React, PostgreSQL, Sentry, Jest, GitHub Actions, i18next). Every other stack tag stays plain text — no fabricated or approximated mark is drawn for tools outside that set.

## Do's and Don'ts

### Do:
- **Do** cascade `--color-accent`/`--color-accent-soft`/`--color-accent-bg` per pipeline stage via `accent-palette.ts` + `StageProvider`, transitioning consumers with `transition-colors duration-500`; reserve whichever hue is currently live for that stage's passed/active state and CTA — never as a background wash or decorative border.
- **Do** carry pipeline status (queued/active/passed) exclusively through the drawn marker shape (hollow ring / ring+dot / filled check); the cascading accent hue is mood only.
- **Do** set status/label/number/nav copy in Geist Mono; keep headlines in Bricolage Grotesque at `font-extrabold` and body prose in Hanken Grotesk.
- **Do** mark list/tab selection with `font-medium` + `text-ink` color change only — no stripe, no fill, no icon.
- **Do** draw stage and status markers as stroked SVG (ring/ring+dot/filled-check); never substitute a unicode glyph or emoji.
- **Do** keep the header and stage rail fully opaque with a 1px hairline border — no backdrop-blur or translucency.
- **Do** set explicit `cursor-pointer` on every custom-styled interactive control (buttons, button-like anchors, toggles); Tailwind v4 does not default this.
- **Do** attach a real brand mark (via `TechLogo.tsx`/`simple-icons`) only when the catalog has a genuine entry for that technology; leave everything else as plain text.
- **Do** reserve the `stage-pulse` live-pulse animation for the single active-stage marker dot; it is not a general-purpose attention effect.

### Don't:
- **Don't** introduce a box-shadow, glow, or backdrop-blur anywhere; the system's depth model is flat-plus-hairline, full stop.
- **Don't** add a colored side-stripe border to a list row, card, or callout to indicate selection or category — weight/color is the only cue this system uses.
- **Don't** mask the Profile-stage headshot (or any future portrait) into a circle or other geometric cutout; the shipped shape is `rounded-2xl`, and it renders `grayscale`.
- **Don't** let the cascading accent hue double as a status signal; status is shape-only (see the Shape-Carries-Status Rule).
- **Don't** use Bricolage Grotesque for body copy or labels; it is a headline-only display face, and always at `font-extrabold` when used.
- **Don't** fabricate a brand mark for a technology `simple-icons` doesn't carry; plain text is the correct fallback, not an invented glyph.
