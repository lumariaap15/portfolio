import Link from "next/link";
import { site } from "@/lib/site";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale, Messages } from "@/i18n/getMessages";

export function Letterhead({ locale }: { locale: Locale; t: Messages }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--header-h) border-b border-(--color-line) bg-(--color-paper)">
      <div className="mx-auto flex h-full max-w-3xl items-center justify-between px-6 sm:px-8">
        <Link href={`/${locale}`} className="cursor-pointer text-lg tracking-tight text-(--color-ink)">
          {site.name}
        </Link>
        <LanguageToggle locale={locale} />
      </div>
    </header>
  );
}
