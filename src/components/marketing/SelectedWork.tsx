import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { TechLogo } from "./pipeline/TechLogo";
import { CaseStrip } from "./work/CaseStrip";

type Work = Messages["work"];
type CaseStudy = Work["caseStudies"][number];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center text-sm text-(--color-accent) underline underline-offset-4 transition-colors hover:text-(--color-accent-soft)"
    >
      {children} →
    </a>
  );
}

function Stars({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-1 text-(--color-ink)">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            d="M12 2.8l2.7 5.9 6.4.7-4.8 4.3 1.3 6.3L12 16.8 6.4 20l1.3-6.3-4.8-4.3 6.4-.7z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

function Figure({ item }: { item: CaseStudy }) {
  const image = (
    <div className="halftone halftone-reveal h-44 overflow-hidden border border-(--color-ink) sm:h-48">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        loading="lazy"
        className="block h-full w-full object-cover object-top group-hover/figure:scale-[1.03]"
      />
    </div>
  );

  return (
    <figure>
      {"href" in item && item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="group/figure block">
          {image}
        </a>
      ) : (
        image
      )}
      <figcaption className="mt-2 text-xs italic text-(--color-muted)">{item.image.caption}</figcaption>
    </figure>
  );
}

function Slide({ item, work }: { item: CaseStudy; work: Work }) {
  const facts = [
    { label: work.problemLabel, body: item.problem },
    { label: work.approachLabel, body: item.approach },
    { label: work.outcomeLabel, body: item.outcome },
  ];

  return (
    <li className="w-[82vw] max-w-[23rem] flex-none snap-start border-l border-(--color-line) px-6 first:border-l-0 first:pl-0 sm:w-[22rem] sm:px-7">
      <article>
        <Figure item={item} />

        <h4 className="headline mt-5 text-xl font-bold leading-snug text-(--color-ink)">{item.title}</h4>
        <p className="mt-1 text-xs text-(--color-muted)">
          <span className="font-bold text-(--color-ink)">{item.client}</span> · {item.context}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-(--color-muted)">{item.summary}</p>

        <details className="group mt-3 border-t border-(--color-line)">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm text-(--color-ink) [&::-webkit-details-marker]:hidden">
            {work.howLabel}
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-open:rotate-45"
            >
              <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </summary>
          <dl className="space-y-4 pb-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] uppercase tracking-wider text-(--color-muted)">{fact.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-(--color-muted)">{fact.body}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 pb-3">
            {item.stack.map((tech) => (
              <li key={tech} className="flex items-center gap-1.5 text-xs text-(--color-muted)">
                <TechLogo name={tech} className="h-3.5 w-3.5 text-(--color-ink)" />
                {tech}
              </li>
            ))}
          </ul>
        </details>

        {item.links.length > 0 && (
          <div className="flex flex-wrap gap-x-5 border-t border-(--color-line)">
            {item.links.map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          </div>
        )}
      </article>
    </li>
  );
}

export function SelectedWork({ t }: { t: Messages }) {
  const work = t.work;

  return (
    <Entry id="work" t={t}>
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="ink-in font-bold text-4xl leading-[1.05] text-(--color-ink) sm:text-5xl">{work.title}</h2>
        <p className="ink-in ink-in-late mt-3 max-w-xl leading-relaxed text-(--color-muted)">{work.intro}</p>
      </div>

      <CaseStrip title={work.stripLabel} label={work.stripLabel} prevLabel={work.prevLabel} nextLabel={work.nextLabel}>
        {work.caseStudies.map((item) => (
          <Slide key={item.key} item={item} work={work} />
        ))}
      </CaseStrip>

      <div className="mx-auto w-full max-w-3xl">
        <section className="mt-12 border-t-2 border-(--color-ink) pt-8" aria-labelledby="work-reviews">
          <h3 id="work-reviews" className="text-2xl font-bold text-(--color-ink)">
            {work.reviewsTitle}
          </h3>
          <div className="column-rules mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {work.reviews.map((review) => (
              <figure key={review.key}>
                <Stars label={work.ratingLabel} />
                <blockquote className="mt-3 font-news text-lg italic leading-snug text-(--color-ink)">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-3 text-xs text-(--color-muted)">
                  <span className="font-bold text-(--color-ink)">{review.by}</span> · {review.role}
                  {work.translatedNote && <span className="italic"> {work.translatedNote}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-2">
            <ExternalLink href={work.upworkLink.href}>{work.upworkLink.label}</ExternalLink>
          </div>
        </section>

        <section className="mt-12 border-t-2 border-(--color-ink) pt-10" aria-labelledby="work-fun">
          <h3 id="work-fun" className="text-2xl font-bold text-(--color-ink) sm:text-3xl">
            {work.funTitle}
          </h3>
          <div className="column-rules mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {work.fun.map((project) => (
              <div key={project.key}>
                <h4 className="headline text-xl font-bold text-(--color-ink)">{project.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{project.body}</p>
                <div className="mt-1 flex flex-wrap gap-x-5">
                  {project.links.map((link) => (
                    <ExternalLink key={link.href} href={link.href}>
                      {link.label}
                    </ExternalLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-12 max-w-xl border-t border-(--color-line) pt-8 leading-relaxed text-(--color-ink)">
          {work.closing}{" "}
          <a
            href={site.bookingUrl}
            className="whitespace-nowrap text-(--color-accent) underline underline-offset-4 transition-colors hover:text-(--color-accent-soft)"
          >
            {t.cta.bookCallShort}
          </a>
        </p>
      </div>
    </Entry>
  );
}
