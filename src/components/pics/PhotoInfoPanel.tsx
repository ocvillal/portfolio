import { Calendar, MapPin } from "lucide-react";
import { MapView } from "@/components/map/MapView";
import type { Photo } from "@/types/photo";

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function PhotoInfoPanel({ photo }: { photo: Photo }) {
  const hasCoords = photo.location?.lat !== undefined && photo.location?.lng !== undefined;

  return (
    <div
      className="flex w-full items-stretch gap-3 rounded-2xl border p-3"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {hasCoords && (
        <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <MapView lat={photo.location!.lat!} lng={photo.location!.lng!} />
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-0.5 right-1 z-10 text-[8px] leading-none text-white/70 hover:text-white"
          >
            © OpenStreetMap
          </a>
        </div>
      )}

      <div className="min-w-0 flex-1">
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
    </div>
  );
}
