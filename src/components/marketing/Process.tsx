"use client";

import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ListDetail } from "./pipeline/ListDetail";

export function Process({ t }: { t: Messages }) {
  const items = t.process.steps.map((step) => ({ ...step, id: step.number }));

  return (
    <Entry id="process" center>
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.process.title}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-(--color-muted)">{t.process.subtitle}</p>

        <ListDetail
          items={items}
          ariaLabel={t.process.title}
          renderRow={(step) => (
            <span className="flex flex-col gap-0.5">
              <span className="text-[11px] tabular-nums text-(--color-faint)">{step.number}</span>
              <span>{step.label}</span>
            </span>
          )}
          renderDetail={(step) => (
            <div>
              <h3 className="font-bold text-xl text-(--color-ink) sm:text-2xl">{step.title}</h3>
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
          )}
        />
      </div>
    </Entry>
  );
}
