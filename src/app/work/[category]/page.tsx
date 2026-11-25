import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGrid } from "@/components/project-grid";
import { WorkHeader } from "@/components/work-header";
import { getCategories, getCategory, getProjectsByCategory } from "@/lib/content";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[category]">): Promise<Metadata> {
  const category = await getCategory((await params).category);
  if (!category) return {};
  return {
    title: `${category.title} projects`,
    description: category.intro,
    openGraph: { images: [{ url: category.coverImage.src, alt: category.coverImage.alt }] },
  };
}

export default async function CategoryPage({ params }: PageProps<"/work/[category]">) {
  const { category: slug } = await params;
  const [category, projects, categories] = await Promise.all([
    getCategory(slug),
    getProjectsByCategory(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  return (
    <>
      <WorkHeader
        title={category.title}
        intro={category.intro}
        count={projects.length}
        categories={categories}
        active={category.slug}
      />
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} showCategory={false} />
      ) : (
        <p className="px-page py-32 text-center text-stone">New projects in this category are coming soon.</p>
      )}
    </>
  );
}
