"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Highlight } from "@/components/motion/Highlight";
import { TypewriterText } from "@/components/motion/TypewriterText";
import { PAGE_COLORS } from "@/lib/pageColors";

type Status = "idle" | "sending" | "sent" | "error";

const PROMPT_TEXT = "send-message --to=octavio";

const fieldClass =
  "min-w-0 flex-1 border-b border-[var(--terminal-border)] bg-transparent py-1 outline-none transition-colors focus:border-[var(--color-accent-2)] placeholder:opacity-40";

function FieldRow({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-1.5 sm:gap-2">
      <label htmlFor={id} className="shrink-0 select-none" style={{ color: "var(--color-accent-2)" }}>
        {label}
      </label>
      <span aria-hidden="true" style={{ color: "var(--terminal-fg-muted)" }}>
        {">"}
      </span>
      {children}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", site.web3formsAccessKey);
    data.append("subject", `New message from ${data.get("name") || "the site"}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-secondary)]">
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <Reveal className="lg:max-w-sm lg:shrink-0">
          <h1
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.contact }}
          >
            Contact
          </h1>
          <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
            Let&rsquo;s <Highlight color={PAGE_COLORS.contact}>connect</Highlight>.
          </h3>
          <p className="mt-4 max-w-sm text-fg-muted">
            I&rsquo;m actively looking for entry-level roles in Product Design, SWE,
            and FDE. Reach out if that sounds like a fit.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                data-cursor-hover
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: "var(--color-accent)" }}
              >
                Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-[var(--color-bg)]"
              >
                LinkedIn
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={120} className="w-full lg:max-w-xl">
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
              <span className="ml-2 font-mono text-sm" style={{ color: "var(--terminal-fg-muted)" }}>
                compose-message.sh
              </span>
            </div>

            <div className="p-6 font-mono text-sm sm:p-8 sm:text-base" style={{ color: "var(--terminal-fg)" }}>
              <p>
                <span style={{ color: "var(--color-accent-2)" }}>{"$ "}</span>
                <TypewriterText text={PROMPT_TEXT} speedMs={40} />
              </p>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <FieldRow id="contact-name" label="name">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="jane doe"
                    className={fieldClass}
                    style={{ color: "var(--terminal-fg)" }}
                  />
                </FieldRow>

                <FieldRow id="contact-email" label="email">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@email.com"
                    className={fieldClass}
                    style={{ color: "var(--terminal-fg)" }}
                  />
                </FieldRow>

                <div className="flex items-start gap-1.5 sm:gap-2">
                  <label
                    htmlFor="contact-message"
                    className="shrink-0 select-none pt-1"
                    style={{ color: "var(--color-accent-2)" }}
                  >
                    message
                  </label>
                  <span aria-hidden="true" className="pt-1" style={{ color: "var(--terminal-fg-muted)" }}>
                    {">"}
                  </span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    required
                    placeholder="say hi, or ask me anything..."
                    className={`${fieldClass} resize-none`}
                    style={{ color: "var(--terminal-fg)" }}
                  />
                </div>

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    data-cursor-hover
                    className="mt-2 w-fit underline decoration-dotted underline-offset-4 transition-opacity disabled:opacity-50"
                    style={{ color: "var(--color-accent-2)" }}
                  >
                    {status === "sending" ? "sending..." : "[enter] send_message()"}
                  </button>
                </Magnetic>

                {status === "sent" && (
                  <p style={{ color: "var(--color-accent-3)" }}>✓ message sent — talk soon.</p>
                )}
                {status === "error" && (
                  <p style={{ color: "var(--terminal-fg-muted)" }}>
                    ✗ send failed —{" "}
                    <a href={`mailto:${site.email}`} className="underline" style={{ color: "var(--terminal-fg)" }}>
                      email me directly
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
