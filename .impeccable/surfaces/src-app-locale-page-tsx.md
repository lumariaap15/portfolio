---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

## Direction contract

THESIS: The site reads as a personal typed letter from Luisa to the visitor, not a product dashboard — every trace of the old CI/pipeline metaphor (status pills, job-name jargon, a rail of colored stage markers, two competing nav systems) is gone, replaced by the plain, warm confidence of a single handwritten-feeling letter.

OWN-WORLD: Warm paper ground (#f6f3ec), near-black ink (#221f1a). One voice throughout: Courier Prime (a real, legible manuscript typewriter face, self-hosted) for every headline and every paragraph — no separate display/body/mono split. One accent ink, a muted typewriter-ribbon red (#9a3324, pressed #7a281c), for links, emphasis, and the CTA — nothing else carries color. One small exception: Caveat, a genuine handwriting face, used exactly once for a signed "— Luisa" mark near the end, never as a running device. A light fixed header (name as letterhead + language toggle only — no status pill, no pinned CTA) is the one piece of persistent chrome; the one other navigation aid is a small, quiet, low-contrast index of section names fixed in a corner (full list on desktop, just the current section's name on mobile), bold on the current entry, plain otherwise — replacing both of the old dual-nav systems with exactly one. Sections separate with a plain hairline rule (a page break), not with forced full-viewport height or artificial emptiness; the previously separate "AI" section was folded into the end of Services (as a closing note, not a fourth list item) because standalone it was too short to read as its own "page." Tech-stack logos (real, monochrome, via simple-icons, ink-colored) and the grayscale bio photo carry over unchanged from the incumbent build.

STORY: A visitor opens what reads like a personal letter — the headline types itself once, like it's being written in front of them (the one signature motion, never repeated). They read services (with a closing note on AI), the actual step-by-step process, selected work, then a merged personal section (philosophy → why work with her → her bio), FAQ, and a closing message signed "— Luisa" before the two ways to reach her.

FIRST VIEWPORT: Light letterhead header (name left, language toggle right, no other chrome). Below it, after generous top clearance: the hero headline typing itself out, then the subhead and the one ribbon-red CTA pill fading in once typing completes. The quiet corner index sits at the bottom-left, showing all section names with the current one (none yet, at hero) unbolded.

FORM: Full replacement of the prior "pipeline/build-system" world at the user's explicit direction (routed through `shape`, decision recorded via a rolled and weighed concept set — assigned candidate 3 of 7, "a personal zine/DIY photocopy," set aside in favor of the user's own pick, "a typed personal letter," candidate 1 of the same list; seed key 5839552c). The old world's structure (8→7 stages, list+detail progressive disclosure, merged profile section, real tech logos, grayscale photo) is preserved where the new brief didn't touch it; everything about status, color-cycling, job-jargon, and dual navigation is gone.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
