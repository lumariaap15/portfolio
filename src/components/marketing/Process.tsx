import { site } from "@/lib/site";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";

type Step = Messages["process"]["steps"][number];
type Way = Messages["process"]["ways"][number];

function Compass({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 64 72" aria-hidden="true" className="h-16 w-14 text-(--color-ink)">
      <text x="32" y="9" textAnchor="middle" className="font-news" fontSize="10" fontWeight="700" fill="currentColor">
        {label}
      </text>
      <circle cx="32" cy="42" r="21" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="32" cy="42" r="17" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
      <path d="M32 14 L36 42 L32 70 L28 42 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M32 14 L36 42 L28 42 Z" fill="currentColor" />
      <path d="M4 42 L32 38 L60 42 L32 46 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M17 27 L33 41 L47 57 M47 27 L31 41 L17 57" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

function Deliverable({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm leading-snug text-(--color-ink)">
      <svg viewBox="0 0 16 20" aria-hidden="true" className="mt-0.5 h-4 w-3.5 shrink-0 text-(--color-ink)">
        <path d="M1 1h9l5 5v13H1z M10 1v5h5" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M4 10h8M4 13h8M4 16h5" stroke="currentColor" strokeWidth="0.9" />
      </svg>
      {children}
    </li>
  );
}

function RouteStep({ step, index, total, t }: { step: Step; index: number; total: number; t: Messages }) {
  const last = index === total - 1;
  const wave = index % 2 === 0 ? "M20 0 C 38 30, 2 70, 20 100" : "M20 0 C 2 30, 38 70, 20 100";

  return (
    <li className="relative grid grid-cols-[2.75rem_1fr] gap-x-4 pb-10 last:pb-0 sm:gap-x-6">
      <div className="flex justify-center">
        <span
          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border bg-(--color-paper) font-news text-lg font-bold ${
            last
              ? "border-(--color-accent) text-(--color-accent) outline-1 outline-offset-2 outline-(--color-accent)"
              : "border-(--color-ink) text-(--color-ink)"
          }`}
        >
          {step.number}
        </span>
        {!last && (
          <svg
            aria-hidden="true"
            viewBox="0 0 40 100"
            preserveAspectRatio="none"
            className="absolute left-[1.375rem] top-11 h-[calc(100%-2.75rem)] w-10 -translate-x-1/2 text-(--color-ink)"
          >
            <path
              d={wave}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="5 5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 pt-1.5 sm:grid-cols-[1fr_14rem] sm:gap-8">
        <div>
          <p className="flex flex-wrap items-baseline gap-x-3 text-[11px] uppercase tracking-[0.22em] text-(--color-muted)">
            {step.label}
            {index === 0 && (
              <span className="inline-flex items-center gap-1 font-news text-sm normal-case italic tracking-normal text-(--color-accent)">
                <svg viewBox="0 0 20 12" aria-hidden="true" className="h-3 w-5">
                  <path d="M19 9 C 13 11, 7 9, 2 4 M2 4 l1 4.5 M2 4 l4.5 -0.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                {t.process.startLabel}
              </span>
            )}
            {last && (
              <span className="font-news text-sm normal-case italic tracking-normal text-(--color-accent)">
                {t.process.endLabel}
              </span>
            )}
          </p>
          <h3 className="mt-1 text-xl font-bold text-(--color-ink) sm:text-2xl">{step.title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-(--color-muted)">{step.body}</p>
          {step.cta && (
            <a
              href={site.bookingUrl}
              className="mt-3 inline-flex min-h-11 items-center text-sm text-(--color-accent) underline underline-offset-4 transition-colors hover:text-(--color-accent-soft)"
            >
              {t.cta.bookCall}
            </a>
          )}
        </div>

        <div className="border-t border-dashed border-(--color-ink)/40 pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
          <p className="text-[11px] uppercase tracking-wider text-(--color-muted)">{t.process.deliverablesLabel}</p>
          <ul className="mt-2 space-y-1.5">
            {step.deliverables.map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function WayColumn({ way }: { way: Way }) {
  return (
    <div className="flex flex-col">
      <h4 className="headline text-2xl font-bold text-(--color-ink)">{way.title}</h4>
      <p className="mt-3 text-sm leading-relaxed text-(--color-muted)">{way.body}</p>
      <p className="mt-6 text-[11px] uppercase tracking-wider text-(--color-muted)">{way.clientsLabel}</p>
      <ul className="mt-2">
        {way.clients.map((client) => (
          <li
            key={client.name}
            className="flex items-baseline justify-between gap-4 border-t border-(--color-line) py-2 text-sm first:border-t-0"
          >
            <span className="text-(--color-ink)">{client.name}</span>
            {client.length && <span className="shrink-0 text-xs tabular-nums text-(--color-muted)">{client.length}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Process({ t }: { t: Messages }) {
  const steps = t.process.steps;

  return (
    <Entry id="process" t={t}>
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="ink-in font-bold text-4xl leading-[1.05] text-(--color-ink) sm:text-5xl">{t.process.title}</h2>
            <p className="ink-in ink-in-late mt-3 max-w-xl leading-relaxed text-(--color-muted)">{t.process.subtitle}</p>
          </div>
          <div className="ink-in ink-in-late hidden shrink-0 sm:block">
            <Compass label={t.process.compassLabel} />
          </div>
        </div>

        <div className="map-frame mt-10">
          <div className="border border-(--color-ink) px-4 py-8 sm:px-8 sm:py-10">
            <ol>
              {steps.map((step, index) => (
                <RouteStep key={step.number} step={step} index={index} total={steps.length} t={t} />
              ))}
            </ol>
          </div>
        </div>

        <section className="mt-16 border-t-2 border-(--color-ink) pt-10" aria-labelledby="process-ways">
          <h3 id="process-ways" className="text-2xl font-bold text-(--color-ink) sm:text-3xl">
            {t.process.waysTitle}
          </h3>
          <div className="column-rules mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            {t.process.ways.map((way) => (
              <WayColumn key={way.key} way={way} />
            ))}
          </div>
        </section>
      </div>
    </Entry>
  );
}
