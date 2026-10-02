"use client";

import { useEffect, useRef, useState } from "react";
import { motion, transform, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Messages } from "@/i18n/getMessages";
import { ServiceItemContent } from "./ServiceItemContent";

const PANELS = [
  { fade: [0, 0.3, 0.36], show: [1, 1, 0], type: [0.01, 0.15], tools: [0.15, 0.25] },
  { fade: [0.3, 0.36, 0.64, 0.7], show: [0, 1, 1, 0], type: [0.37, 0.5], tools: [0.5, 0.6] },
  { fade: [0.64, 0.7, 1], show: [0, 1, 1], type: [0.71, 0.84], tools: [0.84, 0.94] },
];

function Panel({
  service,
  index,
  active,
  progress,
  toolsLabel,
  panelRef,
}: {
  service: Messages["services"]["items"][number];
  index: number;
  active: boolean;
  progress: MotionValue<number>;
  toolsLabel: string;
  panelRef: (el: HTMLDivElement | null) => void;
}) {
  const { fade, show, type, tools } = PANELS[index];
  const opacity = useTransform(progress, transform(fade, show));
  const y = useTransform(opacity, [0, 1], [14, 0]);
  const headlineProgress = useTransform(progress, type, [0, 1]);
  const toolsProgress = useTransform(progress, tools, [0, 1]);

  return (
    <motion.div
      ref={panelRef}
      className="absolute inset-x-0 top-0"
      aria-hidden={!active}
      style={{ opacity, y, pointerEvents: active ? "auto" : "none" }}
    >
      <ServiceItemContent
        service={service}
        toolsLabel={toolsLabel}
        active={active}
        headlineProgress={headlineProgress}
        toolsProgress={toolsProgress}
        compact
      />
    </motion.div>
  );
}

const MIN_SCALE = 0.82;

export function ServicesReel({ t, onUnfit }: { t: Messages; onUnfit: () => void }) {
  const items = t.services.items;
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const fit = () => {
      const need = Math.max(...panelRefs.current.map((el) => el?.offsetHeight ?? 0));
      if (!need) return;
      const next = Math.min(1, stage.clientHeight / need);
      if (next < MIN_SCALE) onUnfit();
      else setScale(next);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [onUnfit]);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIndex(v < 0.33 ? 0 : v < 0.67 ? 1 : 2);
  });

  return (
    <div ref={wrapperRef} className="relative h-[420dvh]">
      <div className="sticky top-(--header-h) flex h-[calc(100dvh-var(--header-h))] flex-col overflow-hidden px-6 sm:px-8">
        <h2 className="ink-in relative mx-auto mt-8 w-full max-w-3xl shrink-0 font-bold text-3xl leading-[1.05] text-(--color-ink) sm:mt-10 sm:text-5xl">
          {t.services.title}
        </h2>

        <div ref={stageRef} className="relative mx-auto mt-6 w-full max-w-3xl flex-1 sm:mt-10">
          <div className="absolute inset-0 origin-top-left" style={{ scale }}>
            {items.map((service, i) => (
              <Panel
                key={service.number}
                service={service}
                index={i}
                active={i === activeIndex}
                progress={scrollYProgress}
                toolsLabel={t.services.toolsLabel}
                panelRef={(el) => {
                  panelRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="relative mx-auto mb-14 flex w-full max-w-3xl shrink-0 justify-end gap-4 text-sm sm:mb-8">
          {items.map((service, i) => (
            <span
              key={service.number}
              className={`tabular-nums transition-colors ${i === activeIndex ? "font-bold text-(--color-ink)" : "text-(--color-faint)"}`}
            >
              {service.number}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
