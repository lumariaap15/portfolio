import Link from "next/link";
import { site } from "@/lib/site";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale, Messages } from "@/i18n/getMessages";
import { ProgressBar } from "./ProgressBar";

export function Letterhead({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) bg-(--color-paper)">
      <div className="mx-auto grid h-full max-w-4xl grid-cols-[1fr_auto] items-center gap-3 px-4 sm:grid-cols-[1fr_auto_1fr] sm:px-8">
        <span className="hidden text-xs text-(--color-muted) sm:block">{site.location}</span>
        <Link
          href={`/${locale}`}
          className="nameplate cursor-pointer text-2xl text-(--color-ink) sm:text-3xl"
        >
          {site.name}
        </Link>
        <div className="flex items-center justify-end gap-3 sm:gap-6">
          <Link
            href={`/${locale}#contact-form-inputs`}
            className="inline-flex min-h-11 cursor-pointer items-center text-xs leading-tight text-(--color-accent) underline decoration-(--color-line) underline-offset-4 transition-colors hover:text-(--color-accent-soft) hover:decoration-current sm:text-sm"
          >
            {t.contactForm.title}
          </Link>
          <LanguageToggle locale={locale} />
        </div>
      </div>
      <ProgressBar />
    </header>
  );
}
