"use client";

import { useEffect, useRef } from "react";
import type { Messages } from "@/i18n/getMessages";
import { useEntryContext } from "./EntryTracker";
import { ENTRIES, entryLabel, type EntryId } from "./entries";

function Folio({ id, t }: { id: EntryId; t: Messages }) {
  const page = ENTRIES.indexOf(id) + 1;

  return (
    <div aria-hidden="true" className="px-6 pt-[calc(var(--header-h)+1.5rem)] sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="folio-head flex items-baseline justify-between gap-6 text-[11px] uppercase tracking-[0.14em] text-(--color-muted) sm:text-xs">
          <span className="tabular-nums">A{page}</span>
          <span className="font-bold text-(--color-ink)">{entryLabel(id, t)}</span>
          <span className="hidden sm:inline">{t.masthead.edition}</span>
        </p>
        <div className="folio-rule mt-2 h-1.5 border-t-[3px] border-b border-(--color-ink)" />
      </div>
    </div>
  );
}

export function Entry({
  id,
  t,
  className = "",
  /** For entries whose content is naturally short: hold a full viewport and center it, so the next entry never bleeds into view. Long entries stay at natural height. */
  center = false,
  bleed = false,
  children,
}: {
  id: EntryId;
  t?: Messages;
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

  const folio = id !== "hero" && t ? <Folio id={id} t={t} /> : null;
  const last = ENTRIES[ENTRIES.length - 1] === id;
  const centering = center ? "flex min-h-dvh flex-col justify-center" : "";
  const spacing = bleed ? "" : folio ? "entry-body px-6 sm:px-8" : "entry px-6 sm:px-8";

  return (
    <>
      <div id={id} aria-hidden="true" className="h-0" />
      <section ref={ref} className={`sheet ${last ? "" : "sheet-stack"} ${folio ? "sheet-edge" : ""}`}>
        <div className="sheet-body">
          {folio}
          <div className={`${spacing} ${centering} ${className}`}>{children}</div>
        </div>
      </section>
    </>
  );
}
