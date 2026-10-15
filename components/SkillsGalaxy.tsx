"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { skills } from "@/lib/data";

const HUES: Record<string, { core: string; glow: string }> = {
  blue: { core: "#4da3ff", glow: "rgba(77,163,255,0.5)" },
  cyan: { core: "#22d3ee", glow: "rgba(34,211,238,0.5)" },
  violet: { core: "#a78bfa", glow: "rgba(167,139,250,0.5)" },
  amber: { core: "#f5c153", glow: "rgba(245,193,83,0.5)" },
};

// No progress bars. A galaxy: skills as planets, relationships as
// constellation lines. Hover a planet to read its dossier.
export default function SkillsGalaxy() {
  const [hover, setHover] = useState<string | null>(null);
  const active = skills.find((s) => s.id === hover) ?? null;
  const linked = new Set(active ? [active.id, ...active.links] : []);

  return (
    <Section
      id="skills"
      kicker="Skills Galaxy"
      title="A galaxy, not a bar chart."
      intro="Every skill is a planet. Every connection is a constellation. Hover to explore each world."
    >
      <div className="glass-deep edge-glow relative overflow-hidden rounded-3xl">
        <div
          className="relative mx-auto w-full"
          style={{ height: "min(72vh, 640px)", minHeight: 460 }}
        >
          {/* connection lines */}
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            {skills.flatMap((s) =>
              s.links
                .filter((l) => l > s.id) // draw each pair once
                .map((l) => {
                  const o = skills.find((k) => k.id === l);
                  if (!o) return null;
                  const isLit = linked.has(s.id) && linked.has(o.id);
                  return (
                    <motion.line
                      key={`${s.id}-${l}`}
                      x1={`${s.x}%`} y1={`${s.y}%`}
                      x2={`${o.x}%`} y2={`${o.y}%`}
                      stroke={isLit ? "var(--accent)" : "rgba(255,255,255,0.07)"}
                      strokeWidth={isLit ? 1.4 : 1}
                      strokeDasharray="4 6"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: "easeOut" }}
                      style={
                        isLit
                          ? { filter: "drop-shadow(0 0 4px var(--glow))" }
                          : undefined
                      }
                    />
                  );
                })
            )}
          </svg>

          {/* planets */}
          {skills.map((s, i) => {
            const hue = HUES[s.hue];
            const isActive = hover === s.id;
            const isDimmed = hover !== null && !linked.has(s.id);
            return (
              <button
                key={s.id}
                className="planet group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                onMouseEnter={() => setHover(s.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.id)}
                onBlur={() => setHover(null)}
                aria-label={s.name}
              >
                {/* entrance lives on an unscaled-layout wrapper: a scale(0)
                    initial on the positioned button zeroes its rect and the
                    in-view observer never fires */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 160, damping: 14 }}
                >
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                    scale: isActive ? 1.25 : isDimmed ? 0.9 : 1,
                    opacity: isDimmed ? 0.3 : 1,
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: 4 + (i % 5), ease: "easeInOut" },
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <span
                    className="relative block rounded-full"
                    style={{
                      width: s.size,
                      height: s.size,
                      background: `radial-gradient(circle at 32% 30%, ${hue.core}, #0a0f18 78%)`,
                      boxShadow: `0 0 ${isActive ? 34 : 16}px ${hue.glow}, inset -4px -6px 14px rgba(0,0,0,0.7)`,
                      transition: "box-shadow 0.3s",
                    }}
                  >
                    {/* ring for the automation "sun" */}
                    {s.id === "automation" && (
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 spin-slow"
                        style={{ width: s.size * 1.9, height: s.size * 0.75 }}
                      />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap font-mono text-[10px] tracking-wider transition-colors ${
                      isActive ? "text-fg" : "text-dim"
                    }`}
                  >
                    {s.name}
                  </span>
                </motion.div>
                </motion.div>
              </button>
            );
          })}

          {/* dossier card */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="glass-deep edge-glow pointer-events-none absolute bottom-4 left-4 right-4 z-10 rounded-2xl p-4 sm:left-auto sm:w-[320px]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: HUES[active.hue].core, boxShadow: `0 0 8px ${HUES[active.hue].glow}` }}
                  />
                  <span className="font-semibold text-fg">{active.name}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{active.desc}</p>
                <div className="mt-3 space-y-1 font-mono text-[10px] text-dim">
                  <div><span className="text-accent2">experience:</span> {active.exp}</div>
                  <div><span className="text-accent2">projects:</span> {active.projects}</div>
                  <div>
                    <span className="text-accent2">linked:</span>{" "}
                    {active.links
                      .map((l) => skills.find((k) => k.id === l)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
