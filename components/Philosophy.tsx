"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { philosophies } from "@/lib/data";

function Principle({ title, sub, index }: { title: string; sub: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} className="flex min-h-[70vh] items-center justify-center px-6">
      <motion.div style={{ opacity, scale, y }} className="max-w-4xl text-center">
        <div className="mb-6 font-mono text-xs tracking-[0.4em] text-accent">
          PRINCIPLE {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="text-4xl font-bold leading-tight tracking-tight text-fg md:text-7xl">
          {title.split(" ").map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </h3>
        <p className="mx-auto mt-6 max-w-md text-base text-muted md:text-lg">{sub}</p>
      </motion.div>
    </div>
  );
}

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative z-10 py-20">
      <div className="mx-auto mb-4 max-w-6xl px-6">
        <div className="flex items-center gap-3">
          <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
            Operating Principles
          </span>
        </div>
      </div>
      {philosophies.map((p, i) => (
        <Principle key={p.title} title={p.title} sub={p.sub} index={i} />
      ))}
    </section>
  );
}
