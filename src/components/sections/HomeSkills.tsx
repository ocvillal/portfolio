import Link from "next/link";
import { Skills } from "@/components/sections/Skills";
import { PAGE_COLORS } from "@/lib/pageColors";
import { Reveal } from "@/components/motion/Reveal";

export function HomeSkills() {
  return (
    <section id="home-skills" className="relative bg-[var(--color-bg)]">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Skills
          heading={
            <Reveal>
              <h2
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: PAGE_COLORS.experience }}
              >
                Experience &amp; skills
              </h2>
            </Reveal>
          }
        />

        <Reveal delay={100}>
          <Link
            href="/experience/"
            className="mt-10 inline-block text-sm font-semibold hover:underline"
            style={{ color: PAGE_COLORS.experience }}
          >
            View full experience →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
