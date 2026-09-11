import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";

/** Merged philosophy + why-work-with-me + bio into a single "profile" stage. */
export function Profile({ t }: { t: Messages }) {
  return (
    <Entry id="about">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-bold max-w-2xl text-3xl tracking-tight text-(--color-ink) sm:text-4xl">
          {t.philosophy.title}
        </h2>
        <div className="mt-6 max-w-xl space-y-4 leading-relaxed text-(--color-muted)">
          {t.philosophy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-(--color-line) pt-12">
          <h2 className="font-bold max-w-2xl text-2xl tracking-tight text-(--color-ink) sm:text-3xl">
            {t.whyMe.title}
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-(--color-muted)">{t.whyMe.intro}</p>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {t.whyMe.benefits.map((benefit) => (
              <div key={benefit.title} className="border-t border-(--color-line) pt-4">
                <h3 className="font-semibold text-(--color-ink)">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-(--color-line) pt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-[160px_1fr] sm:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/static/me2.png"
              alt={site.name}
              width={160}
              height={160}
              className="aspect-square w-32 rounded-2xl object-cover grayscale sm:w-40"
            />
            <div>
              <h2 className="font-bold text-2xl tracking-tight text-(--color-ink) sm:text-3xl">
                {t.about.title}
              </h2>
              <div className="mt-5 max-w-xl space-y-4 leading-relaxed text-(--color-muted)">
                {t.about.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 text-xs text-(--color-faint)">{t.about.location}</p>
              <div className="mt-6 flex gap-5 text-sm">
                <a
                  href={site.links.linkedin}
                  className="cursor-pointer text-(--color-muted) transition-colors hover:text-(--color-ink)"
                >
                  LinkedIn
                </a>
                <a
                  href={site.links.github}
                  className="cursor-pointer text-(--color-muted) transition-colors hover:text-(--color-ink)"
                >
                  GitHub
                </a>
                <a
                  href={site.links.cv}
                  className="cursor-pointer text-(--color-muted) transition-colors hover:text-(--color-ink)"
                >
                  {t.cta.cv}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Entry>
  );
}
