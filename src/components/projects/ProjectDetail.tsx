import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { TiltCard } from "@/components/motion/TiltCard";

const LINK_LABELS: Record<Project["links"][number]["kind"], string> = {
  repo: "View code",
  demo: "View demo",
  video: "Watch video",
  paper: "Read paper",
  other: "Open link",
};

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <section className="relative">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />
      <article className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <Link href="/projects/" className="text-sm text-fg-muted hover:text-fg">
            ← Back to projects
          </Link>

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-fg-muted">
            Case study
          </p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">{project.name}</h1>
          <p className="mt-2 text-lg text-fg-muted">{project.subtitle}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-fg-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        {project.links.length > 0 && (
          <Reveal delay={150}>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Magnetic key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{ background: "var(--color-accent)" }}
                  >
                    {link.label || LINK_LABELS[link.kind]}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <TiltCard className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl bg-black/10">
            <Image src={withBasePath(project.coverImage)} alt={project.name} fill className="object-cover" />
          </TiltCard>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 space-y-4 text-fg-muted">
            <p className="leading-relaxed">{project.description}</p>
            {project.body && <p className="leading-relaxed">{project.body}</p>}
          </div>
        </Reveal>

        {project.images.length > 1 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {project.images.slice(1).map((image, i) => (
              <Reveal key={image.src} delay={i * 100}>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black/10">
                  <Image src={withBasePath(image.src)} alt={image.alt} fill className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
