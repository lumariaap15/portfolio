import type { Metadata } from "next";
import Link from "next/link";
import { blog } from "#content";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Writing — Luisa Alzate",
};

export default function BlogPage() {
  const posts = blog.filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-(--color-faint)">Writing</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-(--color-paper)">Thoughts</h1>
      </Reveal>

      {posts.length === 0 ? (
        <Reveal>
          <div className="mt-14 rounded-xl border border-dashed border-(--color-line) bg-(--color-ink-soft) p-12 text-center">
            <p className="font-display text-2xl text-(--color-paper)">Coming soon.</p>
            <p className="mt-3 text-(--color-muted)">
              Notes on AI engineering, fintech, and teaching code. To publish a post, drop an
              <code className="mx-1 font-mono text-(--color-accent)">.mdx</code>
              file in
              <code className="mx-1 font-mono text-(--color-accent)">content/blog/</code>.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block font-mono text-sm text-(--color-accent) hover:underline"
            >
              ← Back home
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 flex flex-col">
          {posts.map((post) => (
            <Reveal key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-t border-(--color-line) py-8"
              >
                <p className="font-mono text-xs text-(--color-faint)">{post.date}</p>
                <h2 className="mt-2 font-display text-2xl text-(--color-paper) group-hover:text-(--color-accent)">
                  {post.title}
                </h2>
                <p className="mt-2 text-(--color-muted)">{post.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
