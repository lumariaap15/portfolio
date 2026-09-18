import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";

/** Merged philosophy + why-work-with-me into a single "profile" stage. */
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
      </div>
    </Entry>
  );
}
