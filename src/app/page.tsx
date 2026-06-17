import Link from "next/link";
import { experience, skills, learning, projects } from "#content";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { MDXContent } from "@/components/MDXContent";

export default function Home() {
  const sortedExp = [...experience].sort((a, b) => b.order - a.order);
  const coreSkills = skills.filter((s) => s.tier === "core").sort((a, b) => a.order - b.order);
  const workingSkills = skills.find((s) => s.tier === "working");
  const activeLearning = learning.filter((l) => l.active).sort((a, b) => a.order - b.order);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="flex min-h-[78vh] flex-col justify-center py-20">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-widest text-(--color-accent)">
            {site.role}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] tracking-tight text-(--color-paper) md:text-7xl">
            Building cutting-edge,{" "}
            <span className="text-(--color-accent)">people-centered</span> software.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-(--color-muted)">
            {site.yearsExperience} years across fintech, e-commerce, and enterprise platforms —
            now expanding into AI engineering. Based in {site.location}.
          </p>
        </Reveal>

        {/* Stats estilo Sawad, datos reales */}
        <Reveal delay={0.24}>
          <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-(--color-line) pt-10 sm:grid-cols-3">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-4xl text-(--color-paper)">{stat.value}</dt>
                <dd className="mt-2 font-mono text-xs uppercase tracking-wider text-(--color-faint)">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ───────────── EXPERIENCE ───────────── */}
      <Section id="experience" eyebrow="01 — Experience" title="Where I've worked">
        <div className="flex flex-col">
          {sortedExp.map((job) => (
            <Reveal key={job.slug}>
              <article className="grid grid-cols-1 gap-4 border-t border-(--color-line) py-10 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="font-mono text-xs text-(--color-faint)">
                    {job.start} — {job.end}
                  </p>
                  {job.context && (
                    <p className="mt-2 text-xs text-(--color-faint)">{job.context}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-display text-2xl text-(--color-paper)">{job.role}</h3>
                  <p className="mt-1 text-(--color-accent)">{job.company}</p>
                  {job.summary && (
                    <p className="mt-4 leading-relaxed text-(--color-muted)">{job.summary}</p>
                  )}
                  <div className="prose-mdx mt-4 text-sm leading-relaxed text-(--color-muted)">
                    <MDXContent code={job.content} />
                  </div>
                  {job.stack.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────── SKILLS ───────────── */}
      <Section id="skills" eyebrow="02 — Skills" title="What I work with">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {coreSkills.map((group) => (
            <Reveal key={group.group}>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-accent)">
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-baseline justify-between border-b border-(--color-line) pb-2"
                    >
                      <span className="text-(--color-paper)">{item.name}</span>
                      {item.years && (
                        <span className="font-mono text-xs text-(--color-faint)">
                          {item.years}y
                        </span>
                      )}
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
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">
                Working knowledge · growing
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {workingSkills.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ───────────── LEARNING ───────────── */}
      <Section id="learning" eyebrow="03 — Currently learning" title="Where I'm growing">
        <div className="flex flex-col">
          {activeLearning.map((item) => (
            <Reveal key={item.topic}>
              <div className="grid grid-cols-1 gap-2 border-t border-(--color-line) py-6 md:grid-cols-[200px_1fr]">
                <div>
                  <h3 className="text-(--color-paper)">{item.topic}</h3>
                  {item.category && (
                    <p className="mt-1 font-mono text-xs text-(--color-faint)">{item.category}</p>
                  )}
                </div>
                <p className="leading-relaxed text-(--color-muted)">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ───────────── PROJECTS PREVIEW ───────────── */}
      {featured.length > 0 && (
        <Section id="projects" eyebrow="04 — Selected work" title="Things I'm building">
          <div className="grid grid-cols-1 gap-6">
            {featured.map((project) => (
              <Reveal key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block rounded-xl border border-(--color-line) bg-(--color-ink-soft) p-8 transition-colors hover:border-(--color-accent)"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-(--color-paper) transition-colors group-hover:text-(--color-accent)">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-(--color-faint)">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl leading-relaxed text-(--color-muted)">
                    {project.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs text-(--color-faint)"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/projects"
              className="mt-8 inline-block font-mono text-sm text-(--color-accent) hover:underline"
            >
              View all projects →
            </Link>
          </Reveal>
        </Section>
      )}
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-4xl tracking-tight text-(--color-paper) md:text-5xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
