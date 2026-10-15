"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Magnetic from "./Magnetic";
import { services, hats, identity } from "@/lib/data";

export default function Services() {
  return (
    <Section
      id="services"
      kicker="Services"
      title="What I take on."
      intro="Fixed-scope engagements or ongoing QA support, by contract. Lahore-based, remote-first, working US, EU and Gulf hours."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl border-l-2 border-l-accent/60 p-6 transition-colors hover:border-accent/30"
            data-cursor
          >
            <div className="font-mono text-[10px] tracking-[0.25em] text-accent2">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-fg">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.note}</p>
          </motion.div>
        ))}
      </div>

      {/* hats worn */}
      <div className="mt-16">
        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
          roles.history — hats I&apos;ve worn
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {hats.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass rounded-2xl p-5 transition-colors hover:border-accent/25"
              data-cursor
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                {h.icon}
              </span>
              <div className="mt-4 font-semibold text-fg">{h.title}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.note}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-deep edge-glow mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl p-7 md:flex-row md:items-center md:p-9"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent2">
            Next project
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-fg">
            Tell me what you&apos;re shipping.
          </p>
        </div>
        <Magnetic>
          <a
            href={`mailto:${identity.email}?subject=Project%20enquiry`}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#04070c] transition-shadow hover:shadow-[0_0_40px_-8px_var(--glow)]"
          >
            Start a conversation <span>→</span>
          </a>
        </Magnetic>
      </motion.div>
    </Section>
  );
}
