import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Typewriter } from "./pipeline/Typewriter";
import { Entry } from "./pipeline/Entry";
import { Workbench } from "./illustrations/Workbench";

const PORTRAIT = "/static/portrait.png";

export function Hero({ t }: { t: Messages }) {
  return (
    <Entry id="hero" center>
      <div className="mx-auto w-full max-w-4xl">
        {/* Dateline band under the nameplate. */}
        <p className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y border-(--color-ink) py-2 text-[11px] uppercase tracking-[0.14em] text-(--color-muted) sm:text-xs">
          <span>{site.location}</span>
          <span className="hidden sm:inline">{t.masthead.tagline}</span>
          <span>{t.masthead.edition}</span>
        </p>

        {/* Headline with the author's print standing on the rule beneath it. */}
        <div className="mt-6 flex items-end justify-between gap-4 border-b border-(--color-ink) md:mt-8">
          <h1 className="min-w-0 flex-1 pb-5 text-5xl leading-[1.02] text-(--color-ink) sm:text-6xl md:text-7xl">
            <Typewriter text={t.about.title} />
          </h1>
          <div className="halftone halftone-reveal aspect-[4/5] w-24 shrink-0 overflow-hidden border border-b-0 border-(--color-ink) sm:w-36 md:w-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PORTRAIT}
              alt={site.name}
              width={512}
              height={512}
              fetchPriority="high"
              className="block h-full w-full object-cover object-[50%_35%]"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1.35fr_1fr] md:gap-0">
          {/* The front-page cut. */}
          <figure className="md:pr-10">
            <Workbench label={t.masthead.figureAlt} className="block h-auto w-full" />
            <figcaption className="mt-3 border-t border-(--color-line) pt-2 text-xs italic leading-snug text-(--color-muted)">
              {t.masthead.figure}
            </figcaption>
          </figure>

          <div className="md:border-l md:border-(--color-line) md:pl-10">
            <div className="border-b border-(--color-line) pb-4">
              <p className="headline text-lg font-bold leading-tight text-(--color-ink)">
                {t.masthead.byline} {site.name}
              </p>
              <p className="mt-1 text-xs text-(--color-muted)">{t.masthead.tagline}</p>
            </div>

            <p className="dropcap mt-5 text-lg leading-relaxed text-(--color-muted)">{t.hero.sub}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 text-sm">
              <a href={site.links.linkedin} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">LinkedIn</a>
              <a href={site.links.github} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">GitHub</a>
              <a href={site.links.cv} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">{t.cta.cv}</a>
            </div>
            <a
              href={site.bookingUrl}
              className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-[2px] bg-(--color-accent) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
            >
              {t.cta.bookCall}
            </a>
          </div>
        </div>
      </div>
    </Entry>
  );
}
