import type { MetadataRoute } from "next";
import { projects, blog } from "#content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = [
    ...new Set(projects.map((p) => p.slug)),
  ].map((slug) => ({
    url: `${base}/projects/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blog
    .filter((p) => p.published)
    .map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
