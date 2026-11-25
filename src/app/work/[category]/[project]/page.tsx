import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition, type CSSProperties } from "react";
import { Photo } from "@/components/photo";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/reveal";
import { getProject, getProjects } from "@/lib/content";
import { coverTransitionName, routes } from "@/lib/routes";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ category: p.categorySlug, project: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[category]/[project]">): Promise<Metadata> {
  const { category, project: slug } = await params;
  const result = await getProject(category, slug);
  if (!result) return {};
  const { project } = result;
  return {
    title: project.title,
    description: `${project.type} in ${project.city}, ${project.country} (${project.year}). ${project.description[0]}`,
    openGraph: {
      type: "article",
      images: [{ url: project.coverImage.src, width: project.coverImage.width, height: project.coverImage.height, alt: project.coverImage.alt }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[category]/[project]">) {
  const { category, project: slug } = await params;
  const result = await getProject(category, slug);
  if (!result) notFound();
  const { project, next } = result;

  // The cover already opens the page, so don't repeat it in the gallery.
  const gallery = project.gallery.filter((img) => img.src !== project.coverImage.src);

  const facts = [
    { label: "Location", value: `${project.city}, ${project.country}` },
    { label: "Year", value: String(project.year) },
    { label: "Type", value: project.type },
    { label: "Category", value: project.category.title, href: routes.category(project.categorySlug) },
    project.collaboration && { label: "Collaboration", value: project.collaboration },
    project.photoCredit && { label: "Photography", value: project.photoCredit },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <article>
      {/* ---------- Title ---------- */}
      <header className="px-page pt-[calc(var(--header-h)+3rem)] pb-12 md:pt-[calc(var(--header-h)+6rem)] md:pb-16">
        <nav aria-label="Breadcrumb" className="label text-stone">
          <Link href={routes.work()} className="link-underline hover:text-ink">
            Work
          </Link>
          <span className="mx-3">/</span>
          <Link href={routes.category(project.categorySlug)} className="link-underline hover:text-ink">
            {project.category.title}
          </Link>
        </nav>
        <h1 className="display-xl mt-8 overflow-hidden pb-[0.08em]">
          <span className="rise" style={{ "--rise-delay": "100ms" } as CSSProperties}>
            {project.title}
          </span>
        </h1>
        <p className="label rise mt-6 text-stone" style={{ "--rise-delay": "250ms" } as CSSProperties}>
          {project.type} — {project.city} — {project.year}
        </p>
      </header>

      {/* ---------- Cover (morphs from the card that linked here) ---------- */}
      <div className="px-page">
        <div className="relative h-[70svh] overflow-hidden bg-paper-deep md:h-[88svh]">
          <ViewTransition name={coverTransitionName(project.slug)} share="morph" default="none">
            <div className="absolute inset-0">
              <Photo image={project.coverImage} fill sizes="100vw" preload />
            </div>
          </ViewTransition>
        </div>
      </div>

      {/* ---------- Story & facts ---------- */}
      <section className="px-page grid gap-16 py-24 md:grid-cols-12 md:py-36">
        <Reveal className="md:col-span-4">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-4">
                <dt className="label pt-0.5 text-stone">{f.label}</dt>
                <dd className="text-sm leading-relaxed">
                  {f.href ? (
                    <Link href={f.href} className="link-underline">
                      {f.value}
                    </Link>
                  ) : (
                    f.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="lede text-balance">{project.description[0]}</p>
          </Reveal>
          {project.description.slice(1).map((paragraph, i) => (
            <Reveal key={i} delay={120} className="mt-8 max-w-[60ch] md:ml-[16.66%]">
              <p className="leading-[1.8] text-ink-soft">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      {gallery.length > 0 && (
        <section className="px-page pb-28 md:pb-40" aria-label="Gallery">
          <ProjectGallery images={gallery} title={project.title} />
        </section>
      )}

      {/* ---------- Next project ---------- */}
      {next.slug !== project.slug && (
        <Link
          href={routes.project(next)}
          className="group relative block h-[70svh] min-h-[28rem] overflow-hidden text-paper"
          aria-label={`Next project: ${next.title}`}
        >
          <div className="absolute inset-0 transition-transform duration-[2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
            <Photo image={next.coverImage} fill sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-ink/45 transition-colors duration-700 group-hover:bg-ink/30" />
          <div className="px-page relative flex h-full flex-col items-center justify-center text-center">
            <p className="label text-paper/75">Next project</p>
            <p className="display-lg mt-6">{next.title}</p>
            <p className="label mt-6 text-paper/75">
              {next.city} — {next.year}
            </p>
          </div>
        </Link>
      )}
    </article>
  );
}
