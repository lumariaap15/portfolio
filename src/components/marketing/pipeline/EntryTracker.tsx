"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ENTRIES, type EntryId } from "./entries";

type EntryContextValue = {
  activeIndex: number;
  register: (id: EntryId, el: HTMLElement) => () => void;
};

const EntryContext = createContext<EntryContextValue | null>(null);

const ARRIVE_AT = 0.35;
const RECEDE_SCALE = 0.05;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function EntryTracker({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sheets = useRef(new Map<EntryId, HTMLElement>());
  const frame = useRef(0);
  const resize = useRef<ResizeObserver | null>(null);

  const update = useCallback(() => {
    frame.current = 0;
    const vh = window.innerHeight;
    const stacked = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ordered = ENTRIES.map((id) => sheets.current.get(id)).filter((el): el is HTMLElement => Boolean(el));

    const enters = ordered.map((el) => clamp01(1 - el.getBoundingClientRect().top / vh));
    const heights = ordered.map((el) => el.offsetHeight);

    let active = 0;
    ordered.forEach((el, i) => {
      const enter = enters[i];
      const cover = stacked ? (enters[i + 1] ?? 0) : 0;
      el.style.setProperty("--enter", enter.toFixed(4));
      el.style.setProperty("--cover", cover.toFixed(4));
      if (enter >= ARRIVE_AT) el.setAttribute("data-arrived", "");
      if (enter >= 0.5) active = ENTRIES.indexOf(el.getAttribute("data-entry-id") as EntryId);

      const body = el.firstElementChild as HTMLElement | null;
      if (body) {
        const h = heights[i];
        const originY = h > vh ? h - vh / 2 : h / 2;
        body.style.transformOrigin = `50% ${originY}px`;
        body.style.transform = cover > 0 ? `scale(${1 - cover * RECEDE_SCALE})` : "";
      }
      el.style.visibility = cover >= 1 ? "hidden" : "";
    });
    setActiveIndex(active);
  }, []);

  const schedule = useCallback(() => {
    if (!frame.current) frame.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    resize.current = new ResizeObserver((records) => {
      for (const record of records) {
        (record.target as HTMLElement).style.setProperty("--sheet-h", `${(record.target as HTMLElement).offsetHeight}px`);
      }
      schedule();
    });
    sheets.current.forEach((el) => resize.current?.observe(el));

    update();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("sheets-armed");
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.current?.disconnect();
      resize.current = null;
      if (frame.current) cancelAnimationFrame(frame.current);
      document.documentElement.classList.remove("sheets-armed");
    };
  }, [schedule, update]);

  const register = useCallback(
    (id: EntryId, el: HTMLElement) => {
      el.setAttribute("data-entry-id", id);
      sheets.current.set(id, el);
      resize.current?.observe(el);
      schedule();
      return () => {
        resize.current?.unobserve(el);
        sheets.current.delete(id);
      };
    },
    [schedule]
  );

  const value = useMemo(() => ({ activeIndex, register }), [activeIndex, register]);

  return <EntryContext.Provider value={value}>{children}</EntryContext.Provider>;
}

export function useEntryContext() {
  const ctx = useContext(EntryContext);
  if (!ctx) throw new Error("useEntryContext must be used within an EntryTracker");
  return ctx;
}
