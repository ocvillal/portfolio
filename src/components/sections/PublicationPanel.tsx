import type { Publication } from "@/data/publications";
import { SPOTLIGHT_COLORS } from "@/lib/spotlightColors";

export function PublicationPanel({ pub, index }: { pub: Publication; index: number }) {
  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-3xl p-8"
      style={{ background: SPOTLIGHT_COLORS[index % SPOTLIGHT_COLORS.length] }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-10 select-none text-[10rem] font-black leading-none text-white/10"
      >
        {pub.year}
      </span>

      <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
        {pub.year}
      </span>

      <h3 className="mt-6 text-2xl font-black leading-tight text-white">{pub.title}</h3>
      <p className="mt-2 text-sm font-semibold text-white/90">{pub.venue}</p>
      <p className="text-sm text-white/70">{pub.detail}</p>
    </div>
  );
}
