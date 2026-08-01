"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/data/site";
import { withBasePath } from "@/lib/paths";

const ROUTES: Record<string, string> = {
  "~": "/",
  home: "/",
  about: "/about",
  projects: "/projects",
  publications: "/publications",
  experience: "/experience",
  pics: "/pics",
  photos: "/pics",
  contact: "/contact",
};

type LogEntry = { input: string; output: string[] };

const HELP_LINES = [
  "cd <page>     — navigate (~, about, projects, publications, experience, pics, contact)",
  "ls            — list pages",
  "cat resume    — open my résumé",
  "whoami        — a one-line summary",
  "open github   — open my GitHub profile",
  "open linkedin — open my LinkedIn profile",
  "open email    — compose an email",
  "sudo hire-me  — you know what to do",
  "clear         — clear this log",
  "help          — show this again",
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [log, setLog] = useState<LogEntry[]>([
    { input: "", output: ["Type `help` to see available commands."] },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function run(raw: string) {
    const command = raw.trim();
    if (!command) return;

    const [cmd, ...rest] = command.toLowerCase().split(/\s+/);
    const arg = rest.join(" ");

    if (cmd === "clear") {
      setLog([]);
      return;
    }

    if (cmd === "help") {
      setLog((prev) => [...prev, { input: command, output: HELP_LINES }]);
      return;
    }

    if (cmd === "ls") {
      setLog((prev) => [
        ...prev,
        { input: command, output: [Object.keys(ROUTES).filter((k) => k !== "~").join("  ")] },
      ]);
      return;
    }

    if (cmd === "cd") {
      const path = ROUTES[arg];
      if (path) {
        setLog((prev) => [...prev, { input: command, output: [`navigating to ${path || "/"}...`] }]);
        router.push(path);
        setOpen(false);
      } else {
        setLog((prev) => [...prev, { input: command, output: [`cd: no such page: ${arg}`] }]);
      }
      return;
    }

    if (cmd === "cat" && arg === "resume") {
      window.open(withBasePath(site.resumeHref), "_blank", "noreferrer");
      setLog((prev) => [...prev, { input: command, output: ["opening resume.pdf..."] }]);
      return;
    }

    if (cmd === "whoami") {
      setLog((prev) => [...prev, { input: command, output: [site.tagline] }]);
      return;
    }

    if (cmd === "open" && arg === "github") {
      window.open(site.socials.github, "_blank", "noreferrer");
      setLog((prev) => [...prev, { input: command, output: ["opening github..."] }]);
      return;
    }

    if (cmd === "open" && arg === "linkedin") {
      window.open(site.socials.linkedin, "_blank", "noreferrer");
      setLog((prev) => [...prev, { input: command, output: ["opening linkedin..."] }]);
      return;
    }

    if (cmd === "open" && arg === "email") {
      window.location.href = `mailto:${site.email}`;
      setLog((prev) => [...prev, { input: command, output: [`composing email to ${site.email}...`] }]);
      return;
    }

    if (cmd === "sudo" && arg === "hire-me") {
      setLog((prev) => [
        ...prev,
        { input: command, output: ["permission granted. redirecting to /contact..."] },
      ]);
      router.push("/contact");
      setOpen(false);
      return;
    }

    setLog((prev) => [
      ...prev,
      { input: command, output: [`command not found: ${cmd} — type 'help'`] },
    ]);
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-[150] hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/90 px-3 py-2 font-mono text-xs text-fg-muted shadow-lg backdrop-blur transition-transform hover:scale-105 sm:flex"
      >
        <kbd className="rounded border border-[var(--color-border)] px-1.5 py-0.5">⌘K</kbd>
        <span>explore</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-sm sm:pt-[16vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--color-border)] shadow-2xl"
        style={{ background: "var(--terminal-bg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "var(--terminal-bg-secondary)" }}
        >
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f56" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#27c93f" }} />
          <span className="ml-2 font-mono text-xs" style={{ color: "var(--terminal-fg-muted)" }}>
            octavio.villalobos — shell
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto p-4 font-mono text-sm" style={{ color: "var(--terminal-fg)" }}>
          {log.map((entry, i) => (
            <div key={i} className="mb-2">
              {entry.input && (
                <p>
                  <span style={{ color: "var(--color-accent-2)" }}>{"> "}</span>
                  {entry.input}
                </p>
              )}
              {entry.output.map((line, j) => (
                <p key={j} style={{ color: "var(--terminal-fg-muted)" }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <form
          className="flex items-center gap-2 border-t px-4 py-3"
          style={{ borderColor: "var(--terminal-border)" }}
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <span style={{ color: "var(--color-accent-2)" }}>{">"}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            placeholder="type a command..."
            className="w-full bg-transparent font-mono text-sm outline-none"
            style={{ color: "var(--terminal-fg)" }}
          />
        </form>
      </div>
    </div>
  );
}
