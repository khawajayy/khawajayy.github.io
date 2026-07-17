"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { achievements } from "@/lib/data";

export default function Achievements() {
  return (
    <Section
      id="achievements"
      kicker="Track Record"
      title="Receipts."
      intro="Claims are cheap. Here's what actually shipped."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-accent/25"
            data-cursor
          >
            <div
              className="pointer-events-none absolute -left-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "var(--glow)" }}
            />
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/30 bg-accent/10 font-mono text-[10px] text-accent">
                ✓
              </span>
              <div>
                <div className="font-semibold leading-snug text-fg">{a.title}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{a.note}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
