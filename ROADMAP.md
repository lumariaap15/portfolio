# Roadmap

Site was redesigned from a CV/portfolio into a commercial site for an Independent
Software Engineer (see `docs/superpowers/plans/` for the full plan). This is what's
left before it's fully production-ready, in priority order.

## Before the next deploy

- [ ] Set `bookingUrl` in `src/lib/site.ts` to a real Cal.com/Calendly link (currently a placeholder).
- [ ] Set `RESEND_API_KEY` in the deploy environment (contact form fails without it).
- [ ] Verify a `luisaalzate.dev` sender domain in Resend and update the `from` address
      in `src/app/api/contact/route.ts` (currently uses Resend's shared sandbox sender).
- [ ] Review the 3 "Selected Work" case studies under `content/projects/` — each has a
      `PLACEHOLDER` outcome metric and an MDX comment flagging it for a framing/data check
      before it's real marketing copy.
- [ ] Confirm `content/projects/profetai.*.mdx` — currently unfeatured (`featured: false`),
      decide if/how it should reappear later (e.g. in a future projects page).

## Content still owed

- [ ] Real photo crop for `About` — `public/static/me2.png` currently shows with a
      pink background from the source image.
- [ ] Double check Spanish copy in `src/i18n/messages/es.ts` reads naturally end-to-end.

## Natural next phase (per the redesign spec)

- [ ] Service subpages for SEO (`/en/services/custom-software`, etc.) — spec explicitly
      calls this a phase-2 evolution once the one-page site is live and indexed.
- [ ] Case-study detail pages, if a case study outgrows a homepage card.
- [ ] Analytics (Vercel Analytics is a toggle).

## Known unrelated issue

- `npm run lint` is broken — Next 16 removed the `next lint` CLI command and this repo
  has no `eslint.config.js`. Pre-existing, unrelated to the redesign. `next build`'s
  TypeScript check is currently the only automated check running.
