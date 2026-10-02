"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, type MotionValue } from "motion/react";
import { useSafeReducedMotion } from "./useSafeReducedMotion";

/** Types once on arrival; overlapping scroll panels can gate arrival with active. */
export function Typewriter({ text, className = "", active = true }: { text: string; className?: string; active?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView && active) setStarted(true);
  }, [inView, active]);
  const reduceMotion = useSafeReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const [done, setDone] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      setDone(true);
      return;
    }
    if (!started) return;
    setCount(0);
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 75);
    return () => clearInterval(id);
  }, [text, reduceMotion, started]);

  return (
    <span ref={ref} className={`relative block ${className}`}>
      <span aria-hidden="true" className="invisible">{text}<span className="ml-0.5 inline-block w-[0.5ch]" /></span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {!reduceMotion && inView && active && started && <span
          className={`ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-current align-middle ${
            done ? "caret-blink" : ""
          }`}
        />}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

export function ScrollTypewriter({ text, progress, active = true, className = "" }: { text: string; progress: MotionValue<number>; active?: boolean; className?: string }) {
  const toCount = (p: number) => Math.round(Math.min(Math.max(p, 0), 1) * text.length);
  const [count, setCount] = useState(() => toCount(progress.get()));
  useMotionValueEvent(progress, "change", (p) => setCount(toCount(p)));
  const done = count >= text.length;

  return (
    <span className={`relative block ${className}`}>
      <span aria-hidden="true" className="invisible">{text}<span className="ml-0.5 inline-block w-[0.5ch]" /></span>
      <span aria-hidden="true" className="absolute inset-0">
        {text.slice(0, count)}
        {active && (
          <span
            className={`ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-current align-middle ${
              done || count === 0 ? "caret-blink" : ""
            }`}
          />
        )}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
