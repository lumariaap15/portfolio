import { site } from "@/lib/site";
import type { Locale, Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ContactForm } from "./ContactForm";
import { Footer } from "@/components/Footer";

export function FinalCta({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <Entry id="contact">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-bold max-w-xl text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.finalCta.title}</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-(--color-muted)">{t.finalCta.body}</p>
        <p className="mt-2 max-w-xl leading-relaxed text-(--color-ink)">{t.finalCta.noSolutionLine}</p>

        <p className="mt-8 [font-family:var(--font-hand)] text-4xl text-(--color-ink)">— Luisa</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={site.bookingUrl}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
          >
            {t.cta.bookCall}
          </a>
          <a
            href="#contact-form-inputs"
            className="cursor-pointer text-sm text-(--color-muted) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-ink)"
          >
            {t.cta.sendDetails}
          </a>
        </div>
        <p className="mt-3 text-xs text-(--color-faint)">{t.finalCta.note}</p>

        <div id="contact-form-inputs">
          <ContactForm t={t.contactForm} />
        </div>

        <Footer locale={locale} t={t} />
      </div>
    </Entry>
  );
}
