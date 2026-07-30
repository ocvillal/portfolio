import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { photos } from "@/data/pics";
import { withBasePath } from "@/lib/paths";
import { PAGE_COLORS } from "@/lib/pageColors";
import { SPOTLIGHT_COLORS } from "@/lib/spotlightColors";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Highlight } from "@/components/motion/Highlight";

const BIO_HIGHLIGHTS = ["UC Santa Cruz", "Computer Science", "AI systems", "RL and LLM agents", "Product Design, SWE, and FDE"];
const HIGHLIGHT_PATTERN = new RegExp(`(${BIO_HIGHLIGHTS.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

function renderHighlightedBio(text: string, colorCounter: { value: number }): ReactNode[] {
  const parts = text.split(HIGHLIGHT_PATTERN);
  return parts.map((part, i) => {
    if (!BIO_HIGHLIGHTS.includes(part)) return part;
    const color = SPOTLIGHT_COLORS[colorCounter.value % SPOTLIGHT_COLORS.length];
    colorCounter.value += 1;
    return (
      <Highlight key={i} color={color}>
        {part}
      </Highlight>
    );
  });
}

const COLLAGE_PHOTOS = ["dscf7879", "dscf9502", "img_7656"].map(
  (slug) => photos.find((p) => p.slug === slug)!
);
const COLLAGE_ROTATIONS = ["-4deg", "3deg", "-2deg"];
const COLLAGE_OFFSETS = ["", "sm:mt-8", "sm:mt-2"];

export function About() {
  const colorCounter = { value: 0 };

  return (
    <section className="relative">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h1
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.about }}
          >
            About
          </h1>
        </Reveal>

        <div className="mt-8 grid gap-10 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start">
          <Reveal>
            <TiltCard className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
              <Image
                src={withBasePath("/images/avatar.jpg")}
                alt={site.name}
                fill
                className="object-cover"
              />
            </TiltCard>
          </Reveal>

          <div className="space-y-4 text-lg leading-relaxed text-fg-muted">
            {site.bio.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 100}>
                <p className="max-w-3xl">{renderHighlightedBio(paragraph, colorCounter)}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={100}>
          <h2
            className="mt-20 text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.about }}
          >
            A few frames
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-start gap-6 sm:flex-nowrap sm:gap-10">
          {COLLAGE_PHOTOS.map((photo, i) => (
            <Reveal key={photo.slug} delay={150 + i * 100} className={`w-40 sm:w-52 ${COLLAGE_OFFSETS[i]}`}>
              <div style={{ transform: `rotate(${COLLAGE_ROTATIONS[i]})` }}>
                <TiltCard className="overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-2xl">
                  <Image
                    src={withBasePath(photo.gridSrc)}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="w-full object-cover"
                  />
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={450}>
          <Link
            href="/pics/"
            className="mt-8 inline-block text-sm font-semibold hover:underline"
            style={{ color: PAGE_COLORS.pics }}
          >
            View the full gallery →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
