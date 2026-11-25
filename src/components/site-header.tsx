"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Over the homepage hero the header is transparent with light text until the user scrolls.
  const overlay = pathname === "/" && !scrolled && !open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-700 ease-[var(--ease-out-soft)] ${
          overlay
            ? "border-b border-transparent bg-transparent text-paper"
            : "border-b border-line/60 bg-paper/90 text-ink backdrop-blur-md"
        }`}
      >
        <div className="px-page flex h-[var(--header-h)] items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-sans text-[0.95rem] font-medium tracking-[0.42em]"
            aria-label="Stilique, home"
          >
            STILIQUE
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-12">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label link-underline"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="label -mr-2 p-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-between bg-paper pt-[var(--header-h)] md:hidden"
      >
        <nav aria-label="Mobile" className="px-page pt-12">
          <ul className="space-y-2">
            {[{ href: "/", label: "Home" }, ...NAV].map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display-lg rise block py-1"
                  style={{ "--rise-delay": `${80 + i * 70}ms` } as CSSProperties}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="px-page label pb-10 text-stone">Bolzano · Berlin</p>
      </div>
    </>
  );
}
