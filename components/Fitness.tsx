"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { fitness } from "@/lib/data";

function Ring({ label, value, index }: { label: string; value: number; index: number }) {
  const R = 42;
  const C = 2 * Math.PI * R;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass flex flex-col items-center rounded-2xl p-5 transition-colors hover:border-accent/25"
      data-cursor
    >
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
          <motion.circle
            cx="50" cy="50" r={R} fill="none"
            stroke="url(#ringGrad)" strokeWidth="7" strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.08, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-fg">
          {value}
        </div>
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
    </motion.div>
  );
}

export default function Fitness() {
  return (
    <Section
      id="fitness"
      kicker="Fitness Console"
      title="CI/CD for the body."
      intro="Training is treated like a pipeline: scheduled, monitored, non-negotiable. Consistency is the only PR that always merges."
    >
      {/* header strip: heartbeat + streak + mission */}
      <div className="glass-deep edge-glow mb-6 flex flex-col items-stretch gap-6 rounded-3xl p-6 md:flex-row md:items-center">
        {/* ECG */}
        <div className="flex-1">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
            System vitals
          </div>
          <svg viewBox="0 0 300 60" className="h-14 w-full">
            <path
              d="M0 30 H60 L72 30 78 12 86 48 92 22 98 30 H150 L162 30 168 10 176 50 182 24 188 30 H240 L252 30 258 14 266 46 272 22 278 30 H300"
              fill="none"
              stroke="var(--accent-2)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="600"
              style={{
                animation: "ecg-dash 3.2s linear infinite",
                filter: "drop-shadow(0 0 5px var(--glow))",
              }}
            />
          </svg>
        </div>
        {/* streak */}
        <div className="flex items-center gap-8 md:px-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">Streak</div>
            <div className="mt-1 text-4xl font-bold text-fg">
              {fitness.streak}
              <span className="ml-1 text-sm font-normal text-muted">days</span>
            </div>
          </div>
          {/* animated dumbbell */}
          <motion.div
            animate={{ rotate: [0, -14, 0, 14, 0], y: [0, -4, 0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
            className="text-4xl"
            aria-hidden
          >
            🏋️
          </motion.div>
        </div>
        {/* mission */}
        <div className="border-t border-line pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
            Current mission
          </div>
          <div className="mt-1 max-w-[220px] text-lg font-semibold leading-snug text-fg">
            {fitness.mission}
          </div>
          <div className="mt-1.5 font-mono text-[10px] text-accent2">status: in progress ●</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {fitness.rings.map((r, i) => (
          <Ring key={r.label} label={r.label} value={r.value} index={i} />
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-dim">
        {"// scores reflect system health, not vanity metrics — no body measurements published"}
      </p>
    </Section>
  );
}
