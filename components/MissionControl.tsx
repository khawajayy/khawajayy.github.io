"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import Section from "./Section";
import { stats } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function MissionControl() {
  return (
    <Section
      id="mission-control"
      kicker="Mission Control"
      title="Measured, because it matters."
      intro="You can't improve what you don't measure. A live readout from the system."
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-colors hover:border-accent/25"
            data-cursor
          >
            <div
              className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "var(--glow)" }}
            />
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              {s.label}
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-fg md:text-4xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 h-px w-full bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06, duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
