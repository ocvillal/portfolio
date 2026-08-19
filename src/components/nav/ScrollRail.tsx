export function ScrollRail({
  eyebrow,
  label,
  index,
  total,
  color = "var(--color-accent)",
}: {
  eyebrow: string;
  label: string;
  index: number;
  total: number;
  color?: string;
}) {
  const remaining = total - index - 1;

  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden max-w-[240px] -translate-y-1/2 flex-col gap-1 xl:flex">
      <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">{eyebrow}</span>
      <span className="text-2xl font-black leading-tight transition-colors duration-300" style={{ color }}>
        {label}
      </span>
      <span className="text-xs text-fg-muted">
        {String(index + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
        {remaining > 0 ? ` · ${remaining} left` : " · last one"}
      </span>
    </div>
  );
}
