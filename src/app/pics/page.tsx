import type { Metadata } from "next";
import Link from "next/link";
import { photos } from "@/data/pics";
import { PhotoGallery } from "@/components/pics/PhotoGallery";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Pics — ${site.name}`,
  description: "A collection of photographs by Octavio Villalobos.",
};

export default function PicsPage() {
  return (
    <section className="relative">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <Link href="/" className="text-sm text-fg-muted hover:text-fg">
            ← Back home
          </Link>
          <h1 className="mt-6 text-4xl font-black sm:text-5xl">Pics</h1>
          <p className="mt-2 max-w-xl text-fg-muted">
            A collection of frames shot around Santa Cruz and beyond.
          </p>
        </Reveal>

        <div className="mt-10">
          <PhotoGallery photos={photos} />
        </div>
      </div>
    </section>
  );
}
