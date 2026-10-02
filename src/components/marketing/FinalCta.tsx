import { site } from "@/lib/site";
import type { Locale, Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ContactForm } from "./ContactForm";
import { Typewriter } from "./pipeline/Typewriter";
import { Footer } from "@/components/Footer";

export function FinalCta({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <Entry id="contact" t={t} bleed>
      <div className="px-6 pt-14 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-bold max-w-xl text-4xl leading-[1.05] text-(--color-ink) sm:text-5xl"><Typewriter text={t.hero.headline} /></h2>
        </div>
      </div>

      <figure className="mx-auto mt-10 max-w-3xl px-6 sm:px-8">
        <div className="halftone border border-(--color-ink)">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/static/teaching.jpg"
            alt={t.finalCta.photoAlt}
            width={3024}
            height={4032}
            loading="lazy"
            className="block h-56 w-full object-cover sm:h-72 lg:h-80"
            style={{ objectPosition: "50% 27%" }}
          />
        </div>
        <figcaption aria-hidden="true" className="mt-2 text-xs italic text-(--color-muted)">
          {t.finalCta.photoAlt}.
        </figcaption>
      </figure>

      <div className="px-6 pb-24 pt-12 sm:px-8 sm:pt-16">
        <div id="contact-form-inputs" className="mx-auto max-w-3xl scroll-mt-24">
          <h3 className="text-3xl font-bold tracking-tight text-(--color-ink) sm:text-4xl">{t.contactForm.title}</h3>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={site.bookingUrl}
              className="inline-flex cursor-pointer items-center justify-center rounded-[2px] bg-(--color-accent) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
            >
              {t.cta.bookCall}
            </a>
          </div>
          <ContactForm t={t.contactForm} locale={locale} />

          <Footer locale={locale} t={t} />
        </div>
      </div>
    </Entry>
  );
}
