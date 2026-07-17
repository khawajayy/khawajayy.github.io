"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { missions } from "@/lib/data";

// Derek Sivers-style "Now" page rendered as a live mission dashboard.
export default function Now() {
  return (
    <Section
      id="now"
      kicker="Now"
      title="Active missions."
      intro="What I'm focused on right now — not a résumé, a live dashboard. Inspired by Derek Sivers' /now movement."
    >
      <div className="glass-deep edge-glow rounded-3xl p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between font-mono text-xs text-dim">
          <span className="flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            MISSION CONTROL — LIVE
          </span>
          <span>uptime: continuous</span>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          {missions.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <div className="mb-2 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-fg">{m.label}</span>
                <span className="font-mono text-[10px] tracking-wider text-accent2">
                  {m.status}
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                    boxShadow: "0 0 12px var(--glow)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 border-t border-line pt-5 font-mono text-xs text-dim">
          <span className="text-accent">$</span> next review: continuous —
          missions update as life ships new versions
        </div>
      </div>
    </Section>
  );
}
