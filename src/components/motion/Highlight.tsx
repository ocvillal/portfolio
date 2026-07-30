import type { ReactNode } from "react";

export function Highlight({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="-mx-1 rounded px-1 py-0.5 font-semibold"
      style={{ background: `color-mix(in srgb, ${color} 22%, transparent)` }}
    >
      {children}
    </span>
  );
}
