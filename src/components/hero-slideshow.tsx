"use client";

import { useEffect, useState } from "react";
import type { Image } from "@/lib/content";
import { Photo } from "./photo";

const INTERVAL = 6500;

/** Full-bleed crossfading slideshow with a slow drift on the active image. */
export function HeroSlideshow({ images }: { images: Image[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % images.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      {images.map((image, i) => (
        <div key={image.src} className="hero-slide absolute inset-0" data-active={i === active} aria-hidden={i !== active}>
          <Photo image={image} fill sizes="100vw" preload={i === 0} />
        </div>
      ))}

      <div className="absolute right-[var(--gutter)] bottom-10 z-10 hidden items-center gap-3 md:flex" aria-hidden>
        {images.map((image, i) => (
          <span
            key={image.src}
            className={`h-px transition-all duration-700 ${i === active ? "w-10 bg-paper" : "w-4 bg-paper/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
