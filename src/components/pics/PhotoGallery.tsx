"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "@/components/motion/Reveal";
import { PhotoFeedCard } from "@/components/pics/PhotoFeedCard";
import { PhotoInfoPanel } from "@/components/pics/PhotoInfoPanel";
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
      <div className="mx-auto flex max-w-md flex-col gap-6">
        {photos.map((photo, i) => (
          <Reveal key={photo.slug} delay={(i % 6) * 60}>
            <PhotoFeedCard photo={photo} onOpen={() => setActiveIndex(i)} />
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
          <div
            className="relative max-h-[90vh] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- tiny pre-blurred base64 placeholder, not next/image-optimizable */}
            <img
              src={active.blurDataURL}
              alt=""
              aria-hidden="true"
              width={active.width}
              height={active.height}
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
            />
            <Image
              src={withBasePath(active.fullSrc)}
              alt={active.alt}
              width={active.width}
              height={active.height}
              priority
              className="absolute inset-0 max-h-[90vh] max-w-full rounded-lg object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 px-4 sm:bottom-6">
            <PhotoInfoPanel key={active.slug} photo={active} />
          </div>
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
