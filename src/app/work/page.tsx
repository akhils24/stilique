import type { Metadata } from "next";
import Link from "next/link";
import { ProjectGrid } from "@/components/project-grid";
import { Reveal } from "@/components/reveal";
import { WorkHeader } from "@/components/work-header";
import { getCategories, getProjects } from "@/lib/content";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Work",
  description: "Residential, retail, hotel and restaurant projects by Stilique in Italy and Germany.",
};

export default async function WorkPage() {
  const [projects, categories] = await Promise.all([getProjects(), getCategories()]);
  const byYear = [...projects].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  return (
    <>
      <WorkHeader
        title="Work"
        intro="A selection of homes, showrooms, hotels and restaurants, designed between South Tyrol, Lake Garda and Berlin."
        count={projects.length}
        categories={categories}
      />

      <ProjectGrid projects={projects} />

      {/* A compact index of every project, the way architecture studios list their work. */}
      <section className="px-page pt-12 pb-28 md:pb-40" aria-labelledby="index-heading">
        <h2 id="index-heading" className="label border-b border-line pb-6">
          Index
        </h2>
        <ol>
          {byYear.map((p) => (
            <Reveal as="li" key={p.slug}>
              <Link
                href={routes.project(p)}
                className="group grid grid-cols-[3.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-5 transition-colors hover:bg-paper-deep md:grid-cols-[6rem_2fr_1.2fr_1fr_auto] md:px-2"
              >
                <span className="label text-stone tabular-nums">{p.year}</span>
                <span className="font-serif text-xl transition-transform duration-500 group-hover:translate-x-2 md:text-2xl">
                  {p.title}
                </span>
                <span className="hidden text-sm text-ink-soft md:block">{p.type}</span>
                <span className="hidden text-sm text-ink-soft md:block">
                  {p.city}, {p.country}
                </span>
                <span className="label text-stone">{p.category.title}</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
