"use client";

import { useActiveSection } from "@/lib/useActiveSection";
import { ScrollRail } from "@/components/nav/ScrollRail";
import { PAGE_COLORS } from "@/lib/pageColors";

const SECTIONS = [
  { id: "home-intro", label: "Intro", color: "var(--color-accent)" },
  { id: "home-projects", label: "Projects", color: PAGE_COLORS.projects },
  { id: "home-skills", label: "Experience & skills", color: PAGE_COLORS.experience },
  { id: "home-read-my-work", label: "Read my work", color: PAGE_COLORS.publications },
  { id: "home-github", label: "GitHub", color: "var(--color-accent)" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export function HomeSectionRail() {
  const activeIndex = Math.max(0, useActiveSection(SECTION_IDS));

  return (
    <ScrollRail
      eyebrow="Section"
      label={SECTIONS[activeIndex].label}
      index={activeIndex}
      total={SECTIONS.length}
      color={SECTIONS[activeIndex].color}
    />
  );
}
