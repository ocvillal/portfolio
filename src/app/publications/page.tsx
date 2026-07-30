import type { Metadata } from "next";
import { Publications } from "@/components/sections/Publications";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Publications — ${site.name}`,
  description: "Research publications by Octavio Villalobos.",
};

export default function PublicationsPage() {
  return <Publications />;
}
