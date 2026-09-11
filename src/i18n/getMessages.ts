import en, { type Messages } from "./messages/en";
import es from "./messages/es";

export type Locale = "en" | "es";
export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

const dictionaries: Record<Locale, Messages> = { en, es };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

export type { Messages };
