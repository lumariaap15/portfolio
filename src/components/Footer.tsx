"use client";

import { site } from "@/lib/site";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { mailtoHref, whatsappHref } from "@/lib/contact";

export function Footer() {
  const t = useT();
  const { locale } = useLocale();
  return (
    <footer id="contact" className="mt-32 w-full border-t border-(--color-line) px-2 py-16 md:px-6">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">{t.cta.work}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={mailtoHref(locale)} className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 font-mono text-sm text-(--color-ink) transition-colors hover:bg-(--color-accent-soft)">
              {t.cta.email}
            </a>
            <a href={whatsappHref(locale)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-(--color-accent-2) px-6 py-3 font-mono text-sm text-(--color-accent-2) transition-colors hover:bg-(--color-accent-2) hover:text-(--color-ink)">
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
        <div className="flex gap-6 font-mono text-sm text-(--color-muted)">
          <a href={site.links.github} className="transition-colors hover:text-(--color-paper)">GitHub</a>
          <a href={site.links.linkedin} className="transition-colors hover:text-(--color-paper)">LinkedIn</a>
          <a href={site.links.cv} className="transition-colors hover:text-(--color-paper)">{t.cta.cv}</a>
        </div>
      </div>
      <p className="mt-12 font-mono text-xs text-(--color-faint)">© {new Date().getFullYear()} {site.name} · {site.location}</p>
    </footer>
  );
}
