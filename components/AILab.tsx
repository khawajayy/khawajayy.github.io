"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { aiLab } from "@/lib/data";

const GROUPS = [
  { key: "experiments", label: "Current Experiments", icon: "⚗", items: aiLab.experiments },
  { key: "ideas", label: "Future Ideas", icon: "✦", items: aiLab.ideas },
  { key: "learning", label: "Things I'm Learning", icon: "◎", items: aiLab.learning },
  { key: "problems", label: "Interesting Problems", icon: "?", items: aiLab.problems },
];

export default function AILab() {
  return (
    <Section
      id="ai-lab"
      kicker="AI Lab"
      title="The laboratory."
      intro="Where quality engineering meets artificial intelligence. Everything in here is an open experiment."
    >
      {/* lab ambiance */}
      <div className="relative">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[80%] -translate-x-1/2 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.12), transparent 70%)" }}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: gi * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent2/30 bg-accent2/10 text-accent2">
                  {g.icon}
                </span>
                <h3 className="font-semibold text-fg">{g.label}</h3>
              </div>
              <div className="space-y-3">
                {g.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="group rounded-xl border border-line bg-white/[0.02] p-3.5 transition-colors hover:border-accent2/30"
                    data-cursor
                  >
                    <div className="flex items-center gap-2 text-sm font-medium text-fg">
                      <span className="pulse-dot h-1 w-1 rounded-full bg-accent2" />
                      {item.title}
                    </div>
                    <p className="mt-1 pl-3 text-xs text-muted">{item.note}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center font-mono text-xs text-dim"
        >
          thesis: <span className="text-accent2">AI doesn&apos;t replace quality engineers — it multiplies them.</span>
        </motion.div>
      </div>
    </Section>
  );
}
