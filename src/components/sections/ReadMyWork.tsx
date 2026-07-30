import Link from "next/link";
import { publications } from "@/data/publications";
import { PAGE_COLORS } from "@/lib/pageColors";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export function ReadMyWork() {
  return (
    <section id="home-read-my-work" className="bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h2
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.publications }}
          >
            Read my work
          </h2>
        </Reveal>

        <div className="mt-8 space-y-4">
          {publications.map((pub, i) => (
            <Reveal key={pub.title} delay={i * 100}>
              <SpotlightCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
                <h3 className="text-lg font-semibold">{pub.title}</h3>
                <p className="mt-1 text-sm text-fg-muted">
                  {pub.venue} · {pub.year}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link
            href="/publications/"
            className="mt-8 inline-block text-sm font-semibold hover:underline"
            style={{ color: PAGE_COLORS.publications }}
          >
            Read all publications →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
