"use client";

import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(0);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeIndex;
}
