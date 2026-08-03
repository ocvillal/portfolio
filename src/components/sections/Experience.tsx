"use client";

import { useState } from "react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { ScrollSpotlight } from "@/components/scrolly/ScrollSpotlight";
import { ExperiencePanel } from "./ExperiencePanel";
import { Skills } from "./Skills";
import { SPOTLIGHT_COLORS } from "@/lib/spotlightColors";
import { PAGE_COLORS } from "@/lib/pageColors";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightCard } from "@/components/motion/SpotlightCard";
import { renderCountUpText } from "@/lib/countUpText";
import { ScrollRail } from "@/components/nav/ScrollRail";

export function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative bg-[var(--color-bg)]">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <ScrollRail
        eyebrow="Role"
        label={experience[activeIndex].role}
        index={activeIndex}
        total={experience.length}
        color={PAGE_COLORS.experience}
      />
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h1
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.experience }}
          >
            Experience
          </h1>
        </Reveal>

        <Skills
          heading={
            <Reveal delay={50}>
              <h2 className="mt-16 text-sm font-semibold uppercase tracking-widest text-fg-muted">
                Skills
              </h2>
            </Reveal>
          }
        />

        <Reveal delay={100}>
          <h2 className="mt-20 text-sm font-semibold uppercase tracking-widest text-fg-muted">
            Work experience
          </h2>
        </Reveal>
        <div className="mt-8">
          <ScrollSpotlight
            items={experience}
            getKey={(entry) => entry.org + entry.role}
            renderItem={(entry, index, isActive) => (
              <SpotlightCard
                className="rounded-2xl border border-transparent p-4 -m-4 transition-opacity duration-300 hover:border-[var(--color-border)]"
                style={{ opacity: isActive ? 1 : 0.4 }}
              >
                <h3
                  className="text-2xl font-bold transition-colors duration-300 sm:text-3xl"
                  style={{ color: isActive ? SPOTLIGHT_COLORS[index % SPOTLIGHT_COLORS.length] : "var(--color-fg)" }}
                >
                  {entry.role}
                </h3>
                <p className="mt-1 text-fg-muted">
                  {entry.org} — {entry.location}
                </p>
                <p className="text-sm text-fg-muted">{entry.period}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-fg-muted marker:text-[var(--color-accent)]">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{renderCountUpText(bullet)}</li>
                  ))}
                </ul>
              </SpotlightCard>
            )}
            renderPanel={(entry, index) => <ExperiencePanel entry={entry} index={index} />}
            onActiveIndexChange={setActiveIndex}
          />
        </div>

        <Reveal delay={100}>
          <h2 className="mt-20 text-sm font-semibold uppercase tracking-widest text-fg-muted">
            Education
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.degree} delay={i * 100}>
              <article>
                <h4 className="font-semibold">
                  {entry.org} <span className="text-fg-muted font-normal">— {entry.location}</span>
                </h4>
                <p className="text-sm text-fg-muted">{entry.degree}</p>
                {entry.meta.map((m) => (
                  <p key={m} className="text-sm text-fg-muted">
                    {m}
                  </p>
                ))}
                <p className="text-sm text-fg-muted">{entry.period}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
