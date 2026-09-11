import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ChevronIcon } from "./pipeline/icons";

export function Faq({ t }: { t: Messages }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Entry id="faq">
      <div className="mx-auto max-w-3xl">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.faq.title}</h2>

        <div className="mt-10 flex flex-col">
          {t.faq.items.map((item) => (
            <details key={item.q} className="group border-t border-(--color-line) py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-(--color-ink) marker:content-none">
                <span>{item.q}</span>
                <ChevronIcon className="shrink-0 text-(--color-faint) transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 max-w-xl leading-relaxed text-(--color-muted)">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Entry>
  );
}
