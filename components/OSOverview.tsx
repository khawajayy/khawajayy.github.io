"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { osModules } from "@/lib/data";

// "Hamza as an operating system" — a process table of life modules.
export default function OSOverview() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section
      id="os"
      kicker="System Overview"
      title="Hamza, as an operating system."
      intro="No biography walls of text. These are the processes running right now — click any module to inspect it."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {osModules.map((m, i) => {
          const open = active === m.id;
          return (
            <motion.button
              key={m.id}
              layout
              onClick={() => setActive(open ? null : m.id)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`glass group relative overflow-hidden rounded-2xl p-5 text-left transition-colors duration-300 ${
                open ? "border-accent/40 edge-glow" : "hover:border-accent/25"
              }`}
              data-cursor
            >
              {/* ambient corner light */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--glow)" }}
              />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-[#0b0f16] text-lg text-accent">
                    {m.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-fg">{m.title}</div>
                    <div className="font-mono text-[11px] text-dim">{m.name}</div>
                  </div>
                </div>
                <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] tracking-wider text-accent2">
                  {m.status}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm leading-relaxed text-muted">{m.detail}</p>
                    <div className="mt-3 h-1 w-full overflow-hidden rounded bg-line">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-accent2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 font-mono text-[10px] text-dim">
                {open ? "▾ click to collapse" : "▸ click to inspect"}
              </div>
            </motion.button>
          );
        })}
      </div>
    </Section>
  );
}
