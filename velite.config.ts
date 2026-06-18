import { defineConfig, defineCollection, s } from "velite";

// ── Experiencia laboral (lo protagónico) ─────────────────────────────
const experience = defineCollection({
  name: "Experience",
  pattern: "experience/**/*.mdx",
  schema: s
    .object({
      company: s.string(),
      // experience uses per-locale files (.en.mdx / .es.mdx) — role/context/summary
      // hold the language of that file, so no *_es suffix fields are needed here.
      role: s.string(),
      location: s.string().optional(),
      context: s.string().optional(),
      start: s.string(),
      end: s.string().default("Present"),
      order: s.number().default(0),
      stack: s.array(s.string()).default([]),
      summary: s.string().optional(),
      locale: s.enum(["en", "es"]).default("en"),
      content: s.mdx(),
      path: s.path(),
    })
    .transform((data) => ({
      ...data,
      // strip "experience/foo.en" → slug "foo"
      slug: data.path.split("/").pop()!.replace(/\.(en|es)$/, ""),
    })),
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
      locale: s.enum(["en", "es"]).default("en"),
      content: s.mdx(),
      path: s.path(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.split("/").pop()!.replace(/\.(en|es)$/, ""),
    })),
});

// ── Aprendiendo ahora (señal de crecimiento, clave para AI eng) ──────
const learning = defineCollection({
  name: "Learning",
  pattern: "learning/**/*.mdx",
  schema: s.object({
    topic: s.string(),
    category: s.string().optional(), // "AI Engineering", "Backend", etc.
    note: s.string(), // por qué / qué estás haciendo con esto
    note_es: s.string().optional(),
    category_es: s.string().optional(),
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
    group_es: s.string().optional(),
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
      locale: s.enum(["en", "es"]).default("en"),
      content: s.mdx(),
      path: s.path(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.split("/").pop()!.replace(/\.(en|es)$/, ""),
    })),
});

// ── Educación & Certificaciones (administrable) ──────────────────────
const credentials = defineCollection({
  name: "Credential",
  pattern: "credentials/**/*.mdx",
  schema: s.object({
    type: s.enum(["education", "certification"]),
    title: s.string(),
    institution: s.string(),
    start: s.string().optional(),
    end: s.string().optional(),
    url: s.string().url().optional(),
    note: s.string().optional(),
    note_es: s.string().optional(),
    order: s.number().default(0),
  }),
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
  collections: { experience, projects, learning, skills, blog, credentials },
});
