import { defineConfig, defineCollection, s } from "velite";

// ── Experiencia laboral (lo protagónico) ─────────────────────────────
const experience = defineCollection({
  name: "Experience",
  pattern: "experience/**/*.mdx",
  schema: s
    .object({
      company: s.string(),
      role: s.string(),
      location: s.string().optional(),
      context: s.string().optional(), // ej. "Fintech · Puerto Rico / US"
      start: s.string(), // "Aug 2024"
      end: s.string().default("Present"),
      order: s.number().default(0), // para ordenar manualmente (mayor = más reciente)
      stack: s.array(s.string()).default([]),
      summary: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, slug: data.company.toLowerCase().replace(/\s+/g, "-") })),
});

// ── Proyectos (pocos por ahora, crecerá) ─────────────────────────────
const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      stack: s.array(s.string()).default([]),
      status: s.enum(["en-progreso", "completado", "concepto"]).default("en-progreso"),
      featured: s.boolean().default(false),
      repo: s.string().url().optional(),
      demo: s.string().url().optional(),
      date: s.isodate().optional(),
      cover: s.string().optional(),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, slug: data.title.toLowerCase().replace(/\s+/g, "-") })),
});

// ── Aprendiendo ahora (señal de crecimiento, clave para AI eng) ──────
const learning = defineCollection({
  name: "Learning",
  pattern: "learning/**/*.mdx",
  schema: s.object({
    topic: s.string(),
    category: s.string().optional(), // "AI Engineering", "Backend", etc.
    note: s.string(), // por qué / qué estás haciendo con esto
    link: s.string().url().optional(),
    active: s.boolean().default(true),
    order: s.number().default(0),
  }),
});

// ── Skills con años de experiencia (dato editorial, no barritas) ─────
const skills = defineCollection({
  name: "Skill",
  pattern: "skills/**/*.mdx",
  schema: s.object({
    group: s.string(), // "Languages", "Frontend", "Backend"...
    tier: s.enum(["core", "working"]).default("core"),
    items: s.array(
      s.object({
        name: s.string(),
        years: s.number().optional(),
      })
    ),
    order: s.number().default(0),
  }),
});

// ── Blog (vacío por ahora — preparado para next steps) ───────────────
const blog = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string(),
      date: s.isodate(),
      published: s.boolean().default(true),
      content: s.mdx(),
    })
    .transform((data) => ({ ...data, slug: data.title.toLowerCase().replace(/\s+/g, "-") })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { experience, projects, learning, skills, blog },
});
