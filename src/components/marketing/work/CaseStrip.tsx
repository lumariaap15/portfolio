"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-4 w-4 ${flip ? "rotate-180" : ""}`}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

export function CaseStrip({
  title,
  label,
  prevLabel,
  nextLabel,
  children,
}: {
  title: string;
  label: string;
  prevLabel: string;
  nextLabel: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const slide = el.querySelector("li");
    const width = slide ? slide.getBoundingClientRect().width : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * width, behavior: reduce ? "auto" : "smooth" });
  };

  const button =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-[2px] border border-(--color-ink) text-(--color-ink) transition-colors hover:bg-(--color-ink) hover:text-(--color-paper) disabled:cursor-default disabled:border-(--color-line) disabled:text-(--color-line) disabled:hover:bg-transparent";

  return (
    <div className="mt-14">
      <div className="mx-auto flex w-full max-w-3xl items-end justify-between gap-4">
        <h3 className="text-2xl font-bold text-(--color-ink) sm:text-3xl">{title}</h3>
        <div className="flex gap-2">
          <button type="button" className={button} onClick={() => step(-1)} disabled={edges.start} aria-label={prevLabel}>
            <Arrow flip />
          </button>
          <button type="button" className={button} onClick={() => step(1)} disabled={edges.end} aria-label={nextLabel}>
            <Arrow />
          </button>
        </div>
      </div>

      <ul
        ref={ref}
        tabIndex={0}
        aria-label={label}
        className="case-strip -mx-6 mt-8 flex snap-x snap-mandatory items-start overflow-x-auto pb-6 sm:-mx-8"
      >
        {children}
      </ul>
    </div>
  );
}
