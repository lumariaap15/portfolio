// Placeholder para demos AI vivas dentro de un proyecto (MDX).
// Cuando tengas una demo real (RAG, agente, etc.), reemplazá el interior
// por tu componente interactivo — el slot ya está cableado al render de MDX.
export function DemoSlot({ label = "Demo coming soon" }: { label?: string }) {
  return (
    <div className="my-8 flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-(--color-line) bg-(--color-ink-soft)">
      <span className="font-mono text-sm text-(--color-faint)">{label}</span>
    </div>
  );
}
