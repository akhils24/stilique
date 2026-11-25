import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "Stilique is led by Italian architect Sonia Guerzoni, with studios in Bolzano and Berlin: architecture, interiors, furniture and landscape design.",
};

export default async function StudioPage() {
  const settings = await getSiteSettings();
  const { about } = settings;

  return (
    <>
      <header className="px-page pt-[calc(var(--header-h)+4rem)] pb-20 md:pt-[calc(var(--header-h)+7rem)] md:pb-32">
        <p className="label rise text-stone">Studio</p>
        <h1 className="display-xl mt-8 max-w-[16ch]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="rise" style={{ "--rise-delay": "150ms" } as CSSProperties}>
              Every detail,
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="rise italic" style={{ "--rise-delay": "300ms" } as CSSProperties}>
              from start to finish.
            </span>
          </span>
        </h1>
      </header>

      {/* ---------- Founder ---------- */}
      <section className="px-page grid gap-14 pb-28 md:grid-cols-12 md:pb-44">
        <Reveal variant="image" className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Photo image={about.image} fill sizes="(min-width: 768px) 42vw, 100vw" preload />
          </div>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7 md:pt-24">
          <Reveal>
            <p className="label text-stone">{about.role}</p>
            <h2 className="display-md mt-4">{about.founder}</h2>
          </Reveal>
          {about.bio.map((p, i) => (
            <Reveal key={i} delay={100 + i * 80} className="mt-8">
              <p className={i === 0 ? "lede" : "leading-[1.8] text-ink-soft"}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={300} className="mt-14 border-l border-accent pl-6">
            <blockquote className="font-serif text-xl italic leading-snug md:text-2xl">“{about.quote}”</blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------- Approach ---------- */}
      <section className="bg-ink px-page py-28 text-paper md:py-44">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="label text-paper/50">Approach</p>
          </Reveal>
          <div className="space-y-12 md:col-span-8">
            {settings.philosophy.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p className={i === 0 ? "display-md text-balance" : "max-w-[60ch] leading-[1.8] text-paper/70"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="px-page py-28 md:py-44" aria-labelledby="services">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 id="services" className="display-lg">
              What we <em>do</em>
            </h2>
          </Reveal>
          <ol className="md:col-span-7 md:col-start-6">
            {settings.services.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-8 last:border-b md:grid-cols-[4rem_1fr_1.4fr] md:gap-8">
                <span className="label pt-2 text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-serif text-2xl md:text-3xl">{s.title}</h3>
                <p className="col-start-2 leading-relaxed text-ink-soft md:col-start-3">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Offices ---------- */}
      <section className="bg-paper-deep px-page py-28 md:py-40" aria-labelledby="offices">
        <h2 id="offices" className="label text-stone">
          Two studios
        </h2>
        <div className="mt-14 grid gap-16 md:grid-cols-2">
          {settings.offices.map((office, i) => (
            <Reveal key={office.city} delay={i * 120}>
              <p className="display-lg">{office.city}</p>
              <address className="mt-6 not-italic leading-relaxed text-ink-soft">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">{office.country}</span>
              </address>
              <a href={office.mapUrl} target="_blank" rel="noreferrer" className="label link-underline mt-6 inline-block">
                View on map →
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20">
          <Link href="/contact" className="label link-underline">
            Start a conversation →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
