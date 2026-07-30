import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: site.tagline,
};

export default function AboutPage() {
  return <About />;
}
