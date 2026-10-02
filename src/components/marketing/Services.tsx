"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ServiceItemContent } from "./pipeline/ServiceItemContent";
import { ServicesReel } from "./pipeline/ServicesReel";

export function Services({ t }: { t: Messages }) {
  const prefersReduced = useReducedMotion();
  const [reel, setReel] = useState(false);
  const [unfit, setUnfit] = useState(false);
  const handleUnfit = useCallback(() => setUnfit(true), []);
  useEffect(() => {
    const tallEnough = window.matchMedia("(min-height: 600px)");
    const updateLayout = () => {
      setUnfit(false);
      setReel(prefersReduced === false && tallEnough.matches);
    };
    updateLayout();
    tallEnough.addEventListener("change", updateLayout);
    return () => tallEnough.removeEventListener("change", updateLayout);
  }, [prefersReduced]);

  return (
    <Entry id="services" t={t} bleed={reel && !unfit}>
      {reel && !unfit ? (
        <ServicesReel t={t} onUnfit={handleUnfit} />
      ) : (
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="ink-in font-bold text-4xl leading-[1.05] text-(--color-ink) sm:text-5xl">{t.services.title}</h2>
          <div className="mt-10 flex flex-col">
            {t.services.items.map((service) => (
              <div key={service.number} className="border-t border-(--color-line) py-8 first:border-t-0 first:pt-0">
                <ServiceItemContent service={service} toolsLabel={t.services.toolsLabel} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Entry>
  );
}
