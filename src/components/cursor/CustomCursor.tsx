"use client";

import { useEffect, useRef, useState } from "react";

function readSuppressed(): boolean {
  return document.body.hasAttribute("data-suppress-cursor");
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- fine-pointer support is only known client-side; renders inactive first to avoid an SSR hydration mismatch
    setActive(true);
    setSuppressed(readSuppressed());
    const originalCursor = document.body.style.cursor;

    const observer = new MutationObserver(() => setSuppressed(readSuppressed()));
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-suppress-cursor"] });

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
      observer.disconnect();
      document.body.style.cursor = originalCursor;
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    document.body.style.cursor = suppressed ? "auto" : "none";
  }, [active, suppressed]);

  if (!active || suppressed) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-white mix-blend-difference transition-[width,height] duration-200 ease-out"
      style={{ width: hovering ? 40 : 16, height: hovering ? 40 : 16 }}
    />
  );
}
