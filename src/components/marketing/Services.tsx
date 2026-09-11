"use client";

import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ListDetail } from "./pipeline/ListDetail";

export function Services({ t }: { t: Messages }) {
  const items = t.services.items.map((service) => ({ ...service, id: service.number }));

  return (
    <Entry id="services">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.services.title}</h2>

        <ListDetail
          items={items}
          ariaLabel={t.services.title}
          renderRow={(service) => <span>{service.label}</span>}
          renderDetail={(service) => (
            <div>
              <h3 className="font-bold text-2xl tracking-tight text-(--color-ink) sm:text-3xl">{service.headline}</h3>
              <div className="mt-4 max-w-xl space-y-4 leading-relaxed text-(--color-muted)">
                {service.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 max-w-xl text-sm text-(--color-ink)">{service.tags.join(" · ")}</p>
            </div>
          )}
        />

        <div className="mt-16 border-t border-(--color-line) pt-10">
          <h3 className="font-bold text-xl text-(--color-ink) sm:text-2xl">{t.ai.title}</h3>
          <div className="mt-4 max-w-xl space-y-4 leading-relaxed text-(--color-muted)">
            {t.ai.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-4 max-w-xl text-lg font-medium text-(--color-accent)">{t.ai.highlight}</p>
        </div>
      </div>
    </Entry>
  );
}
