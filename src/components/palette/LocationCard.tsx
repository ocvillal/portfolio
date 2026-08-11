"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Moon, Sun } from "lucide-react";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";
import "maplibre-gl/dist/maplibre-gl.css";

const TIMEZONE = "America/Los_Angeles";
const CITY_LABEL = site.location.split(",")[0].toUpperCase();
const MAP_STYLES = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  light: "https://tiles.openfreemap.org/styles/positron",
};

function getClockParts(date: Date) {
  const timeString = date.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour12: false });
  const hour = Number(
    date.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour12: false, hour: "2-digit" }),
  );
  const isNight = hour < 6 || hour >= 19;
  return { timeString, isNight };
}

function readTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function LocationMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- theme attribute is only known client-side
    setTheme(readTheme());

    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Creates the map once, using whatever theme is on the page right now — independent of
  // the `theme` state above, which may not have synced from its SSR-safe default yet.
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    import("maplibre-gl").then(({ Map: MapLibreMap, Marker, setWorkerUrl }) => {
      if (cancelled || !containerRef.current) return;

      // Next's bundler (Turbopack in dev) doesn't reliably resolve MapLibre's internal
      // `new Worker(new URL(...))` call, silently breaking the worker that parses vector
      // tiles — the map loads but nothing ever renders beyond the flat background layer.
      // Pointing it at the plain static files below sidesteps that entirely.
      setWorkerUrl(withBasePath("/maplibre/maplibre-gl-worker.mjs"));

      const map = new MapLibreMap({
        container: containerRef.current,
        style: MAP_STYLES[readTheme()],
        center: [site.coordinates.lng, site.coordinates.lat],
        zoom: 10.5,
        // MapLibre's built-in attribution widget doesn't collapse to its compact "i" form at
        // this card's size — it renders expanded and covers the whole map. Attribution is
        // handled separately below with a small static credit link instead.
        attributionControl: false,
        cooperativeGestures: true,
      });
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      new Marker({ color: "#ef4444" })
        .setLngLat([site.coordinates.lng, site.coordinates.lat])
        .addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Swaps the live map's style whenever the site theme toggles after mount.
  useEffect(() => {
    mapRef.current?.setStyle(MAP_STYLES[theme]);
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}

export function LocationCard({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- current time is only known client-side; renders null first to avoid an SSR hydration mismatch
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const { timeString, isNight } = getClockParts(now);

  return (
    <div
      className={compact ? "w-52 rounded-xl border p-2 sm:w-60" : "w-full max-w-sm rounded-xl border p-3"}
      style={{ borderColor: "var(--terminal-border)", background: "var(--terminal-bg-secondary)" }}
    >
      <div
        className={compact ? "flex items-center gap-1.5 text-xs font-semibold" : "flex items-center gap-2 text-sm font-semibold"}
        style={{ color: "var(--terminal-fg)" }}
      >
        <MapPin size={compact ? 12 : 15} style={{ color: "var(--color-accent)" }} />
        Currently based in
        <span aria-hidden="true">📍</span>
      </div>

      <div
        className={compact ? "relative mt-1.5 h-16 overflow-hidden rounded-lg sm:h-20" : "relative mt-2 h-28 overflow-hidden rounded-lg"}
        style={{ background: "var(--terminal-bg)" }}
      >
        <LocationMap />
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-0.5 right-1 z-10 text-[8px] leading-none opacity-60 hover:opacity-100"
          style={{ color: "var(--terminal-fg-muted)" }}
        >
          © OpenStreetMap
        </a>
        <span
          className={
            compact
              ? "pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold tracking-widest opacity-40"
              : "pointer-events-none absolute inset-0 flex items-center justify-center text-xl font-bold tracking-widest opacity-40"
          }
          style={{ color: "var(--terminal-fg)", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}
        >
          {CITY_LABEL}
        </span>
      </div>

      <div
        className={compact ? "mt-1.5 flex items-center justify-between font-mono text-xs" : "mt-2 flex items-center justify-between font-mono text-sm"}
      >
        <span style={{ color: "var(--terminal-fg-muted)" }}>{site.location}</span>
        <span className="flex items-center gap-1.5">
          {isNight ? (
            <Moon size={compact ? 11 : 13} style={{ color: "#5b8def" }} />
          ) : (
            <Sun size={compact ? 11 : 13} style={{ color: "#f5b942" }} />
          )}
          <span style={{ color: "var(--color-accent)" }}>{timeString}</span>
        </span>
      </div>
    </div>
  );
}
