import { notFound } from "next/navigation";
import { projects } from "#content";
import { isLocale, getMessages, type Locale } from "@/i18n/getMessages";
import { Hero } from "@/components/marketing/Hero";
import { Services } from "@/components/marketing/Services";
import { Process } from "@/components/marketing/Process";
import { SelectedWork } from "@/components/marketing/SelectedWork";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";

const CATEGORY_ORDER = ["custom", "integration", "modernization"] as const;

function getCaseStudies(locale: Locale) {
  const byLocale = projects.filter((p) => p.featured && p.locale === locale);
  const fallback = projects.filter(
    (p) => p.featured && p.locale !== locale && !byLocale.some((b) => b.slug === p.slug)
  );
  const list = [...byLocale, ...fallback];
  return CATEGORY_ORDER.map((category) => list.find((p) => p.category === category)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getMessages(locale);
  const caseStudies = getCaseStudies(locale);

  return (
    <main>
      <Hero t={t} />
      <Services t={t} />
      <Process t={t} />
      <SelectedWork t={t} caseStudies={caseStudies} />
      <Faq t={t} />
      <FinalCta t={t} locale={locale} />
    </main>
  );
}
