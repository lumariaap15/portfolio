"use client";

import { useEffect, useRef } from "react";
import { useEntryContext } from "./EntryTracker";
import type { EntryId } from "./entries";

export function Entry({
  id,
  className = "",
  /** For entries whose content is naturally short: hold a full viewport and center it, so the next entry never bleeds into view. Long entries stay at natural height. */
  center = false,
  children,
}: {
  id: EntryId;
  className?: string;
  center?: boolean;
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

  return (
    <section id={id} ref={ref} className={`entry relative px-6 sm:px-8 ${centering} ${className}`}>
      {children}
    </section>
  );
}
