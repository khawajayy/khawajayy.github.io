"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { timeline, roadmap } from "@/lib/data";

// Cinematic vertical timeline + glowing future roadmap.
export default function Journey() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section
      id="journey"
      kicker="The Journey"
      title="Every era added a new form of leverage."
      intro="From life-critical healthcare systems to payment networks to building quality functions from zero — a story of compounding skill."
    >
      {/* ---- Timeline ---- */}
      <div ref={railRef} className="relative ml-3 md:ml-6">
        {/* rail */}
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
        <motion.div
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            scaleY: lineScale,
            height: "100%",
            background: "linear-gradient(180deg, var(--accent), var(--accent-2))",
            boxShadow: "0 0 12px var(--glow)",
          }}
        />

        <div className="space-y-10">
          {timeline.map((t, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={t.era}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-10 md:pl-14"
              >
                {/* node */}
                <span className="absolute -left-[7px] top-2 flex h-[15px] w-[15px] items-center justify-center">
                  <span className="absolute h-full w-full rounded-full bg-accent/20" />
                  <span
                    className={`h-2 w-2 rounded-full ${
                      i === timeline.length - 1 ? "pulse-dot bg-accent2" : "bg-accent"
                    }`}
                    style={{ boxShadow: "0 0 10px var(--glow)" }}
                  />
                </span>
                {/* connector to card */}
                <span className="absolute left-2 top-[9px] h-px w-8 bg-gradient-to-r from-accent/60 to-transparent md:w-12" />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`glass w-full rounded-2xl p-5 text-left transition-colors md:p-6 ${
                    isOpen ? "border-accent/40 edge-glow" : "hover:border-accent/25"
                  }`}
                  data-cursor
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent2">
                        {t.period}
                      </div>
                      <h3 className="mt-1 text-xl font-semibold text-fg md:text-2xl">
                        {t.era}
                      </h3>
                      <div className="mt-0.5 text-sm text-muted">{t.role}</div>
                    </div>
                    <span className="font-mono text-xs text-dim">{isOpen ? "−" : "+"}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm leading-relaxed text-muted">{t.detail}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {t.stack.map((s) => (
                            <span key={s} className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-accent">
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---- Roadmap ---- */}
      <div className="mt-28">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-fg md:text-3xl"
        >
          The roadmap ahead<span className="text-accent">.</span>
        </motion.h3>
        <p className="mt-2 max-w-xl text-sm text-muted">
          The next versions are already planned. Shipping in order.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-0 md:flex-row md:items-center">
          {roadmap.map((r, i) => (
            <div key={r.step} className="flex flex-1 flex-col items-center md:flex-row">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`glass w-full rounded-xl px-4 py-3.5 text-center md:min-h-[76px] md:flex md:flex-col md:justify-center ${
                  r.state === "current"
                    ? "border-accent/50 edge-glow"
                    : r.state === "done"
                    ? "opacity-80"
                    : ""
                }`}
              >
                <div className="text-[13px] font-medium leading-tight text-fg">{r.step}</div>
                <div
                  className={`mt-1 font-mono text-[9px] uppercase tracking-widest ${
                    r.state === "current"
                      ? "text-accent2"
                      : r.state === "done"
                      ? "text-[#28c840]"
                      : "text-dim"
                  }`}
                >
                  {r.state === "done" ? "✓ shipped" : r.state === "current" ? "● in progress" : "queued"}
                </div>
              </motion.div>
              {i < roadmap.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                  className="flex items-center justify-center py-1 text-accent md:px-1 md:py-0"
                >
                  <span className="rotate-90 md:rotate-0" style={{ textShadow: "0 0 12px var(--glow)" }}>
                    →
                  </span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
