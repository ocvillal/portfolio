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
      className="pointer-events-auto w-full max-w-sm rounded-xl border p-3"
      style={{ borderColor: "var(--terminal-border)", background: "var(--terminal-bg-secondary)" }}
      onClick={(e) => e.stopPropagation()}
    >
      {hasCoords && (
        <div
          className="relative mb-2 h-20 overflow-hidden rounded-lg"
          style={{ background: "var(--terminal-bg)" }}
        >
          <MapView lat={photo.location!.lat!} lng={photo.location!.lng!} />
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-0.5 right-1 z-10 text-[8px] leading-none opacity-60 hover:opacity-100"
            style={{ color: "var(--terminal-fg-muted)" }}
          >
            © OpenStreetMap
          </a>
        </div>
      )}

      {photo.title && (
        <div className="text-base font-bold" style={{ color: "var(--terminal-fg)" }}>
          {photo.title}
        </div>
      )}

      <div
        className={photo.title ? "mt-1 flex items-center gap-2 text-sm" : "flex items-center gap-2 text-sm font-semibold"}
        style={{ color: photo.title ? "var(--terminal-fg-muted)" : "var(--terminal-fg)" }}
      >
        <Calendar size={14} style={{ color: "var(--color-accent)" }} />
        {formatDate(photo.date)}
      </div>

      {photo.location && (
        <div
          className="mt-1 flex items-center gap-2 text-sm"
          style={{ color: "var(--terminal-fg-muted)" }}
        >
          <MapPin size={14} style={{ color: "var(--color-accent)" }} />
          {photo.location.label}
        </div>
      )}
    </div>
  );
}
