import { site } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section className="relative">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h1 className="text-sm font-semibold uppercase tracking-widest text-fg-muted">About</h1>
        </Reveal>
        <div className="mt-8 space-y-4 text-fg-muted">
          {site.bio.map((paragraph, i) => (
            <Reveal key={paragraph} delay={i * 100}>
              <p className="max-w-3xl text-lg leading-relaxed">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
