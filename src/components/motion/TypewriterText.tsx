"use client";

import { useEffect, useState, type CSSProperties } from "react";

const DEFAULT_SPEED_MS = 45;

export function TypewriterText({
  text,
  className,
  style,
  delay = 0,
  speedMs = DEFAULT_SPEED_MS,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  speedMs?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      setDone(true);
      return;
    }

    let interval = 0;

    const timeout = setTimeout(() => {
      let i = 0;
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speedMs);
    }, delay);

    return () => {
      clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, delay, speedMs]);

  return (
    <span className={className} style={style}>
      {text.slice(0, count)}
      <span className="animate-pulse" aria-hidden="true">
        {done ? "" : "_"}
      </span>
    </span>
  );
}
