import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";

export function Process({ t }: { t: Messages }) {
  return (
    <Entry id="process">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.process.title}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-(--color-muted)">{t.process.subtitle}</p>

        <div className="mt-10 flex flex-col">
          {t.process.steps.map((step) => (
            <div key={step.number} className="border-t border-(--color-line) py-8 first:border-t-0 first:pt-0">
              <div className="flex items-baseline gap-3">
                <span className="text-sm tabular-nums text-(--color-faint)">{step.number}</span>
                <h3 className="font-bold text-xl text-(--color-ink) sm:text-2xl">{step.title}</h3>
              </div>
              <p className="mt-3 max-w-xl leading-relaxed text-(--color-muted)">{step.body}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {step.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-(--color-line) px-3 py-1 text-sm text-(--color-muted)">
                    {tag}
                  </li>
                ))}
              </ul>
              {step.cta && (
                <a
                  href={site.bookingUrl}
                  className="mt-5 inline-block cursor-pointer text-sm text-(--color-accent) underline underline-offset-4 transition-colors hover:text-(--color-accent-soft)"
                >
                  {t.cta.bookCall}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Entry>
  );
}
