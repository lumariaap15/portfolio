"use client";

import { motion, useScroll } from "motion/react";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-(--color-line)">
      <motion.div className="h-full origin-left bg-(--color-accent)" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
