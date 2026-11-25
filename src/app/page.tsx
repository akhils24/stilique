import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { Photo } from "@/components/photo";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { getCategories, getFeaturedProjects, getSiteSettings } from "@/lib/content";
import { routes } from "@/lib/routes";

/**
 * Editorial placement for featured projects on a 12-column grid: alternating large and
 * small pieces with vertical offsets, so the page reads like a magazine spread.
 */
const SPREAD = [
  { cell: "md:col-span-7", aspect: "landscape", sizes: "(min-width: 768px) 58vw, 100vw" },
  { cell: "md:col-span-4 md:col-start-9 md:mt-40", aspect: "portrait", sizes: "(min-width: 768px) 33vw, 100vw" },
  { cell: "md:col-span-4 md:col-start-2", aspect: "tall", sizes: "(min-width: 768px) 33vw, 100vw" },
  { cell: "md:col-span-6 md:col-start-7 md:mt-24", aspect: "landscape", sizes: "(min-width: 768px) 50vw, 100vw" },
  { cell: "md:col-span-8 md:col-start-3", aspect: "wide", sizes: "(min-width: 768px) 66vw, 100vw" },
  { cell: "md:col-span-5 md:mt-16", aspect: "portrait", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-5 md:col-start-8 md:mt-56", aspect: "tall", sizes: "(min-width: 768px) 42vw, 100vw" },
] as const;

export default async function HomePage() {
  const [settings, featured, categories] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getCategories(),
  ]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative h-[100svh] min-h-[36rem] text-paper">
        <HeroSlideshow images={settings.heroImages} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />

        <div className="px-page relative z-10 flex h-full flex-col justify-end pb-16 md:pb-20">
          <p className="label overflow-hidden text-paper/80">
            <span className="rise" style={{ "--rise-delay": "200ms" } as CSSProperties}>
              Architecture &amp; Interior Design — Bolzano · Berlin
            </span>
          </p>
          <h1 className="display-xl mt-6 max-w-[14ch]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rise" style={{ "--rise-delay": "350ms" } as CSSProperties}>
                Italian elegance,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="rise italic" style={{ "--rise-delay": "500ms" } as CSSProperties}>
                German precision.
              </span>
            </span>
          </h1>
        </div>

        <div className="absolute bottom-0 left-1/2 z-10 hidden h-16 w-px -translate-x-1/2 overflow-hidden md:block" aria-hidden>
          <span className="scroll-cue block h-full w-full bg-paper/70" />
        </div>
      </section>

      {/* ---------- Philosophy ---------- */}
      <section className="px-page py-28 md:py-44">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-stone">The studio</p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <p className="display-md text-balance">{settings.philosophy[0]}</p>
            </Reveal>
            <Reveal delay={150} className="mt-12 grid gap-8 md:mt-16 md:grid-cols-2">
              <p className="leading-relaxed text-ink-soft">{settings.philosophy[1]}</p>
              <div className="md:self-end">
                <Link href="/studio" className="label link-underline">
                  About the studio →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Selected works ---------- */}
      <section className="px-page pb-28 md:pb-44" aria-labelledby="selected-works">
        <div className="flex items-end justify-between border-t border-line pt-8">
          <h2 id="selected-works" className="label">
            Selected works
          </h2>
          <Link href={routes.work()} className="label link-underline text-stone hover:text-ink">
            All projects →
          </Link>
        </div>

        <ul className="mt-16 grid gap-x-[var(--gutter)] gap-y-20 md:mt-24 md:grid-cols-12 md:gap-y-32">
          {featured.slice(0, SPREAD.length).map((project, i) => (
            <li key={project.slug} className={SPREAD[i].cell}>
              <ProjectCard project={project} aspect={SPREAD[i].aspect} sizes={SPREAD[i].sizes} />
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="bg-paper-deep px-page py-28 md:py-40" aria-labelledby="disciplines">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 id="disciplines" className="display-lg">
              Spaces we <em>shape</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9 md:self-end">
            <p className="leading-relaxed text-ink-soft">
              From private villas to restaurants on the Kurfürstendamm, each project is designed from the
              structure to the smallest fixture.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-24 md:grid-cols-4 md:gap-x-6">
          {categories.map((category, i) => (
            <li key={category.slug}>
              <Link href={routes.category(category.slug)} className="group block">
                <Reveal variant="image" delay={i * 100}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]">
                      <Photo image={category.coverImage} fill sizes="(min-width: 768px) 25vw, 50vw" />
                    </div>
                  </div>
                </Reveal>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl md:text-2xl">
                    <span className="link-underline group-hover:bg-[length:100%_1px]">{category.title}</span>
                  </h3>
                  <span className="label text-stone tabular-nums">
                    {String(category.projectCount).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Founder ---------- */}
      <section className="px-page py-28 md:py-44">
        <div className="grid items-center gap-14 md:grid-cols-12">
          <Reveal variant="image" className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo image={settings.about.image} fill sizes="(min-width: 768px) 42vw, 100vw" />
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <blockquote className="display-md text-balance">
                <span className="font-serif text-accent">“</span>
                {settings.about.quote}
                <span className="font-serif text-accent">”</span>
              </blockquote>
            </Reveal>
            <Reveal delay={150} className="mt-10">
              <p className="font-serif text-xl">{settings.about.founder}</p>
              <p className="label mt-2 text-stone">{settings.about.role}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="px-page border-t border-line py-28 text-center md:py-40">
        <Reveal>
          <p className="label text-stone">Have a space in mind?</p>
          <Link href="/contact" className="group mt-8 inline-block">
            <span className="display-xl block">
              Let&rsquo;s create <em>your</em> space
            </span>
            <span className="label mt-8 inline-flex items-center gap-3">
              <span className="link-underline group-hover:bg-[length:100%_1px]">Get in touch</span>
              <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
