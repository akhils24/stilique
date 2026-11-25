import Link from "next/link";
import type { CSSProperties } from "react";
import type { Category } from "@/lib/content";
import { routes } from "@/lib/routes";

type Props = {
  title: string;
  intro?: string;
  count: number;
  categories: Category[];
  /** Slug of the current category; undefined on the "all work" page. */
  active?: string;
};

export function WorkHeader({ title, intro, count, categories, active }: Props) {
  const filters: { slug?: string; title: string; href: string }[] = [
    { title: "All", href: routes.work() },
    ...categories.map((c) => ({ slug: c.slug, title: c.title, href: routes.category(c.slug) })),
  ];

  return (
    <header className="px-page pt-[calc(var(--header-h)+4rem)] md:pt-[calc(var(--header-h)+7rem)]">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <h1 className="display-xl overflow-hidden pb-[0.08em] md:col-span-8">
          <span className="rise">{title}</span>
          <sup className="label ml-3 align-top text-stone tabular-nums">
            ({String(count).padStart(2, "0")})
          </sup>
        </h1>
        {intro && (
          <p
            className="rise leading-relaxed text-ink-soft md:col-span-4"
            style={{ "--rise-delay": "200ms" } as CSSProperties}
          >
            {intro}
          </p>
        )}
      </div>

      <nav aria-label="Filter by category" className="mt-14 border-y border-line md:mt-20">
        <ul className="-mx-3 flex gap-1 overflow-x-auto py-4 [scrollbar-width:none]">
          {filters.map((f) => {
            const current = f.slug === active;
            return (
              <li key={f.href} className="shrink-0">
                <Link
                  href={f.href}
                  aria-current={current ? "page" : undefined}
                  className={`label block px-3 py-2 transition-colors ${
                    current ? "text-ink" : "text-stone hover:text-ink"
                  }`}
                >
                  <span className={current ? "border-b border-ink pb-1" : ""}>{f.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
