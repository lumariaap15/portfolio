import { site } from "./site";
import type { Locale } from "@/i18n/LocaleProvider";

export function mailtoHref(locale: Locale): string {
  const subject = encodeURIComponent(site.contact.subject[locale]);
  const body = encodeURIComponent(site.contact.body[locale]);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function whatsappHref(locale: Locale): string {
  const msg = encodeURIComponent(site.whatsapp.message[locale]);
  return `https://wa.me/${site.whatsapp.number}?text=${msg}`;
}
