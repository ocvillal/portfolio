import Image from "next/image";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";
import { ScrambleText } from "@/components/motion/ScrambleText";
import { Magnetic } from "@/components/motion/Magnetic";

const CONTACT_LINKS = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: LinkedinIcon, bg: "#0a66c2" },
  { label: "GitHub", href: site.socials.github, icon: GithubIcon, bg: "#24292f" },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail, bg: "#f97316" },
  { label: "Résumé", href: withBasePath(site.resumeHref), icon: FileText, bg: "#e11d48" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <Image
              src={withBasePath("/images/avatar.jpg")}
              alt={site.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-fg-muted">I&rsquo;m {site.name}, and I enjoy</p>

            <h1 className="mt-2 text-4xl font-black leading-[1.05] sm:text-5xl md:text-6xl">
              <ScrambleText text="Building AI systems" className="block text-fg" />
              <ScrambleText
                text="from research to production 🚀"
                className="block"
                style={{ color: "var(--color-accent)" }}
                delay={300}
              />
            </h1>

            <p className="mt-5 text-xl font-bold text-fg">Computer Scientist &amp; AI Engineer</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {CONTACT_LINKS.map(({ label, href, icon: Icon, bg }) => (
                <Magnetic key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
                    rel={href.startsWith("http") || href.endsWith(".pdf") ? "noreferrer" : undefined}
                    aria-label={label}
                    data-cursor-hover
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ background: bg }}
                  >
                    <Icon size={20} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
