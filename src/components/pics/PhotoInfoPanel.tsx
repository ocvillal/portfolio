import { MapView } from "@/components/map/MapView";
import type { Photo } from "@/types/photo";

export function PhotoInfoPanel({ photo }: { photo: Photo }) {
  const hasCoords = photo.location?.lat !== undefined && photo.location?.lng !== undefined;
  if (!hasCoords) return null;

  return (
    <div
      className="pointer-events-auto relative h-20 w-32 overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-secondary)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <MapView lat={photo.location!.lat!} lng={photo.location!.lng!} />
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-0.5 right-1 z-10 text-[8px] leading-none opacity-60 hover:opacity-100"
        style={{ color: "var(--color-fg-muted)" }}
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
