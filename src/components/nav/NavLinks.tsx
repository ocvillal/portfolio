"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useActiveSection } from "@/lib/useActiveSection";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "/pics/", label: "Pics" },
  { href: "#contact", label: "Contact" },
];

const SECTION_LINK_INDICES = LINKS.map((link, i) => (link.href.startsWith("#") ? i : null)).filter(
  (i): i is number => i !== null
);
const SECTION_IDS = SECTION_LINK_INDICES.map((i) => LINKS[i].href.slice(1));

export function NavLinks() {
  const sectionIndex = useActiveSection(SECTION_IDS);
  const activeIndex = sectionIndex < 0 ? -1 : SECTION_LINK_INDICES[sectionIndex];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const link = linkRefs.current[activeIndex];
    if (!container || !link || activeIndex < 0) {
      setPillStyle(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPillStyle({ left: linkRect.left - containerRect.left, width: linkRect.width });
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative hidden items-center gap-1 sm:flex">
      {pillStyle && (
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-300 ease-out"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
            background: "var(--color-bg)",
          }}
        />
      )}
      {LINKS.map((link, i) => {
        const isHash = link.href.startsWith("#");
        const className = "relative rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg";
        const style = { color: activeIndex === i ? "var(--color-fg)" : undefined };
        return isHash ? (
          <a
            key={link.href}
            href={link.href}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            className={className}
            style={style}
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            className={className}
            style={style}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
