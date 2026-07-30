"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "@/components/motion/Reveal";
import type { Photo } from "@/types/photo";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex === null ? null : photos[activeIndex];

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 [column-fill:_balance]">
        {photos.map((photo, i) => (
          <Reveal key={photo.slug} delay={(i % 6) * 60} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              data-cursor-hover
              className="group block w-full overflow-hidden rounded-xl bg-black/10"
            >
              <Image
                src={withBasePath(photo.gridSrc)}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/80 hover:text-white sm:left-4"
          >
            ‹
          </button>
          <Image
            src={withBasePath(active.fullSrc)}
            alt={active.alt}
            width={active.width}
            height={active.height}
            className="max-h-[90vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-3xl text-white/80 hover:text-white sm:right-4"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
