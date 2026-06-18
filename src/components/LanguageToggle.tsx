"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="inline-flex items-center gap-1 font-mono text-xs">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={
            locale === l
              ? "text-(--color-accent)"
              : "text-(--color-faint) transition-colors hover:text-(--color-paper)"
          }
        >
          {l.toUpperCase()}
        </button>
      )).reduce((acc, el, i) => (i === 0 ? [el] : [...acc, <span key={`sep${i}`} className="text-(--color-faint)">/</span>, el]), [] as React.ReactNode[])}
    </div>
  );
}
