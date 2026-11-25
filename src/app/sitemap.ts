import type { MetadataRoute } from "next";
import { getCategories, getProjects } from "@/lib/content";
import { routes } from "@/lib/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, projects] = await Promise.all([getCategories(), getProjects()]);
  const url = (path: string) => `${SITE_URL}${path}`;
  return [
    { url: url("/"), priority: 1 },
    { url: url(routes.work()), priority: 0.9 },
    ...categories.map((c) => ({ url: url(routes.category(c.slug)), priority: 0.8 })),
    ...projects.map((p) => ({
      url: url(routes.project(p)),
      priority: 0.7,
      images: [url(p.coverImage.src)],
    })),
    { url: url("/studio"), priority: 0.6 },
    { url: url("/contact"), priority: 0.6 },
  ];
}
