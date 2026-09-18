"use client";

import { useEffect, useRef } from "react";
import { useEntryContext } from "./EntryTracker";
import type { EntryId } from "./entries";

export function Entry({
  id,
  className = "",
  /** For entries whose content is naturally short: hold a full viewport and center it, so the next entry never bleeds into view. Long entries stay at natural height. */
  center = false,
  /** For entries that manage their own height and vertical rhythm (e.g. a pinned scroll sequence): skip the standard .entry padding and side gutters, keep only the section top-rule. */
  bleed = false,
  children,
}: {
  id: EntryId;
  className?: string;
  center?: boolean;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { register } = useEntryContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return register(id, el);
  }, [id, register]);

  const centering = center ? "flex min-h-dvh flex-col justify-center" : "";
  const base = bleed ? "border-t border-(--color-line)" : "entry px-6 sm:px-8";

  return (
    <section id={id} ref={ref} className={`${base} relative ${centering} ${className}`}>
      {children}
    </section>
  );
}
