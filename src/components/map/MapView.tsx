"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { withBasePath } from "@/lib/paths";

function readTheme(): "dark" | "light" {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function slugFor(lat: number, lng: number): string {
  return `${lat}_${lng}`;
}

export function MapView({ lat, lng }: { lat: number; lng: number }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- theme attribute is only known client-side
    setTheme(readTheme());

    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const src = withBasePath(`/images/maps/${slugFor(lat, lng)}-${theme}.webp`);

  return (
    <div className="absolute inset-0 h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-rendered static map tile, not a next/image-optimizable photo */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      <MapPin
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full drop-shadow"
        size={22}
        color="#ef4444"
        fill="#ef4444"
      />
    </div>
  );
}
