"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { investingPrinciples } from "@/lib/data";

// Compound growth curve: value = (1+r)^t, drawn as an SVG path.
function buildCurve(w: number, h: number, years = 30, rate = 0.09) {
  const maxV = Math.pow(1 + rate, years);
  const pts: string[] = [];
  for (let t = 0; t <= years; t++) {
    const x = (t / years) * w;
    const y = h - (Math.pow(1 + rate, t) / maxV) * (h - 12) - 6;
    pts.push(`${t === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

// A "linear effort" baseline for contrast.
function buildLinear(w: number, h: number) {
  return `M0 ${h - 6} L${w} ${h - (h - 12) * 0.28 - 6}`;
}

export default function Investing() {
  const W = 640;
  const H = 260;

  return (
    <Section
      id="investing"
      kicker="Investing"
      title="Philosophy over portfolio."
      intro="No portfolio screenshots, no hot takes. Just the boring principles that actually work — applied with the patience of an automation engineer."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* chart */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-deep edge-glow rounded-3xl p-6 lg:col-span-3"
        >
          <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
            <span>Compound growth — the long game</span>
            <span className="text-accent2">t → 30 years</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* grid */}
            {[0.25, 0.5, 0.75].map((f) => (
              <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            <defs>
              <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
              </linearGradient>
            </defs>
            {/* linear baseline */}
            <motion.path
              d={buildLinear(W, H)}
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            {/* compound fill */}
            <motion.path
              d={`${buildCurve(W, H)} L${W} ${H} L0 ${H} Z`}
              fill="url(#fillGrad)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 1 }}
            />
            {/* compound curve */}
            <motion.path
              d={buildCurve(W, H)}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ filter: "drop-shadow(0 0 6px var(--glow))" }}
            />
            {/* end glow dot */}
            <motion.circle
              cx={W} cy={18} r="4"
              fill="var(--accent-2)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.1 }}
              style={{ filter: "drop-shadow(0 0 8px var(--glow))" }}
            />
          </svg>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-dim">
            <span><span className="mr-1.5 inline-block h-px w-4 translate-y-[-2px] border-t border-dashed border-white/30" />linear effort</span>
            <span><span className="mr-1.5 inline-block h-0.5 w-4 translate-y-[-2px] rounded bg-gradient-to-r from-accent to-accent2" />compounding systems</span>
          </div>
        </motion.div>

        {/* principles */}
        <div className="space-y-3 lg:col-span-2">
          {investingPrinciples.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="glass group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:border-accent/25"
              data-cursor
            >
              <span className="mt-0.5 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="font-semibold text-fg">{p.title}</div>
                <div className="mt-0.5 text-xs text-muted">{p.note}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
