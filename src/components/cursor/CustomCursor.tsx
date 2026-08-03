"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

type Burst = { id: number; x: number; y: number };

export function CustomCursor() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const burstId = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setActive(true);
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    function handleMove(e: MouseEvent) {
      const el = imgRef.current;
      if (!el) return;
      el.style.transform = `translate(calc(${e.clientX}px - 32%), calc(${e.clientY}px - 3%))`;

      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }

    function handleClick(e: MouseEvent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const id = burstId.current++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, 450);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  if (!active) return null;

  const size = hovering ? 48 : 28;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={withBasePath("/images/cursor-spidey.png")}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none fixed left-0 top-0 z-[100] origin-top-left transition-[width,height] duration-200 ease-out"
        style={{ width: size, height: size }}
      />
      {bursts.map((b) => (
        <svg
          key={b.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[99] animate-web-burst"
          style={{ left: b.x, top: b.y, width: 60, height: 60, marginLeft: -30, marginTop: -30 }}
          viewBox="0 0 60 60"
        >
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * Math.PI) / 4;
            const x2 = 30 + Math.cos(angle) * 26;
            const y2 = 30 + Math.sin(angle) * 26;
            return (
              <line
                key={i}
                x1={30}
                y1={30}
                x2={x2}
                y2={y2}
                stroke="var(--terminal-fg)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      ))}
    </>
  );
}
