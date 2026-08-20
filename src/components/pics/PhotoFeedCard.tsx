import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import type { Photo } from "@/types/photo";

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function PhotoFeedCard({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  return (
    <article
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor-hover
        className="block w-full"
      >
        <Image
          src={withBasePath(photo.gridSrc)}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 640px) 448px, 100vw"
          className="max-h-[600px] w-full object-cover"
        />
      </button>

      <div className="p-4">
        {photo.title && (
          <p className="font-bold" style={{ color: "var(--color-fg)" }}>
            {photo.title}
          </p>
        )}
        <div
          className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
          style={{ color: "var(--color-fg-muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={14} style={{ color: "var(--color-accent-5)" }} />
            {formatDate(photo.date)}
          </span>
          {photo.location && (
            <>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color: "var(--color-accent-5)" }} />
                {photo.location.label}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
