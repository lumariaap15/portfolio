"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ScrollTypewriter, Typewriter } from "./Typewriter";
import { ServiceCut } from "../illustrations/ServiceCut";
import { TechLogo } from "./TechLogo";
import { SERVICE_LOGOS } from "./serviceLogos";
import type { Messages } from "@/i18n/getMessages";

type Service = Messages["services"]["items"][number];

function Tool({ name, index, total, progress }: { name: string; index: number; total: number; progress?: MotionValue<number> }) {
  const start = index / (total + 1);
  const end = (index + 2) / (total + 1);
  const fallback = useTransform(() => 1);
  const source = progress ?? fallback;
  const opacity = useTransform(source, [start, end], [0, 1]);
  const scale = useTransform(source, [start, end], [1.18, 1]);
  const filter = useTransform(source, [start, end], ["blur(3px)", "blur(0px)"]);

  return (
    <motion.li
      className="flex items-center gap-2 text-sm text-(--color-ink)"
      style={progress ? { opacity, scale, filter } : undefined}
    >
      <TechLogo name={name} decorative className="size-5 shrink-0" />
      <span>{name}</span>
    </motion.li>
  );
}

export function ServiceItemContent({
  service,
  toolsLabel,
  active = true,
  headlineProgress,
  toolsProgress,
  compact = false,
}: {
  service: Service;
  toolsLabel: string;
  active?: boolean;
  headlineProgress?: MotionValue<number>;
  toolsProgress?: MotionValue<number>;
  compact?: boolean;
}) {
  const tools = SERVICE_LOGOS[service.category];
  const gap = compact ? "mt-5 sm:mt-7" : "mt-8";

  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3">
            <span className="text-sm tabular-nums text-(--color-faint)">{service.number}</span>
            <span className="text-sm text-(--color-faint)">{service.label}</span>
          </div>
          <p className={`headline max-w-2xl font-bold leading-[1.02] text-(--color-accent) ${compact ? "mt-3 text-[2rem] sm:text-5xl lg:text-6xl" : "mt-4 text-4xl sm:text-6xl"}`}>
            {headlineProgress ? (
              <ScrollTypewriter text={service.headline} progress={headlineProgress} active={active} />
            ) : (
              <Typewriter text={service.headline} active={active} />
            )}
          </p>
        </div>
        <ServiceCut category={service.category} className="mt-1 w-14 shrink-0 sm:w-24 md:w-28" />
      </div>
      <ul className={`${gap} grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 sm:gap-x-10 sm:gap-y-4`} role="list">
        {service.tags.map((tag) => (
          <li key={tag} className="text-base font-bold leading-snug text-(--color-ink) sm:text-lg">
            <span className="underline decoration-(--color-accent)/35 decoration-2 underline-offset-4 [text-decoration-skip-ink:auto]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
      <div className={`${gap} max-w-xl space-y-4 leading-relaxed text-(--color-muted)`}>
        {service.body.map((paragraph, i) => (
          <p key={paragraph} className={i === 0 ? "dropcap" : undefined}>{paragraph}</p>
        ))}
      </div>
      <div className={`${gap} flex max-w-2xl flex-col gap-3 border-t border-(--color-line) pt-4 sm:flex-row sm:items-baseline sm:gap-6`}>
        <span className="shrink-0 text-xs uppercase tracking-[0.05em] text-(--color-muted)">{toolsLabel}</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2" role="list">
          {tools.map((name, i) => (
            <Tool key={name} name={name} index={i} total={tools.length} progress={toolsProgress} />
          ))}
        </ul>
      </div>
    </div>
  );
}
