import Link from "next/link";
import { ViewTransition } from "react";
import type { ProjectWithCategory } from "@/lib/content";
import { coverTransitionName, routes } from "@/lib/routes";
import { Photo } from "./photo";
import { Reveal } from "./reveal";

const ASPECT = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  wide: "aspect-[16/9]",
} as const;

type Props = {
  project: ProjectWithCategory;
  aspect?: keyof typeof ASPECT;
  sizes: string;
  index?: number;
  showCategory?: boolean;
  delay?: number;
};

export function ProjectCard({ project, aspect = "portrait", sizes, index, showCategory = true, delay = 0 }: Props) {
  return (
    <Link href={routes.project(project)} className="group block">
      <Reveal variant="image" delay={delay}>
        <div className={`relative overflow-hidden bg-paper-deep ${ASPECT[aspect]}`}>
          <ViewTransition name={coverTransitionName(project.slug)} share="morph" default="none">
            <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
              <Photo image={project.coverImage} fill sizes={sizes} />
            </div>
          </ViewTransition>
        </div>
      </Reveal>

      <Reveal delay={delay + 120} className="mt-5 flex items-baseline justify-between gap-6">
        <div>
          {showCategory && <p className="label mb-2 text-stone">{project.category.title}</p>}
          <h3 className="font-serif text-2xl leading-tight md:text-[1.75rem]">
            <span className="link-underline group-hover:bg-[length:100%_1px]">{project.title}</span>
          </h3>
        </div>
        <p className="label shrink-0 text-stone tabular-nums">
          {index !== undefined && <span className="mr-3">{String(index + 1).padStart(2, "0")}</span>}
          {project.city} — {project.year}
        </p>
      </Reveal>
    </Link>
  );
}
