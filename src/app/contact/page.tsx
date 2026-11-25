import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { getCategories, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Stilique in Bolzano or Berlin to talk about your architecture or interior design project.",
};

export default async function ContactPage() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <div className="px-page pt-[calc(var(--header-h)+4rem)] pb-28 md:pt-[calc(var(--header-h)+7rem)] md:pb-40">
      <p className="label rise text-stone">Contact</p>
      <h1 className="display-xl mt-8 max-w-[14ch]">
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="rise" style={{ "--rise-delay": "150ms" } as CSSProperties}>
            Let&rsquo;s talk about
          </span>
        </span>
        <span className="block overflow-hidden pb-[0.08em]">
          <span className="rise italic" style={{ "--rise-delay": "300ms" } as CSSProperties}>
            your space.
          </span>
        </span>
      </h1>

      <div className="mt-20 grid gap-20 md:mt-32 md:grid-cols-12">
        <aside className="space-y-14 md:col-span-4">
          <Reveal>
            <p className="label text-stone">Write</p>
            <a href={`mailto:${settings.email}`} className="link-underline mt-4 inline-block font-serif text-2xl">
              {settings.email}
            </a>
          </Reveal>
          <Reveal delay={80}>
            <p className="label text-stone">Call</p>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="link-underline mt-4 inline-block font-serif text-2xl"
            >
              {settings.phone}
            </a>
          </Reveal>
          {settings.offices.map((office, i) => (
            <Reveal key={office.city} delay={160 + i * 80}>
              <p className="label text-stone">{office.city}</p>
              <address className="mt-4 not-italic leading-relaxed">
                {office.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">{office.country}</span>
              </address>
              <a href={office.mapUrl} target="_blank" rel="noreferrer" className="label link-underline mt-3 inline-block text-stone hover:text-ink">
                Map →
              </a>
            </Reveal>
          ))}
          <Reveal delay={320}>
            <p className="label text-stone">Follow</p>
            <ul className="mt-4 flex gap-8">
              {settings.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="link-underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>

        <Reveal delay={150} className="md:col-span-7 md:col-start-6">
          <ContactForm projectTypes={categories.map((c) => c.title)} />
        </Reveal>
      </div>
    </div>
  );
}
