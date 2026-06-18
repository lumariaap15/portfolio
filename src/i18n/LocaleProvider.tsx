"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en, { type Messages } from "./messages/en";
import es from "./messages/es";

export type Locale = "en" | "es";

const messages: Record<Locale, Messages> = { en, es };

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleContext = createContext<Ctx | null>(null);

function detectInitial(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("locale");
  if (stored === "en" || stored === "es") return stored;
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Detect after mount to avoid hydration mismatch (server always renders "en").
  useEffect(() => {
    const initial = detectInitial();
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export function useT(): Messages {
  return messages[useLocale().locale];
}
