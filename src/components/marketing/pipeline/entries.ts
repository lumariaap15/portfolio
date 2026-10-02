import type { Messages } from "@/i18n/getMessages";

export type EntryId = "hero" | "about" | "services" | "process" | "work" | "faq" | "contact";

export const ENTRIES: EntryId[] = ["hero", "services", "work", "process", "faq", "contact"];

export function entryLabel(id: EntryId, t: Messages): string | null {
  switch (id) {
    case "hero":
      return null;
    case "about":
      return t.nav.about;
    case "services":
      return t.nav.services;
    case "process":
      return t.nav.process;
    case "work":
      return t.nav.work;
    case "faq":
      return t.nav.faq;
    case "contact":
      return t.nav.contact;
  }
}
