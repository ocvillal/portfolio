import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description: "Projects and case studies by Octavio Villalobos.",
};

export default function ProjectsPage() {
  return <ProjectGrid />;
}
