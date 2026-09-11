"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";
import { ENTRIES, type EntryId } from "./entries";

type EntryContextValue = {
  activeIndex: number;
  register: (id: EntryId, el: HTMLElement) => () => void;
};

const EntryContext = createContext<EntryContextValue | null>(null);

export function EntryTracker({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ratios = useRef(new Map<EntryId, number>());

  const [observer] = useState<IntersectionObserver | null>(() => {
    if (typeof IntersectionObserver === "undefined") return null;
    return new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-entry-id") as EntryId | null;
          if (!id) continue;
          ratios.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: EntryId | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) {
          const idx = ENTRIES.findIndex((e) => e === bestId);
          if (idx >= 0) setActiveIndex(idx);
        }
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1], rootMargin: "-56px 0px -30% 0px" }
    );
  });

  const register = useMemo(
    () => (id: EntryId, el: HTMLElement) => {
      el.setAttribute("data-entry-id", id);
      observer?.observe(el);
      return () => {
        observer?.unobserve(el);
        ratios.current.delete(id);
      };
    },
    [observer]
  );

  const value = useMemo(() => ({ activeIndex, register }), [activeIndex, register]);

  return <EntryContext.Provider value={value}>{children}</EntryContext.Provider>;
}

export function useEntryContext() {
  const ctx = useContext(EntryContext);
  if (!ctx) throw new Error("useEntryContext must be used within an EntryTracker");
  return ctx;
}
