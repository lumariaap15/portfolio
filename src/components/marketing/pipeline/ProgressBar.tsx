"use client";

import { motion, useScroll } from "motion/react";

/** The masthead's closing rule: ink hairline, with reading progress laid over it in the accent. */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] border-b border-(--color-ink)">
      <motion.div className="h-0.5 origin-left bg-(--color-accent)" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
