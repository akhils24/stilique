import Link from "next/link";
import { getCategories, getSiteSettings } from "@/lib/content";

export async function SiteFooter() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()]);

  return (
    <footer className="bg-ink text-paper">
      <div className="px-page pt-24 pb-10 md:pt-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="label text-paper/50">Start a project</p>
            <a
              href={`mailto:${settings.email}`}
              className="display-md link-underline mt-6 inline-block break-all md:break-normal"
            >
              {settings.email}
            </a>
            <p className="mt-6">
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="link-underline text-paper/70">
                {settings.phone}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-6 md:grid-cols-3">
            {settings.offices.map((office) => (
              <address key={office.city} className="not-italic">
                <p className="label text-paper/50">{office.city}</p>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 block text-sm leading-relaxed text-paper/80 hover:text-paper"
                >
                  {office.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{office.country}</span>
                </a>
              </address>
            ))}

            <nav aria-label="Categories" className="col-span-2 md:col-span-1">
              <p className="label text-paper/50">Work</p>
              <ul className="mt-4 space-y-1 text-sm">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/work/${c.slug}`} className="link-underline text-paper/80 hover:text-paper">
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-28 select-none text-center font-sans text-[17vw] leading-none font-light tracking-[0.18em] text-paper/[0.07] md:mt-36"
        >
          STILIQUE
        </p>

        <div className="mt-6 flex flex-col gap-6 border-t border-paper/15 pt-8 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>© {settings.about.founder} · Architecture &amp; Interior Design</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {settings.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-paper">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/impressum" className="link-underline hover:text-paper">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="link-underline hover:text-paper">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
