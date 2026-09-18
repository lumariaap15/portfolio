import Link from "next/link";
import { site } from "@/lib/site";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale, Messages } from "@/i18n/getMessages";
import { ProgressBar } from "./ProgressBar";

export function Letterhead({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) bg-(--color-paper)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href={`/${locale}`} className="cursor-pointer shrink-0 text-sm tracking-tight sm:text-lg text-(--color-ink)">
          {site.name}
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
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
