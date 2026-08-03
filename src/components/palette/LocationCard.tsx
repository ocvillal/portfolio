"use client";

import { useEffect, useState } from "react";
import { MapPin, Moon, Sun } from "lucide-react";
import { site } from "@/data/site";

const TIMEZONE = "America/Los_Angeles";
const CITY_LABEL = site.location.split(",")[0].toUpperCase();

function getClockParts(date: Date) {
  const timeString = date.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour12: false });
  const hour = Number(
    date.toLocaleTimeString("en-US", { timeZone: TIMEZONE, hour12: false, hour: "2-digit" }),
  );
  const isNight = hour < 6 || hour >= 19;
  return { timeString, isNight };
}

export function LocationCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const { timeString, isNight } = getClockParts(now);

  return (
    <div
      className="w-full max-w-sm rounded-xl border p-3"
      style={{ borderColor: "var(--terminal-border)", background: "var(--terminal-bg-secondary)" }}
    >
      <div
        className="flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--terminal-fg)" }}
      >
        <MapPin size={15} style={{ color: "var(--color-accent)" }} />
        Currently based in
        <span aria-hidden="true">📍</span>
      </div>

      <div className="relative mt-2 h-28 overflow-hidden rounded-lg" style={{ background: "#0a0a0a" }}>
        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 110" fill="none">
          <path d="M0 15 Q 40 6, 70 22 T 140 18 T 200 30" stroke="var(--terminal-fg-muted)" strokeWidth="0.6" />
          <path d="M0 50 Q 50 42, 90 54 T 200 46" stroke="var(--terminal-fg-muted)" strokeWidth="0.6" />
          <path d="M0 85 Q 60 76, 110 88 T 200 80" stroke="var(--terminal-fg-muted)" strokeWidth="0.6" />
          <path d="M20 0 Q 28 55, 15 110" stroke="var(--terminal-fg-muted)" strokeWidth="0.6" />
          <path d="M160 0 Q 150 50, 175 110" stroke="var(--terminal-fg-muted)" strokeWidth="0.6" />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-xl font-bold tracking-widest opacity-30"
          style={{ color: "var(--terminal-fg)" }}
        >
          {CITY_LABEL}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-sm">
        <span style={{ color: "var(--terminal-fg-muted)" }}>{site.location}</span>
        <span className="flex items-center gap-1.5">
          {isNight ? (
            <Moon size={13} style={{ color: "#5b8def" }} />
          ) : (
            <Sun size={13} style={{ color: "#f5b942" }} />
          )}
          <span style={{ color: "var(--color-accent)" }}>{timeString}</span>
        </span>
      </div>
    </div>
  );
}
