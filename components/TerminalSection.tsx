"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import { terminalResponses } from "@/lib/data";
import { emitEgg } from "@/lib/bus";

type Line = { text: string; kind: "in" | "out" | "ok" | "err" };

const BANNER: Line[] = [
  { text: "hamza://os interactive shell — v6.2", kind: "out" },
  { text: "type 'help' to see available commands.", kind: "out" },
  { text: "", kind: "out" },
];

export default function TerminalSection() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const push = (l: Line) => setLines((prev) => [...prev, l]);

  // stream output lines with a small delay for that boot-sequence feel
  const stream = (out: string[], kind: Line["kind"] = "out") => {
    queueRef.current = queueRef.current.then(
      () =>
        new Promise<void>((resolve) => {
          out.forEach((text, i) => {
            setTimeout(() => {
              push({ text, kind });
              if (i === out.length - 1) resolve();
            }, i * 90);
          });
          if (out.length === 0) resolve();
        })
    );
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    push({ text: `guest@hamza:~$ ${raw}`, kind: "in" });
    if (!cmd) return;

    setHistory((h) => [raw, ...h]);
    setHistIdx(-1);

    // easter eggs first
    if (cmd === "sudo hire hamza") {
      stream(
        [
          "[sudo] password for guest: ********",
          "Authenticating........... OK",
          "Checking qualifications.. EXCEEDED",
          "Initiating hire sequence.",
          "",
          "🎉 EXCELLENT DECISION. Contact channel opening below...",
        ],
        "ok"
      );
      setTimeout(() => emitEgg("confetti"), 1200);
      return;
    }
    if (cmd === "matrix") {
      stream(["Wake up, Neo...", "The Matrix has you.", "Follow the white rabbit. 🐇", "(type 'matrix' again to exit)"], "ok");
      emitEgg("matrix");
      return;
    }
    if (cmd === "football") {
      stream(["⚽ Stadium lights: ON. It's coming home."], "ok");
      emitEgg("football");
      return;
    }
    if (cmd === "clear") {
      setLines(BANNER);
      return;
    }
    if (cmd === "sudo" || cmd.startsWith("sudo ")) {
      stream(["guest is not in the sudoers file. This incident will be reported.", "(hint: there is exactly one sudo command that works here)"], "err");
      return;
    }
    if (cmd === "resume") {
      stream(terminalResponses.resume, "ok");
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = "/Hamza-Sadiq-Resume.pdf";
        a.download = "";
        a.click();
      }, 700);
      return;
    }

    const res = terminalResponses[cmd];
    if (res) {
      stream(res);
    } else {
      stream([`command not found: ${cmd}`, "type 'help' for available commands."], "err");
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, history.length - 1);
      if (history[ni]) {
        setHistIdx(ni);
        setInput(history[ni]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = histIdx - 1;
      setHistIdx(ni);
      setInput(ni >= 0 ? history[ni] : "");
    }
  };

  return (
    <Section
      id="terminal"
      kicker="Terminal"
      title="Talk to the machine."
      intro="A real shell into this site. Start with 'help'. Some commands are not documented."
    >
      <div
        className="scanlines glass-deep edge-glow relative overflow-hidden rounded-2xl font-mono text-[13px]"
        onClick={() => inputRef.current?.focus()}
        data-cursor
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs text-dim">guest@hamza — zsh</span>
        </div>
        <div ref={scrollRef} className="h-[380px] overflow-y-auto p-4">
          {lines.map((l, i) => (
            <div
              key={i}
              className={
                l.kind === "in"
                  ? "text-fg"
                  : l.kind === "ok"
                  ? "text-[#5ee1a2]"
                  : l.kind === "err"
                  ? "text-[#ff7a70]"
                  : "text-[#9fb3c8]"
              }
            >
              {l.text || " "}
            </div>
          ))}
          <div className="flex items-center gap-2 text-fg">
            <span className="shrink-0 text-accent">guest@hamza:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="w-full bg-transparent outline-none placeholder:text-dim"
              placeholder="try: help"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
