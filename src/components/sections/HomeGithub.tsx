import { GithubActivity } from "@/components/github/GithubActivity";
import { GithubContributions } from "@/components/github/GithubContributions";
import { Reveal } from "@/components/motion/Reveal";

export function HomeGithub() {
  return (
    <section className="bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-fg-muted">
            Recent GitHub activity
          </h4>
          <div className="mt-4">
            <GithubActivity />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-16">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-fg-muted">GitHub</h4>
            <div className="mt-6">
              <GithubContributions />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
