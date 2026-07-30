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

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-2xl items-center px-4 py-16">
        <div
          className="w-full overflow-hidden rounded-xl border border-[var(--color-border)] shadow-2xl"
          style={{ background: "#0d0d0d" }}
        >
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#1a1a1a" }}>
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-2 font-mono text-xs text-white/40">
              {site.name.toLowerCase().replace(/\s+/g, ".")} — query
            </span>
          </div>

          <div className="p-6 font-mono text-sm text-white/90 sm:p-8 sm:text-base">
            <p>
              <span style={{ color: "var(--color-accent-2)" }}>{"> "}</span>
              <TypewriterText text={site.terminalIntro.query} speedMs={TYPE_SPEED_MS} />
            </p>

            <Reveal delay={ANSWER_DELAY}>
              <div className="mt-8 flex gap-5 sm:gap-6">
                <TiltCard className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:h-28 sm:w-28">
                  <Image
                    src={withBasePath("/images/avatar.jpg")}
                    alt={site.name}
                    fill
                    priority
                    className="object-cover"
                  />
                </TiltCard>

                <div className="min-w-0">
                  <h1 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                    {site.name.toUpperCase()}
                  </h1>
                  <p className="mt-1 text-white/50">{site.terminalIntro.roleTags.join(" / ")}</p>

                  <p className="mt-4 text-white/70">{site.terminalIntro.currentLine}</p>
                  <p className="text-white/70">{site.terminalIntro.quirkyLine}</p>

                  <p className="mt-4" style={{ color: "var(--color-accent-2)" }}>
                    {`// ${site.terminalIntro.availabilityLine}`}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={ANSWER_DELAY + 200}>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <span className="text-white/40">_</span>
                <Link
                  href={site.terminalIntro.cta.href}
                  className="font-semibold underline decoration-dashed underline-offset-4"
                  style={{ color: "var(--color-accent-2)" }}
                >
                  {site.terminalIntro.cta.label} →
                </Link>
                <span
                  className="h-4 w-2 animate-pulse"
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
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/60 transition-colors hover:text-white"
                      >
                        <Icon size={15} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div
            className="border-t border-white/10 px-4 py-2 text-center font-mono text-[10px] text-white/30"
            style={{ background: "#1a1a1a" }}
          >
            ■ {site.name.toUpperCase().replace(/\s+/g, ".")} ■ v1.0 ■
          </div>
        </div>
      </div>
    </section>
  );
}
