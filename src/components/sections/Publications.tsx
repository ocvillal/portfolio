"use client";

import { publications } from "@/data/publications";
import { ScrollSpotlight } from "@/components/scrolly/ScrollSpotlight";
import { PublicationPanel } from "./PublicationPanel";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";

export function Publications() {
  return (
    <section className="relative bg-[var(--color-bg)]">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h1 className="text-sm font-semibold uppercase tracking-widest text-fg-muted">Publications</h1>
        </Reveal>

        <div className="mt-8">
          <ScrollSpotlight
            items={publications}
            getKey={(pub) => pub.title}
            renderItem={(pub, index, isActive) => (
              <SpotlightCard
                className="rounded-2xl border border-transparent p-4 -m-4 transition-opacity duration-300 hover:border-[var(--color-border)]"
                style={{ opacity: isActive ? 1 : 0.4 }}
              >
                <h3 className="text-2xl font-bold leading-tight sm:text-3xl">{pub.title}</h3>
                <p className="mt-1 text-fg-muted">
                  {pub.venue} · {pub.detail} · {pub.year}
                </p>
                {pub.links.length > 0 && (
                  <div className="mt-4 flex gap-4 text-sm">
                    {pub.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            )}
            renderPanel={(pub, index) => <PublicationPanel pub={pub} index={index} />}
          />
        </div>
      </div>
    </section>
  );
}
