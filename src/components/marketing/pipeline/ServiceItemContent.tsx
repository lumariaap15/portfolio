import { Typewriter } from "./Typewriter";
import type { Messages } from "@/i18n/getMessages";

export function ServiceItemContent({ service, active = true }: { service: Messages["services"]["items"][number]; active?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="text-sm tabular-nums text-(--color-faint)">{service.number}</span>
        <span className="text-sm text-(--color-faint)">{service.label}</span>
      </div>
      <p className="mt-4 max-w-2xl text-4xl font-bold leading-[1.05] text-(--color-accent) sm:text-6xl">
        <Typewriter text={service.headline} active={active} />
      </p>
      <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:gap-x-10" role="list">
        {service.tags.map((tag) => (
          <li key={tag} className="text-base font-bold leading-snug text-(--color-ink) sm:text-lg">
            <span className="underline decoration-(--color-accent)/35 decoration-2 underline-offset-4 [text-decoration-skip-ink:auto]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8 max-w-xl space-y-4 leading-relaxed text-(--color-muted)">
        {service.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
