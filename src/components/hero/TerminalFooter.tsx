"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

function formatUptime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const h = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return days > 0 ? `${days}d ${h}:${m}:${s}` : `${h}:${m}:${s}`;
}

const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME;
const buildLabel = BUILD_TIME ? BUILD_TIME.slice(0, 10) : "dev";
const buildTimestampMs = BUILD_TIME ? new Date(BUILD_TIME).getTime() : Date.now();

export function TerminalFooter() {
  const [now, setNow] = useState<Date | null>(null);
  const [uptimeMs, setUptimeMs] = useState(0);

  useEffect(() => {
    setNow(new Date());
    setUptimeMs(Date.now() - buildTimestampMs);
    const interval = setInterval(() => {
      setNow(new Date());
      setUptimeMs(Date.now() - buildTimestampMs);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t px-4 py-2 text-center font-mono text-xs"
      style={{
        background: "var(--terminal-bg-secondary)",
        borderColor: "var(--terminal-border)",
        color: "var(--terminal-fg-muted)",
      }}
    >
      <span>■ {site.name.toUpperCase().replace(/\s+/g, ".")} ■ v1.0 ■</span>
      <span>UPTIME {formatUptime(uptimeMs)}</span>
      <span>BUILD {buildLabel}</span>
      <span>{now ? now.toLocaleTimeString() : "--:--:--"}</span>
    </div>
  );
}
