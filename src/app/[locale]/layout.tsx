import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Courier_Prime, Caveat } from "next/font/google";
import { site } from "@/lib/site";
import { locales, isLocale, getMessages, type Locale } from "@/i18n/getMessages";
import { EntryTracker } from "@/components/marketing/pipeline/EntryTracker";
import { Letterhead } from "@/components/marketing/pipeline/Letterhead";
import { EntryIndex } from "@/components/marketing/pipeline/EntryIndex";
import "../globals.css";

const typeFont = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

const handFont = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_ES" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = getMessages(locale);

  const title = `${site.name} — ${site.role}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: t.hero.sub,
    keywords: [
      "custom software development",
      "API integration developer",
      "software modernization services",
      "SaaS development",
      "customer portal development",
      "production ready MVP development",
      "AI integration for existing software",
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      title,
      description: t.hero.sub,
      url: `/${locale}`,
      siteName: site.name,
      locale: OG_LOCALE[locale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.hero.sub,
    },
  };
}

const personJsonLd = (t: ReturnType<typeof getMessages>) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: t.hero.sub,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: site.location },
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
});

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  areaServed: "Worldwide",
  founder: { "@type": "Person", name: site.name },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getMessages(locale);

  return (
    <html lang={locale} className={`${typeFont.variable} ${handFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(t)) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <EntryTracker>
          <Letterhead locale={locale} t={t} />
          <EntryIndex t={t} />
          {children}
        </EntryTracker>
      </body>
    </html>
  );
}
