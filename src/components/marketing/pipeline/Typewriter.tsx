"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** The one signature motion moment: the hero headline types itself once, then it's done. */
export function Typewriter({ text, className = "" }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(reduceMotion ? text.length : 0);
  const [done, setDone] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      setDone(true);
      return;
    }
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
    }, 32);
    return () => clearInterval(id);
  }, [text, reduceMotion]);

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          className={`ml-0.5 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.1em] bg-(--color-ink) align-middle ${
            done ? "caret-blink" : ""
          }`}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
