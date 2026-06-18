"use client";

import Link from "next/link";
import { useT, useLocale } from "@/i18n/LocaleProvider";
import { pick } from "@/i18n/pick";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { MDXContent } from "@/components/MDXContent";
import type { Experience, Skill, Learning, Project, Credential } from "#content";

const ACCENT_GRADIENT = "linear-gradient(115deg, #ffac41 0%, #ff1e56 100%)";

export function HomeSections({
  experience,
  skills,
  learning,
  projects,
  credentials,
}: {
  experience: Experience[];
  skills: Skill[];
  learning: Learning[];
  projects: Project[];
  credentials: Credential[];
}) {
  const t = useT();
  const { locale } = useLocale();
  const showProjects = false;

  // pick locale variant of rich-body collections, fall back to en
  const byLocale = <T extends { slug: string; locale: string }>(items: T[]) => {
    const wanted = items.filter((i) => i.locale === locale);
    const seen = new Set(wanted.map((i) => i.slug));
    const fallback = items.filter((i) => i.locale === "en" && !seen.has(i.slug));
    return [...wanted, ...fallback];
  };

  const sortedExp = byLocale(experience).sort((a, b) => b.order - a.order);
  const coreSkills = skills.filter((s) => s.tier === "core").sort((a, b) => a.order - b.order);
  const workingSkills = skills.find((s) => s.tier === "working");
  const activeLearning = learning.filter((l) => l.active).sort((a, b) => a.order - b.order);
  const featured = byLocale(projects).filter((p) => p.featured);
  const hobbies = site.hobbies[locale];

  const education = credentials.filter((c) => c.type === "education").sort((a, b) => a.order - b.order);
  const certs = credentials.filter((c) => c.type === "certification").sort((a, b) => a.order - b.order);

  return (
    <>
      {/* HERO */}
      <section className="relative py-16 lg:py-24">
        <div className="relative z-10">
          <Reveal>
            <p className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-(--color-accent)">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundImage: ACCENT_GRADIENT }} />
              {t.hero.pre}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight text-(--color-paper) md:text-6xl">
              {t.hero.lineA}{" "}
              <span
                style={{ backgroundImage: ACCENT_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              >
                {t.hero.keyword}
              </span>{" "}
              {t.hero.lineB}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-(--color-muted)">
              {site.yearsExperience} {t.hero.blurb} {site.location}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.28}>
          <dl className="relative z-10 mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {site.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-ink-soft) p-6 transition-transform hover:-translate-y-1"
              >
                <span
                  className="absolute right-0 top-0 h-16 w-16 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-50"
                  style={{ background: i % 2 === 0 ? "#ffac41" : "#ff1e56" }}
                  aria-hidden
                />
                <dt
                  className="relative font-display text-4xl md:text-5xl"
                  style={{ backgroundImage: ACCENT_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
                >
                  {stat.value}
                </dt>
                <dd className="relative mt-2 font-mono text-xs uppercase tracking-wider text-(--color-faint)">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow={t.sections.experienceEyebrow} title={t.sections.experienceTitle}>
        <div className="flex flex-col">
          {sortedExp.map((job) => (
            <Reveal key={job.slug}>
              <article className="grid grid-cols-1 gap-4 border-t border-(--color-line) py-10 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="font-mono text-xs text-(--color-faint)">{job.start} — {job.end}</p>
                  {pick(job, "context", locale) && (
                    <p className="mt-2 text-xs text-(--color-faint)">{pick(job, "context", locale)}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-(--color-paper)">{pick(job, "role", locale)}</h3>
                  <p className="mt-1 text-(--color-accent)">{job.company}</p>
                  {pick(job, "summary", locale) && (
                    <p className="mt-4 leading-relaxed text-(--color-muted)">{pick(job, "summary", locale)}</p>
                  )}
                  <div className="prose-mdx mt-4 text-sm leading-relaxed text-(--color-muted)">
                    <MDXContent code={job.content} />
                  </div>
                  {job.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li key={tech} className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)">{tech}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow={t.sections.skillsEyebrow} title={t.sections.skillsTitle}>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {coreSkills.map((group) => (
            <Reveal key={group.group}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">{pick(group, "group", locale)}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-baseline justify-between border-b border-(--color-line) pb-2">
                      <span className="text-(--color-paper)">{item.name}</span>
                      {item.years && <span className="font-mono text-xs text-(--color-faint)">{item.years}y</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        {workingSkills && (
          <Reveal>
            <div className="mt-12 border-t border-(--color-line) pt-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">{t.sections.workingKnowledge}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {workingSkills.items.map((item) => (
                  <li key={item.name} className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)">{item.name}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </Section>

      {/* LEARNING */}
      <Section id="learning" eyebrow={t.sections.learningEyebrow} title={t.sections.learningTitle}>
        <div className="flex flex-col">
          {activeLearning.map((item) => (
            <Reveal key={item.topic}>
              <div className="grid grid-cols-1 gap-2 border-t border-(--color-line) py-6 md:grid-cols-[200px_1fr]">
                <div>
                  <h3 className="text-(--color-paper)">{item.topic}</h3>
                  {pick(item, "category", locale) && <p className="mt-1 font-mono text-xs text-(--color-faint)">{pick(item, "category", locale)}</p>}
                </div>
                <p className="leading-relaxed text-(--color-muted)">{pick(item, "note", locale)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOBBIES (hardcoded) */}
      <Reveal>
        <section className="relative overflow-hidden rounded-2xl border border-(--color-line) bg-(--color-ink-soft) p-8">
          <div className="glow glow-amber -bottom-10 -right-10 h-40 w-40" aria-hidden />
          <p className="relative text-(--color-muted)">{site.funFact[locale]}</p>
          <ul className="relative mt-5 flex flex-wrap gap-3">
            {hobbies.map((h) => (
              <li
                key={h.text}
                className="flex items-center gap-2 rounded-full border border-(--color-line) bg-(--color-ink) px-4 py-2 text-sm text-(--color-paper) transition-all hover:-translate-y-0.5 hover:border-(--color-accent-2)"
              >
                <span className="text-lg">{h.emoji}</span>
                {h.text}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* EDUCATION & CERTIFICATIONS */}
      <Section id="education" eyebrow={t.sections.educationEyebrow} title={t.sections.educationTitle}>
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {[
            { label: t.sections.education, items: education },
            { label: t.sections.certifications, items: certs },
          ].map((col) => (
            <div key={col.label}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">{col.label}</h3>
              <div className="mt-4 flex flex-col">
                {col.items.map((c, i) => (
                  <Reveal key={`${c.title}-${i}`}>
                    <div className="border-t border-(--color-line) py-5">
                      <h4 className="text-(--color-paper)">{c.title}</h4>
                      <p className="mt-1 text-sm text-(--color-muted)">{c.institution}</p>
                      <p className="mt-1 font-mono text-xs text-(--color-faint)">
                        {[c.start, c.end].filter(Boolean).join(" — ")}
                      </p>
                      {pick(c, "note", locale) && <p className="mt-2 text-sm text-(--color-muted)">{pick(c, "note", locale)}</p>}
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-xs text-(--color-accent) hover:underline">
                          ↗ verify
                        </a>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      {featured.length > 0 && showProjects && (
        <Section id="projects" eyebrow={t.sections.projectsEyebrow} title={t.sections.projectsTitle}>
          <div className="grid grid-cols-1 gap-6">
            {featured.map((project) => (
              <Reveal key={project.slug}>
                <Link href={`/projects/${project.slug}`} className="ring-gradient group relative block overflow-hidden rounded-2xl p-8 transition-transform hover:-translate-y-1">
                  <span className="glow glow-pink -right-10 -top-10 h-32 w-32 !opacity-0 transition-opacity duration-500 group-hover:!opacity-20" aria-hidden />
                  <div className="relative flex items-center justify-between">
                    <h3 className="font-display text-2xl text-(--color-paper) transition-colors group-hover:text-(--color-accent)">{project.title}</h3>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-(--color-line) text-(--color-muted) transition-all group-hover:border-(--color-accent) group-hover:text-(--color-accent)">↗</span>
                  </div>
                  <p className="relative mt-3 max-w-2xl leading-relaxed text-(--color-muted)">{project.description}</p>
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (<li key={tech} className="rounded-full border border-(--color-line) px-2.5 py-0.5 font-mono text-xs text-(--color-faint)">{tech}</li>))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/projects" className="mt-8 inline-block font-mono text-sm text-(--color-accent) hover:underline">{t.sections.viewAllProjects}</Link>
          </Reveal>
        </Section>
      )}
    </>
  );
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <Reveal>
        <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-(--color-faint)">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-accent" />
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl tracking-tight text-(--color-paper) md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
