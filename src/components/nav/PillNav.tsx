"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { NavLinks } from "@/components/nav/NavLinks";
import { BASE_PATH } from "@/lib/paths";
import { getActivePageColor } from "@/lib/pageColors";

export function PillNav() {
  const pathname = usePathname();
  const color = getActivePageColor(pathname);

  return (
    <header className="sticky top-4 z-40 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4">
      <nav className="flex w-full items-center justify-between gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 px-3 py-2 backdrop-blur">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm font-semibold tracking-tight"
          style={{ color }}
        >
          <span>{`${BASE_PATH}${pathname}`}</span>
          <span
            className="h-4 w-2 animate-terminal-blink"
            style={{ background: color }}
            aria-hidden="true"
          />
        </Link>
        <NavLinks />
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
