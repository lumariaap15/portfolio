import type { Project } from "#content";
import type { Messages } from "@/i18n/getMessages";
import { Entry } from "./pipeline/Entry";
import { TechLogo } from "./pipeline/TechLogo";

export function SelectedWork({ t, caseStudies }: { t: Messages; caseStudies: Project[] }) {
  return (
    <Entry id="work">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="font-bold text-3xl tracking-tight text-(--color-ink) sm:text-4xl">{t.work.title}</h2>
        <p className="mt-3 max-w-xl leading-relaxed text-(--color-muted)">{t.work.intro}</p>

        <div className="mt-10 flex flex-col">
          {caseStudies.map((project) => (
            <div key={project.slug} className="border-t border-(--color-line) py-8 first:border-t-0 first:pt-0">
              <h3 className="font-bold text-xl text-(--color-ink) sm:text-2xl">
                {project.title}
                <span className="text-(--color-faint)"> · {t.work.categoryLabels[project.category]}</span>
              </h3>

              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-(--color-faint)">
                    {t.work.problemLabel}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-(--color-muted)">{project.problem}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-(--color-faint)">
                    {t.work.approachLabel}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-(--color-muted)">{project.approach}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-(--color-faint)">
                    {t.work.outcomeLabel}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-(--color-muted)">{project.outcome}</dd>
                </div>
              </dl>

              <ul className="mt-5 flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <li key={tech} className="flex items-center gap-1.5 text-xs text-(--color-faint)">
                    <TechLogo name={tech} className="h-3.5 w-3.5 text-(--color-ink)" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Entry>
  );
}
