"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

export function CustomCursor() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);

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

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.style.cursor = previousCursor;
    };
  }, []);

  if (!active) return null;

  const size = hovering ? 48 : 28;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={withBasePath("/images/cursor-spidey.png")}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none fixed left-0 top-0 z-[100] origin-top-left transition-[width,height] duration-200 ease-out"
      style={{ width: size, height: size }}
    />
  );
}
