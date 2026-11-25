import type { ProjectWithCategory } from "@/lib/content";
import { ProjectCard } from "./project-card";

/**
 * Two-column grid with a staggered rhythm: the right column is pushed down and the
 * aspect ratios alternate, which keeps a long list of projects from feeling like a catalogue.
 */
export function ProjectGrid({
  projects,
  showCategory = true,
}: {
  projects: ProjectWithCategory[];
  showCategory?: boolean;
}) {
  return (
    <ul className="px-page grid gap-x-[var(--gutter)] gap-y-20 py-16 md:grid-cols-2 md:gap-y-28 md:py-24">
      {projects.map((project, i) => {
        const right = i % 2 === 1;
        const aspect = i % 4 === 0 || i % 4 === 3 ? "portrait" : "landscape";
        return (
          <li key={project.slug} className={right ? "md:mt-48" : ""}>
            <ProjectCard
              project={project}
              aspect={aspect}
              index={i}
              showCategory={showCategory}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </li>
        );
      })}
    </ul>
  );
}
