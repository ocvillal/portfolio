import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
  description: "Work experience, skills, and education.",
};

export default function ExperiencePage() {
  return <Experience />;
}
