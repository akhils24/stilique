/**
 * The only module pages may use to read content.
 *
 * Today it reads the local seed data. When Sanity is connected, each function's body
 * becomes a GROQ query (tagged with `cacheTag` so a Sanity webhook can revalidate),
 * and nothing outside this file needs to change.
 */
import { cacheLife } from "next/cache";
import { categories, projects, siteSettings } from "@/content/seed";
import type { Category, ProjectWithCategory, SiteSettings } from "./types";

export type * from "./types";

function byOrder<T extends { order: number }>(a: T, b: T) {
  return a.order - b.order;
}

function withCategory(list: typeof projects): ProjectWithCategory[] {
  return list.map((p) => {
    const category = categories.find((c) => c.slug === p.categorySlug);
    if (!category) throw new Error(`Project "${p.slug}" has unknown category "${p.categorySlug}"`);
    return { ...p, category };
  });
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("max");
  return siteSettings;
}

/** Categories in display order, each with its project count. */
export async function getCategories(): Promise<(Category & { projectCount: number })[]> {
  "use cache";
  cacheLife("max");
  return [...categories].sort(byOrder).map((c) => ({
    ...c,
    projectCount: projects.filter((p) => p.categorySlug === c.slug).length,
  }));
}

export async function getCategory(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("max");
  return categories.find((c) => c.slug === slug) ?? null;
}

/** All projects, grouped by category order, then by project order. */
export async function getProjects(): Promise<ProjectWithCategory[]> {
  "use cache";
  cacheLife("max");
  return withCategory(projects).sort(
    (a, b) => a.category.order - b.category.order || byOrder(a, b),
  );
}

export async function getProjectsByCategory(categorySlug: string): Promise<ProjectWithCategory[]> {
  "use cache";
  cacheLife("max");
  return (await getProjects()).filter((p) => p.categorySlug === categorySlug);
}

export async function getFeaturedProjects(): Promise<ProjectWithCategory[]> {
  "use cache";
  cacheLife("max");
  // Newest first on the homepage.
  return (await getProjects()).filter((p) => p.featured).sort((a, b) => b.year - a.year);
}

/** A project plus its neighbours within the same category, for next/previous links. */
export async function getProject(categorySlug: string, slug: string) {
  "use cache";
  cacheLife("max");
  const list = await getProjectsByCategory(categorySlug);
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  // Wrap around across all projects so the last project in a category still leads somewhere.
  const all = await getProjects();
  const globalIndex = all.findIndex((p) => p.slug === slug);
  const next = all[(globalIndex + 1) % all.length];
  const previous = all[(globalIndex - 1 + all.length) % all.length];

  return { project: list[index], next, previous };
}
