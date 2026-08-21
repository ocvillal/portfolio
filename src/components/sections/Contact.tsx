"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { site } from "@/data/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Highlight } from "@/components/motion/Highlight";
import { PAGE_COLORS } from "@/lib/pageColors";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm outline-none transition-colors focus:border-[var(--color-accent)]";

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
    <section className="bg-[var(--color-bg-secondary)]">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <h1
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: PAGE_COLORS.contact }}
          >
            Contact
          </h1>
          <h3 className="mt-4 text-3xl font-bold sm:text-4xl">
            Let&rsquo;s build <Highlight color={PAGE_COLORS.contact}>something</Highlight>.
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

        <Reveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
          >
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold text-fg-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className={`mt-1 ${inputClass}`}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold text-fg-muted">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 ${inputClass}`}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold text-fg-muted">
                  What&rsquo;s up?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className={`mt-1 ${inputClass} resize-none`}
                />
              </div>

              <Magnetic>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor-hover
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                  style={{ background: "var(--color-accent)" }}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </Magnetic>

              {status === "sent" && (
                <p className="text-sm" style={{ color: "var(--color-accent-3)" }}>
                  Thanks — I&rsquo;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-fg-muted">
                  Something went wrong — try again, or{" "}
                  <a href={`mailto:${site.email}`} className="underline">
                    email me directly
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
