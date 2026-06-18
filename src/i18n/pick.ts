import type { Locale } from "./LocaleProvider";

// Returns the _es variant when locale is "es" and it exists, else the base field.
export function pick<T extends Record<string, unknown>>(
  obj: T,
  field: string,
  locale: Locale
): string {
  if (locale === "es") {
    const esVal = obj[`${field}_es`];
    if (typeof esVal === "string" && esVal.length > 0) return esVal;
  }
  const base = obj[field];
  return typeof base === "string" ? base : "";
}
