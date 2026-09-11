"use client";

import type { Messages } from "@/i18n/getMessages";
import { useEntryContext } from "./EntryTracker";
import { ENTRIES, type EntryId } from "./entries";

function entryLabel(id: EntryId, t: Messages): string | null {
  switch (id) {
    case "hero":
      return null;
    case "services":
      return t.nav.services;
    case "process":
      return t.nav.process;
    case "work":
      return t.nav.work;
    case "about":
      return t.nav.about;
    case "faq":
      return t.nav.faq;
    case "contact":
      return t.nav.contact;
  }
}

export function EntryIndex({ t }: { t: Messages }) {
  const { activeIndex } = useEntryContext();

  const items = ENTRIES.map((id, idx) => ({ id, idx, label: entryLabel(id, t) })).filter(
    (item): item is { id: EntryId; idx: number; label: string } => item.label !== null
  );

  const current = items.find((item) => item.idx === activeIndex);

  return (
    <>
      {/* Desktop: the full quiet index. */}
      <nav aria-label="Section navigation" className="fixed bottom-6 left-6 z-40 hidden flex-col gap-1 text-sm sm:flex">
        {items.map((item) => {
          const isActive = item.idx === activeIndex;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`cursor-pointer transition-colors ${
                isActive ? "font-bold text-(--color-ink)" : "text-(--color-muted) hover:text-(--color-ink)"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile: just the current entry, to stay quiet on a small screen. */}
      {current && (
        <a
          href={`#${current.id}`}
          aria-label="Section navigation"
          className="fixed bottom-3 left-3 z-40 cursor-pointer rounded border border-(--color-line) bg-(--color-paper) px-2 py-1 text-xs font-bold text-(--color-muted) sm:hidden"
        >
          {current.label}
        </a>
      )}
    </>
  );
}
