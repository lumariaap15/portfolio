import type { MetadataRoute } from "next";
import { locales } from "@/i18n/getMessages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const languages = Object.fromEntries(locales.map((l) => [l, `${base}/${l}`]));

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
