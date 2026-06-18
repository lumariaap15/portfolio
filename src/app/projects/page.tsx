import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "#content";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software engineering and AI projects by Luisa Alzate.",
};

export default function ProjectsPage() {
  const byEn = projects.filter((p) => p.locale === "en");
  const seen = new Set(byEn.map((p) => p.slug));
  const list = [...byEn, ...projects.filter((p) => p.locale === "es" && !seen.has(p.slug))];
  const sorted = [...list].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <section className="py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">
          Selected work
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-(--color-paper)">
          Projects
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-6">
        {sorted.map((project) => (
          <Reveal key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="group block rounded-xl border border-(--color-line) bg-(--color-ink-soft) p-8 transition-colors hover:border-(--color-accent)"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl text-(--color-paper) transition-colors group-hover:text-(--color-accent)">
                  {project.title}
                </h2>
                <span className="font-mono text-xs text-(--color-faint)">{project.status}</span>
              </div>
              <p className="mt-3 max-w-2xl leading-relaxed text-(--color-muted)">
                {project.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <li key={tech} className="font-mono text-xs text-(--color-faint)">
                    {tech}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
