"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiKnowledge, aiFallback } from "@/lib/data";

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "Who is Hamza?",
  "What projects has he worked on?",
  "What is his testing philosophy?",
  "Why AI?",
  "How can I contact him?",
];

// Client-side "Jarvis": keyword-scored retrieval over the site's
// knowledge base, with a typing effect. No API key, no latency.
function answer(q: string): string {
  const lower = q.toLowerCase();
  let best: { score: number; answer: string } = { score: 0, answer: aiFallback };
  for (const item of aiKnowledge) {
    let score = 0;
    for (const kw of item.keywords) {
      if (lower.includes(kw)) score += kw.length; // longer matches weigh more
    }
    if (score > best.score) best = { score, answer: item.answer };
  }
  return best.answer;
}

export default function AskHamza() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hamza AI online. Ask me anything about him — projects, skills, philosophy, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = (q: string) => {
    if (!q.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    const full = answer(q);
    // typewriter reveal
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: "" }]);
      let i = 0;
      const iv = setInterval(() => {
        i += 3;
        setMsgs((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "ai", text: full.slice(0, i) };
          return copy;
        });
        if (i >= full.length) {
          clearInterval(iv);
          setTyping(false);
        }
      }, 14);
    }, 550);
  };

  return (
    <>
      {/* floating launcher */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="glass-deep edge-glow fixed bottom-5 right-5 z-[600] flex h-13 items-center gap-2.5 rounded-full px-4 py-3"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask Hamza AI"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-accent/20 pulse-dot" />
          <span className="text-sm">✦</span>
        </span>
        <span className="hidden font-mono text-xs text-fg sm:block">Ask Hamza AI</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="glass-deep edge-glow fixed bottom-20 right-5 z-[600] flex h-[480px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  ✦
                  <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#050505] bg-[#28c840]" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-fg">Hamza AI</div>
                  <div className="font-mono text-[9px] text-dim">trained on this site · always online</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-dim hover:text-fg" aria-label="Close chat">✕</button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-accent text-[#04070c]"
                        : "rounded-bl-sm border border-line bg-white/[0.04] text-fg"
                    }`}
                  >
                    {m.text}
                    {m.role === "ai" && i === msgs.length - 1 && typing && (
                      <span className="blink ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* suggestions */}
            {msgs.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Hamza..."
                className="flex-1 rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-fg outline-none placeholder:text-dim focus:border-accent/50"
              />
              <button
                type="submit"
                disabled={typing}
                className="rounded-xl bg-accent px-3.5 text-sm font-semibold text-[#04070c] disabled:opacity-50"
                aria-label="Send"
              >
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
