import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";

export function Bio({ t }: { t: Messages }) {
  return (
    <Entry id="about">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-(--color-ink) sm:text-4xl">{t.nav.about}</h2>
        <p className="mt-6 max-w-xl leading-relaxed text-(--color-muted)">{t.about.body}</p>
      </div>
    </Entry>
  );
}
