"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Shared cinematic section shell: kicker, big title, and reveal-on-scroll.
export default function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative z-10 px-6 py-28 md:py-40 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
              {kicker}
            </span>
          </div>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-fg md:text-6xl">
            {title}
          </h2>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {intro}
            </p>
          )}
        </motion.div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
