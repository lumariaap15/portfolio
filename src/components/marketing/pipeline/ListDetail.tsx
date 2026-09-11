"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function ListDetail<T extends { id: string }>({
  items,
  renderRow,
  renderDetail,
  ariaLabel,
}: {
  items: T[];
  renderRow: (item: T, isSelected: boolean) => React.ReactNode;
  renderDetail: (item: T) => React.ReactNode;
  ariaLabel: string;
}) {
  const [selectedId, setSelectedId] = useState(items[0]?.id);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];
  const reduceMotion = useReducedMotion();
  const groupId = useId();

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] md:gap-10">
      <div role="tablist" aria-label={ariaLabel} className="flex flex-col">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${groupId}-tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls={`${groupId}-panel-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={`cursor-pointer border-t border-(--color-line) px-1 py-4 text-left transition-colors first:border-t-0 ${
                isSelected ? "font-medium text-(--color-ink)" : "text-(--color-muted) hover:text-(--color-ink)"
              }`}
            >
              {renderRow(item, isSelected)}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={selected ? `${groupId}-panel-${selected.id}` : undefined}
        aria-labelledby={selected ? `${groupId}-tab-${selected.id}` : undefined}
        className="min-w-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          {selected && (
            <motion.div
              key={selected.id}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderDetail(selected)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
