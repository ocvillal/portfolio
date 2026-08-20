"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";
import "maplibre-gl/dist/maplibre-gl.css";

const MAP_STYLES = {
  dark: "https://tiles.openfreemap.org/styles/dark",
  light: "https://tiles.openfreemap.org/styles/positron",
};

function readTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

export function MapView({ lat, lng, zoom = 12 }: { lat: number; lng: number; zoom?: number }) {
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
        center: [lng, lat],
        zoom,
        // MapLibre's built-in attribution widget doesn't collapse to its compact "i" form at
        // this card's size — it renders expanded and covers the whole map. Attribution is
        // handled separately by the caller with a small static credit link instead.
        attributionControl: false,
        cooperativeGestures: true,
      });
      map.dragRotate.disable();
      map.touchZoomRotate.disableRotation();

      new Marker({ color: "#ef4444" }).setLngLat([lng, lat]).addTo(map);

      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- map is created once per mount; lat/lng changes are handled by remounting via `key` in callers
  }, []);

  // Swaps the live map's style whenever the site theme toggles after mount.
  useEffect(() => {
    mapRef.current?.setStyle(MAP_STYLES[theme]);
  }, [theme]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}
