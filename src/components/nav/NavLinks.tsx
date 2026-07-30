"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGE_COLORS } from "@/lib/pageColors";

const LINKS = [
  { href: "/about/", label: "About", color: PAGE_COLORS.about },
  { href: "/projects/", label: "Projects", color: PAGE_COLORS.projects },
  { href: "/publications/", label: "Publications", color: PAGE_COLORS.publications },
  { href: "/experience/", label: "Experience", color: PAGE_COLORS.experience },
  { href: "/pics/", label: "Pics", color: PAGE_COLORS.pics },
  { href: "/contact/", label: "Contact", color: PAGE_COLORS.contact },
];

function isActive(pathname: string, href: string) {
  const base = href.replace(/\/$/, "");
  if (base === "/projects") return pathname.startsWith("/projects");
  return pathname === href || pathname === base;
}

export function NavLinks() {
  const pathname = usePathname();
  const activeIndex = LINKS.findIndex((link) => isActive(pathname, link.href));
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

  const activeColor = activeIndex >= 0 ? LINKS[activeIndex].color : null;

  return (
    <div ref={containerRef} className="relative hidden items-center gap-1 sm:flex">
      {pillStyle && activeColor && (
        <div
          className="absolute top-0 h-full rounded-full transition-all duration-300 ease-out"
          style={{
            left: pillStyle.left,
            width: pillStyle.width,
            background: "var(--color-bg)",
            boxShadow: `0 0 0 1px ${activeColor}, 0 0 16px -4px ${activeColor}`,
          }}
        />
      )}
      {LINKS.map((link, i) => (
        <Link
          key={link.href}
          href={link.href}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
          className="relative rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          style={{ color: activeIndex === i ? "var(--color-fg)" : undefined }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
