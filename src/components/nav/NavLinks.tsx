"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about/", label: "About" },
  { href: "/projects/", label: "Projects" },
  { href: "/publications/", label: "Publications" },
  { href: "/experience/", label: "Experience" },
  { href: "/pics/", label: "Pics" },
  { href: "/contact/", label: "Contact" },
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
