"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value, durationMs = 1000 }: { value: number; durationMs?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reduced-motion preference is only known client-side; renders 0 first to avoid an SSR hydration mismatch
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            function tick(now: number) {
              const progress = Math.min(1, (now - start) / durationMs);
              setDisplay(Math.round(progress * value));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}
