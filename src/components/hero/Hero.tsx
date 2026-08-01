import Image from "next/image";
import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Magnetic } from "@/components/motion/Magnetic";
import { TerminalFooter } from "@/components/hero/TerminalFooter";

const CONTACT_LINKS = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: site.socials.github, icon: GithubIcon },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
  { label: "Résumé", href: withBasePath(site.resumeHref), icon: FileText },
];

const TYPE_SPEED_MS = 45;
const ANSWER_DELAY = site.terminalIntro.query.length * TYPE_SPEED_MS + 300;

export function Hero() {
  return (
    <section id="home-intro" className="relative overflow-hidden">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center px-4 py-16">
        <div
          className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-2xl"
          style={{ background: "var(--terminal-bg)" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-4"
            style={{ background: "var(--terminal-bg-secondary)" }}
          >
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: "#27c93f" }} />
            <span
              className="ml-2 font-mono text-sm"
              style={{ color: "var(--terminal-fg-muted)" }}
            >
              {site.name.toLowerCase().replace(/\s+/g, ".")} — query
            </span>
          </div>

          <div
            className="p-8 font-mono text-base sm:p-10 sm:text-lg"
            style={{ color: "var(--terminal-fg)" }}
          >
            <p>
              <span style={{ color: "var(--color-accent-2)" }}>{"> "}</span>
              <TypewriterText text={site.terminalIntro.query} speedMs={TYPE_SPEED_MS} />
            </p>

            <Reveal delay={ANSWER_DELAY}>
              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
                <TiltCard className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--terminal-border)] sm:h-32 sm:w-32">
                  <Image
                    src={withBasePath("/images/avatar.jpg")}
                    alt={site.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </TiltCard>

                <div className="min-w-0 max-w-2xl">
                  <h1 className="text-xl font-bold tracking-wide sm:text-2xl">
                    {site.name.toUpperCase()}
                  </h1>
                  <p className="mt-1" style={{ color: "var(--terminal-fg-muted)" }}>
                    {site.terminalIntro.roleTags.join(" / ")}
                  </p>

                  <div className="mt-4 space-y-1.5" style={{ color: "var(--terminal-fg-muted)" }}>
                    {site.terminalIntro.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <p className="mt-4" style={{ color: "var(--color-accent-2)" }}>
                    {`// ${site.terminalIntro.availabilityLine}`}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={ANSWER_DELAY + 200}>
              <div
                className="mt-8 flex flex-wrap items-center gap-4 border-t pt-6"
                style={{ borderColor: "var(--terminal-border)" }}
              >
                <span style={{ color: "var(--terminal-fg-muted)" }}>_</span>
                <Link
                  href={site.terminalIntro.cta.href}
                  className="font-semibold underline decoration-dashed underline-offset-4"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  {site.terminalIntro.cta.label} →
                </Link>
                <span
                  className="h-4 w-2 animate-terminal-blink"
                  style={{ background: "var(--color-accent-2)" }}
                  aria-hidden="true"
                />

                <div className="ml-auto flex gap-2">
                  {CONTACT_LINKS.map(({ label, href, icon: Icon }) => (
                    <Magnetic key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                        rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
                        aria-label={label}
                        data-cursor-hover
                        className="flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
                        style={{ borderColor: "var(--terminal-border)", color: "var(--terminal-fg-muted)" }}
                      >
                        <Icon size={16} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <TerminalFooter />
        </div>
      </div>
    </section>
  );
}
