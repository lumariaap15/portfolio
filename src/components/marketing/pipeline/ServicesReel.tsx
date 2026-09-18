"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { Messages } from "@/i18n/getMessages";
import { ServiceItemContent } from "./ServiceItemContent";
import { TechLogo } from "./TechLogo";
import { SERVICE_LOGOS } from "./serviceLogos";

/** Crossfade zones between each of the 3 slices along the pinned scroll's 0–1 progress. */
const PROGRESS_STOPS = [0, 0.28, 0.38, 0.62, 0.72, 1];
const LOGO_SIZE: React.CSSProperties = { width: "clamp(4.5rem, 10vw, 8rem)", height: "clamp(4.5rem, 10vw, 8rem)" };

function Watermark({ names }: { names: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 opacity-[0.07] sm:gap-14">
      {names.map((name) => (
        <TechLogo key={name} name={name} className="text-(--color-ink)" style={LOGO_SIZE} />
      ))}
    </div>
  );
}

export function ServicesReel({ t }: { t: Messages }) {
  const items = t.services.items;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  const opacity0 = useTransform(scrollYProgress, PROGRESS_STOPS, [1, 1, 0, 0, 0, 0]);
  const opacity1 = useTransform(scrollYProgress, PROGRESS_STOPS, [0, 0, 1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, PROGRESS_STOPS, [0, 0, 0, 0, 1, 1]);
  const opacities = [opacity0, opacity1, opacity2];

  /** Each panel settles in on arrival rather than flatly dissolving — one signature motion, reused per slice. */
  const y0 = useTransform(opacity0, [0, 1], [14, 0]);
  const y1 = useTransform(opacity1, [0, 1], [14, 0]);
  const y2 = useTransform(opacity2, [0, 1], [14, 0]);
  const ys = [y0, y1, y2];

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2);
  });

  return (
    <div ref={wrapperRef} className="relative h-[300dvh]">
      <div className="sticky top-(--header-h) flex h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden px-6 sm:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {items.map((service, i) => (
            <motion.div
              key={service.number}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: opacities[i] }}
            >
              <Watermark names={SERVICE_LOGOS[service.category]} />
            </motion.div>
          ))}
        </div>

        <h2 className="relative mx-auto mt-10 w-full max-w-3xl shrink-0 font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">
          {t.services.title}
        </h2>

        <div className="relative mx-auto mt-10 w-full max-w-3xl flex-1">
          {items.map((service, i) => (
            <motion.div
              key={service.number}
              className="absolute inset-x-0 top-0"
              aria-hidden={i !== activeIndex}
              style={{ opacity: opacities[i], y: ys[i] }}
            >
              <ServiceItemContent service={service} active={i === activeIndex} />
            </motion.div>
          ))}
        </div>

        <div className="relative mx-auto mb-10 flex w-full max-w-3xl shrink-0 justify-end gap-3 text-sm">
          {items.map((service, i) => (
            <span
              key={service.number}
              className={i === activeIndex ? "font-bold text-(--color-ink)" : "text-(--color-faint)"}
            >
              {service.number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
