"use client";

import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Image } from "@/lib/content";
import { Photo } from "./photo";
import { Reveal } from "./reveal";

type Row = { kind: "full"; items: [number] } | { kind: "pair"; items: [number, number] } | { kind: "single"; items: [number] };

/**
 * Turns a flat list of photos into editorial rows: landscape images (or ones marked
 * `full`) span the width, portraits are paired side by side, and a portrait left
 * without a partner sits alone, offset to one side.
 */
function toRows(images: Image[]): Row[] {
  const isFull = (img: Image) =>
    img.layout === "full" || (img.layout !== "half" && img.width / img.height >= 1.15);
  const rows: Row[] = [];
  let pending: number | null = null;

  images.forEach((img, i) => {
    if (isFull(img)) {
      if (pending !== null) rows.push({ kind: "single", items: [pending] });
      pending = null;
      rows.push({ kind: "full", items: [i] });
    } else if (pending === null) {
      pending = i;
    } else {
      rows.push({ kind: "pair", items: [pending, i] });
      pending = null;
    }
  });
  if (pending !== null) rows.push({ kind: "single", items: [pending] });
  return rows;
}

export function ProjectGallery({ images, title }: { images: Image[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rows = toRows(images);
  let singleCount = 0;

  const open = (i: number, sizes = "(min-width: 768px) 50vw, 100vw") => (
    <button
      type="button"
      onClick={() => setOpenIndex(i)}
      className="group relative block w-full cursor-zoom-in overflow-hidden"
      aria-label={`Open image ${i + 1} of ${images.length} full screen`}
    >
      <Photo
        image={images[i]}
        sizes={sizes}
        className="transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
      />
    </button>
  );

  return (
    <>
      <div className="space-y-[var(--gutter)]">
        {rows.map((row) => {
          if (row.kind === "full") {
            const i = row.items[0];
            return (
              <Reveal key={i} variant="image">
                {open(i, "100vw")}
              </Reveal>
            );
          }
          if (row.kind === "pair") {
            return (
              <div key={row.items[0]} className="grid items-end gap-[var(--gutter)] md:grid-cols-2">
                {row.items.map((i, k) => (
                  <Reveal key={i} variant="image" delay={k * 140}>
                    {open(i)}
                  </Reveal>
                ))}
              </div>
            );
          }
          const left = singleCount++ % 2 === 0;
          return (
            <div key={row.items[0]} className="grid md:grid-cols-12">
              <Reveal
                variant="image"
                className={left ? "md:col-span-6 md:col-start-2" : "md:col-span-6 md:col-start-6"}
              >
                {open(row.items[0])}
              </Reveal>
            </div>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox images={images} title={title} index={openIndex} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </>
  );
}

function Lightbox({
  images,
  title,
  index,
  onIndex,
  onClose,
}: {
  images: Image[];
  title: string;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const go = useCallback(
    (delta: number) => onIndex((index + delta + images.length) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const image = images[index];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-label={`${title}, image ${index + 1} of ${images.length}`}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex h-full flex-col">
        <div className="px-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
          <p className="label text-paper/60 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <p className="label hidden text-paper/60 md:block">{title}</p>
          <button type="button" onClick={() => dialogRef.current?.close()} className="label -mr-2 p-2" autoFocus>
            Close
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <NextImage
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="animate-[fade-in_0.6s_ease-out] object-contain px-4 md:px-24"
          />
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute inset-y-0 left-0 hidden w-1/3 cursor-w-resize md:block"
            aria-label="Previous image"
          />
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute inset-y-0 right-0 hidden w-1/3 cursor-e-resize md:block"
            aria-label="Next image"
          />
        </div>

        <div className="px-page flex h-20 shrink-0 items-center justify-between">
          <button type="button" onClick={() => go(-1)} className="label p-2 text-paper/70 hover:text-paper">
            ← Prev
          </button>
          {image.caption && <p className="text-sm text-paper/70">{image.caption}</p>}
          <button type="button" onClick={() => go(1)} className="label p-2 text-paper/70 hover:text-paper">
            Next →
          </button>
        </div>
      </div>
    </dialog>
  );
}
