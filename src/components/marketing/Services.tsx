"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { ServiceItemContent } from "./pipeline/ServiceItemContent";
import { ServicesReel } from "./pipeline/ServicesReel";

export function Services({ t }: { t: Messages }) {
  const prefersReduced = useReducedMotion();
  // Keep the expanded feature lists in normal flow on small or short screens.
  const [reel, setReel] = useState(false);
  useEffect(() => {
    const roomyViewport = window.matchMedia("(min-width: 768px) and (min-height: 900px)");
    const updateLayout = () => setReel(prefersReduced === false && roomyViewport.matches);
    updateLayout();
    roomyViewport.addEventListener("change", updateLayout);
    return () => roomyViewport.removeEventListener("change", updateLayout);
  }, [prefersReduced]);

  return (
    <Entry id="services" bleed={reel}>
      {reel ? (
        <ServicesReel t={t} />
      ) : (
        <div className="mx-auto w-full max-w-3xl">
          <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.services.title}</h2>
          <div className="mt-10 flex flex-col">
            {t.services.items.map((service) => (
              <div key={service.number} className="border-t border-(--color-line) py-8 first:border-t-0 first:pt-0">
                <ServiceItemContent service={service} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Entry>
  );
}
