"use client";

import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { Typewriter } from "./pipeline/Typewriter";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero({ t }: { t: Messages }) {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion ? {} : { opacity: 0, y: 16 };
  const shown = { opacity: 1, y: 0 };

  return (
    <Entry id="hero" center>
      <div className="mx-auto max-w-2xl">
        <h1 className="max-w-2xl text-4xl leading-[1.15] tracking-tight text-(--color-ink) sm:text-5xl">
          <Typewriter text={t.hero.headline} />
        </h1>
        <motion.p
          initial={hidden}
          animate={shown}
          transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-(--color-muted)"
        >
          {t.hero.sub}
        </motion.p>
        <motion.a
          href={site.bookingUrl}
          initial={hidden}
          animate={shown}
          transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-full bg-(--color-accent) px-6 py-3 text-sm text-(--color-paper) transition-colors hover:bg-(--color-accent-soft)"
        >
          {t.cta.bookCall}
        </motion.a>
      </div>
    </Entry>
  );
}
