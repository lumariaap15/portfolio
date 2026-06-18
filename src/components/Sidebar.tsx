"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { site } from "@/lib/site";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { mailtoHref, whatsappHref } from "@/lib/contact";
import { LanguageToggle } from "./LanguageToggle";

const ACCENT_GRADIENT = "linear-gradient(115deg, #ffac41 0%, #ff1e56 100%)";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] } },
};

function PhotoBlock() {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative w-[240px]">
      {/* glow detrás de la foto */}
      <div className="glow glow-pink -left-8 -top-8 h-40 w-40 opacity-30" aria-hidden />
      <div className="glow glow-amber -bottom-8 -right-8 h-36 w-36 opacity-30" aria-hidden />
      <div
        className="relative rounded-full p-[3px]"
        style={{ backgroundImage: ACCENT_GRADIENT }}
      >
        {ok ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/static/me2.png"
            alt={site.name}
            width={320}
            height={320}
            onError={() => setOk(false)}
            className="aspect-square w-full rounded-full object-cover"
          />
        ) : (
          <div
            className="flex aspect-square w-full items-center justify-center rounded-full font-display text-5xl text-(--color-ink)"
            style={{ backgroundImage: ACCENT_GRADIENT }}
          >
            LA
          </div>
        )}
      </div>
    </div>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-line) text-(--color-muted) transition-all hover:scale-110 hover:border-(--color-accent) hover:text-(--color-accent)"
    >
      {children}
    </a>
  );
}

export function Sidebar() {
  const t = useT();
  const { locale } = useLocale();

  const navItems = [
    { href: "/#experience", label: t.nav.experience },
    { href: "/#skills", label: t.nav.skills },
    { href: "/#learning", label: t.nav.learning },
    { href: "/#education", label: t.nav.education },
    //{ href: "/projects", label: t.nav.projects },
  ];

  return (
    <aside className="p-5 sm:p-8 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:justify-center lg:p-7">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative w-full overflow-hidden rounded-[2rem] border border-(--color-line) bg-(--color-ink-soft) px-8 py-12 shadow-2xl shadow-black/60 lg:mx-auto"
      >
        {/* glows internos suaves */}
        <div className="glow glow-amber -left-16 top-6 h-48 w-48 opacity-[0.12]" aria-hidden />
        <div className="glow glow-pink -bottom-12 -right-16 h-56 w-56 opacity-[0.12]" aria-hidden />
        {/* marco punteado tipo estampilla */}
        <div className="pointer-events-none absolute inset-3.5 rounded-[1.5rem] border border-dashed border-(--color-line)" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-[300px] flex-col items-center text-center">
        <motion.div variants={item}>
          <Link href="/" className="block">
            <PhotoBlock />
          </Link>
        </motion.div>

        {/* Badge disponibilidad */}
        {/* <motion.div variants={item} className="mt-7 inline-flex items-center gap-2 rounded-full border border-(--color-line) bg-(--color-ink-soft) px-3 py-1">
          <span className="status-dot h-2 w-2 rounded-full bg-(--color-accent-2)" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-(--color-muted)">{t.cta.available}</span>
        </motion.div> */}

        <motion.h1 variants={item} className="mt-4 font-display text-4xl leading-tight text-(--color-paper)">
          {site.name}
        </motion.h1>
        <motion.p variants={item} className="mt-2 text-(--color-muted)">{t.hero.pre}</motion.p>
        <motion.p variants={item} className="mt-1 font-mono text-xs text-(--color-faint)">{site.location}</motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-7 flex w-full flex-col gap-3">
          <a
            href={mailtoHref(locale)}
            style={{ backgroundImage: ACCENT_GRADIENT }}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-mono text-sm font-medium text-(--color-ink) shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <MailIcon />
            {t.cta.email}
          </a>
          <a
            href={whatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-(--color-accent-2) px-5 py-3 font-mono text-sm text-(--color-accent-2) transition-all hover:-translate-y-0.5 hover:bg-(--color-accent-2) hover:text-(--color-ink)"
          >
            <WhatsAppIcon />
            {t.cta.whatsapp}
          </a>
        </motion.div>

        {/* Section nav (desktop) */}
        <motion.nav variants={item} className="mt-8 hidden w-full lg:block">
          <ul className="flex flex-col items-center gap-1 text-sm">
            {navItems.map((nav) => (
              <li key={nav.href}>
                <Link
                  href={nav.href}
                  className="group flex items-center gap-3 py-1.5 text-(--color-muted) transition-colors hover:text-(--color-paper)"
                >
                  <span className="h-px w-4 bg-(--color-line) transition-all duration-300 group-hover:w-7 group-hover:bg-(--color-accent)" />
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        <motion.div variants={item} className="mt-8 w-full">
          <div className="divider-gradient mb-6" />
          <div className="flex items-center justify-center gap-3">
            <Social href={site.links.github} label="GitHub"><GitHubIcon /></Social>
            <Social href={site.links.linkedin} label="LinkedIn"><LinkedInIcon /></Social>
            <Social href={site.links.cv} label={t.cta.cv}><DocIcon /></Social>
            <span className="mx-1 h-4 w-px bg-(--color-line)" />
            <LanguageToggle />
          </div>
        </motion.div>
        </div>
      </motion.div>
    </aside>
  );
}

/* ── Iconos inline (16px) ─────────────────────────────────────────── */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.16c-.25.7-1.44 1.33-1.99 1.41-.53.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.36-5.16-4.57-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.53c.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.86 2.08.93 2.23.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.06 1.3 2.36 1.45.3.15.47.13.64-.08.18-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.73-.18 1.43Z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.34 9.34 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h8" />
    </svg>
  );
}
