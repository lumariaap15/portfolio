import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Typewriter } from "./pipeline/Typewriter";
import { Entry } from "./pipeline/Entry";

export function Hero({ t }: { t: Messages }) {
  return (
    <Entry id="hero" center>
      <div className="mx-auto grid w-full max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-[240px_1fr] md:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/static/portrait.png"
          alt={site.name}
          width={800}
          height={800}
          fetchPriority="high"
          className="aspect-square w-40 rounded-full object-cover sm:w-48 md:w-60"
        />
        <div>
          <h1 className="text-4xl leading-[1.15] tracking-tight text-(--color-ink) sm:text-5xl">
            <Typewriter text={t.about.title} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-(--color-muted)">
            {t.hero.sub}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 text-sm">
            <a href={site.links.linkedin} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">LinkedIn</a>
            <a href={site.links.github} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">GitHub</a>
            <a href={site.links.cv} className="inline-flex min-h-11 cursor-pointer items-center text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)">{t.cta.cv}</a>
          </div>
          <a
            href={site.bookingUrl}
            className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
          >
            {t.cta.bookCall}
          </a>
        </div>
      </div>
    </Entry>
  );
}
