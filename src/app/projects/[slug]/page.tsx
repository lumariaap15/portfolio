import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "#content";
import { MDXContent } from "@/components/MDXContent";

export function generateStaticParams() {
  return [...new Set(projects.map((p) => p.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.locale === "en")
    ?? projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.locale === "en")
    ?? projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="py-20">
      <Link href="/projects" className="font-mono text-sm text-(--color-muted) hover:text-(--color-paper)">
        ← Projects
      </Link>

      <header className="mt-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-wider text-(--color-accent)">
            {project.status}
          </span>
        </div>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-(--color-paper)">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-(--color-muted)">
          {project.description}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-(--color-line) px-3 py-1 font-mono text-xs text-(--color-muted)"
            >
              {tech}
            </li>
          ))}
        </ul>
        {(project.repo || project.demo) && (
          <div className="mt-6 flex gap-4 font-mono text-sm">
            {project.demo && (
              <a href={project.demo} className="text-(--color-accent) hover:underline">
                Live demo →
              </a>
            )}
            {project.repo && (
              <a href={project.repo} className="text-(--color-accent) hover:underline">
                Repository →
              </a>
            )}
          </div>
        )}
      </header>

      <div className="mt-12 max-w-2xl leading-relaxed text-(--color-paper)/90">
        <MDXContent code={project.content} />
      </div>
    </article>
  );
}
