import { site } from "@/lib/site";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale, Messages } from "@/i18n/getMessages";

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <footer className="mt-16 border-t border-(--color-line) pt-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-6 text-sm text-(--color-muted)">
          <a href={site.links.linkedin} className="transition-colors hover:text-(--color-ink)">LinkedIn</a>
          <a href={site.links.github} className="transition-colors hover:text-(--color-ink)">GitHub</a>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-(--color-ink)">Email</a>
        </div>
        <LanguageToggle locale={locale} />
      </div>
      <p className="mt-8 text-xs text-(--color-faint)">
        © {new Date().getFullYear()} {site.name} · {site.location} · {t.footer.rights}
      </p>
    </footer>
  );
}
