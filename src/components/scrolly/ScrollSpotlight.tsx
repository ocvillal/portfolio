"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSpotlightProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode;
  renderPanel: (item: T, index: number) => React.ReactNode;
  onActiveIndexChange?: (index: number) => void;
}

export function ScrollSpotlight<T>({
  items,
  getKey,
  renderItem,
  renderPanel,
  onActiveIndexChange,
}: ScrollSpotlightProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [topOffset, setTopOffset] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const panelWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  useEffect(() => {
    setActiveIndex(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    const panelWrapper = panelWrapperRef.current;
    if (!panelWrapper) return;

    function recompute() {
      const height = panelWrapper!.getBoundingClientRect().height;
      setTopOffset(Math.max(16, (window.innerHeight - height) / 2));
    }

    recompute();
    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(panelWrapper);
    window.addEventListener("resize", recompute);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [activeIndex]);

  function scrollToIndex(index: number) {
    refs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-10">
      <div className="space-y-16">
        {items.map((item, index) => (
          <div
            key={getKey(item, index)}
            data-index={index}
            ref={(el) => {
              refs.current[index] = el;
            }}
          >
            {renderItem(item, index, index === activeIndex)}
            <div className="mt-6 lg:hidden">{renderPanel(item, index)}</div>
          </div>
        ))}
      </div>

      {/* This wrapper is the grid item — it stretches to match the left column's
          full height, which gives the sticky child below room to travel/release
          properly. It must NOT be the sticky element itself: if it were, its own
          box would be stretched to thousands of pixels tall, and the browser
          would treat it as "in range to stick" for nearly the entire section,
          so it would never release at the section boundaries. */}
      <div className="hidden lg:block">
        <div className="lg:sticky" style={{ top: topOffset }}>
          <div className="relative" ref={panelWrapperRef}>
            {items.map((item, index) => (
              <div
                key={getKey(item, index)}
                className="transition-opacity duration-300"
                style={{
                  display: index === activeIndex ? "block" : "none",
                }}
              >
                {renderPanel(item, index)}
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={getKey(item, index)}
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Jump to item ${index + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? 24 : 8,
                  background:
                    index === activeIndex ? "var(--color-accent)" : "var(--color-border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
