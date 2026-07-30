import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: "Get in touch with Octavio Villalobos.",
};

export default function ContactPage() {
  return <Contact />;
}
