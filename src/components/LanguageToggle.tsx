"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/getMessages";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="inline-flex items-center gap-1 text-xs">
      {locales.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1">
          {i > 0 && <span className="text-(--color-faint)">/</span>}
          <Link
            href={`/${l}${rest ? `/${rest}` : ""}`}
            aria-current={locale === l ? "true" : undefined}
            className={
              locale === l
                ? "cursor-pointer text-(--color-accent) transition-colors"
                : "cursor-pointer text-(--color-faint) transition-colors hover:text-(--color-ink)"
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
