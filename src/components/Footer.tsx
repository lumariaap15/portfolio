import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-32 w-full max-w-5xl border-t border-(--color-line) px-6 py-16 md:px-8"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">
            Let&apos;s work together
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block font-display text-3xl text-(--color-paper) transition-colors hover:text-(--color-accent) md:text-4xl"
          >
            {site.email}
          </a>
        </div>
        <div className="flex gap-6 font-mono text-sm text-(--color-muted)">
          <a href={site.links.github} className="transition-colors hover:text-(--color-paper)">
            GitHub
          </a>
          <a href={site.links.linkedin} className="transition-colors hover:text-(--color-paper)">
            LinkedIn
          </a>
          <a href={site.links.cv} className="transition-colors hover:text-(--color-paper)">
            CV
          </a>
        </div>
      </div>
      <p className="mt-12 font-mono text-xs text-(--color-faint)">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </p>
    </footer>
  );
}
