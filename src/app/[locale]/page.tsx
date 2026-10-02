import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/i18n/getMessages";
import { Hero } from "@/components/marketing/Hero";
import { Services } from "@/components/marketing/Services";
import { Process } from "@/components/marketing/Process";
import { SelectedWork } from "@/components/marketing/SelectedWork";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const t = getMessages(locale);

  return (
    <main>
      <Hero t={t} />
      <Services t={t} />
      <SelectedWork t={t} />
      <Process t={t} />
      <Faq t={t} />
      <FinalCta t={t} locale={locale} />
    </main>
  );
}
