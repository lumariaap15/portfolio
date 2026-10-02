"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * `useReducedMotion()` can resolve synchronously on the client's first paint (from the
 * real OS preference) while SSR always renders the full-motion default — branching
 * rendered content directly on it causes a hydration mismatch. Gate it behind mount so
 * the first client render always agrees with the server, then correct one frame later.
 */
export function useSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && Boolean(prefersReduced);
}
