"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setActive(true);
    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    function handleMove(e: MouseEvent) {
      const el = dotRef.current;
      if (!el) return;
      el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;

      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-out"
      style={{ width: hovering ? 40 : 16, height: hovering ? 40 : 16 }}
    />
  );
}
