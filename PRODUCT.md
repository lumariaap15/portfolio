# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and product teams at growing businesses who need software work but don't have
(or don't want to grow) an in-house dev team: someone with an idea or MVP to build, a
business need existing tools can't solve, systems that should talk to each other but
don't, or software that's become slow, fragile, or hard to maintain. Not tied to a
specific industry vertical — fintech shows up in the current case studies because
that's Luisa's recent work history, not because the business targets fintech
specifically.

## Product Purpose

A commercial site for Luisa Alzate, Independent Software Engineer, to win client work.
It exists to get a visitor from "I have a problem" to booking a free 20-minute call,
by making the case that the right first move might be improving/integrating what
exists rather than building something new.

## Positioning

Works directly with the business, one person, through the whole path from first
conversation to architecture, development, and launch — no account manager or junior
dev between the client and the person making engineering decisions. Explicitly does
not default to "build custom software" as the answer: recommends improving, 
integrating, or automating existing systems when that's the better fit, and only
builds new when that's genuinely the right call.

## Operating Context

- Free 20-minute intro call (via a booking link) is the entry point into the sales process.
- A contact form (`src/app/api/contact/route.ts`, sends via Resend) is the alternate
  path for someone who wants to send project details directly instead of booking.
- Works remotely, in English and Spanish, with clients anywhere ("Working worldwide").
- Case studies ("Selected Work") describe real past professional work (from
  employment, not freelance client engagements for this business), grouped into three
  categories: Custom & Product, Integration, Modernization.

## Capabilities and Constraints

- Three service lines: Custom Software & Product Development; API & Systems
  Integrations; Product Modernization & Rescue (including stabilizing AI-generated
  MVPs for production use).
- AI is offered only when there's a genuine use case (intelligent search, document
  processing, assistants, structured extraction, AI-powered workflows) — not added
  as a default feature.
- Site is bilingual (English/Spanish) via route-based i18n (`/en`, `/es`), built with
  Next.js 16 (App Router) + Tailwind v4 + Velite (MDX for case studies).
- Undecided: real Cal.com/Calendly booking URL still a placeholder in `src/lib/site.ts`
  (tracked in ROADMAP.md). Case-study outcome metrics are placeholders pending
  confirmation of real numbers.

## Brand Commitments

- Name: Luisa Alzate. Role: Independent Software Engineer.
- Location: Córdoba, Argentina (confirmed public-facing fact — city-level is fine to state).
- 5+ years of experience, full-stack (frontend, backend, APIs, cloud infrastructure).
- Case studies anonymize the employer/client by default; naming a specific
  employer/client in a case study is acceptable once confirmed with them, on a
  case-by-case basis — anonymization today reflects "not yet cleared," not a
  standing privacy rule.
- Fintech domain experience (lending, identity/payments, compliance) is real but
  incidental to one past job — do not narrow the site's general positioning toward a
  fintech niche based on it.

## Evidence on Hand

- Four case studies in `content/projects/`: lending platform feature delivery,
  identity/servicing/payments integrations, observability + i18n rollout (all three
  currently `featured: true`, one per category), and ProfetAI (a personal project,
  `featured: false`). All have `PLACEHOLDER` outcome metrics pending real numbers —
  do not present these as finalized marketing claims.
- CV at `/Luisa_Alzate_CV_2026.pdf`.
- No testimonials, press, or client logos on hand — do not fabricate any.

## Product Principles

- Recommend the smallest solution that actually solves the problem — improve or
  integrate before proposing a full build.
- Keep the client working directly with the person doing the engineering, not a layer
  of account management.
- Only add AI where it solves the problem better, not as a feature checkbox.
- Production-readiness (monitoring, error tracking, performance, handoff) is part of
  the deliverable, not a follow-on phase.
- Stay honest about unverified claims: placeholder metrics and unconfirmed details
  stay visibly flagged until confirmed, never dressed up as final copy.
