"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { projects, type Project } from "@/lib/data";

// 3D tilt card
function TiltCard({ p, onOpen, index }: { p: Project; onOpen: () => void; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 10, ry: (px - 0.5) * 12, gx: px * 100, gy: py * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setT({ rx: 0, ry: 0, gx: 50, gy: 50 })}
        onClick={onOpen}
        animate={{ rotateX: t.rx, rotateY: t.ry }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.6 }}
        className="glass group relative h-full cursor-pointer overflow-hidden rounded-2xl p-6 transition-colors hover:border-accent/30"
        style={{ transformStyle: "preserve-3d" }}
        data-cursor
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
      >
        {/* sheen that follows the cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(360px circle at ${t.gx}% ${t.gy}%, ${p.accent}14, transparent 60%)`,
          }}
        />
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest"
              style={{ color: p.accent, border: `1px solid ${p.accent}44`, background: `${p.accent}0d` }}
            >
              {p.tag}
            </span>
            <span className="font-mono text-[10px] text-dim">{p.domain}</span>
          </div>
          <h3 className="mt-4 text-xl font-semibold text-fg">{p.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted">
                {s}
              </span>
            ))}
            {p.stack.length > 4 && (
              <span className="px-1 font-mono text-[10px] text-dim">+{p.stack.length - 4}</span>
            )}
          </div>
          <div className="mt-5 flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors group-hover:text-accent">
            open case file <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const project = projects.find((p) => p.id === openId) ?? null;

  // lock scroll while modal open + escape to close
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project]);

  return (
    <Section
      id="projects"
      kicker="Projects"
      title="Case files, not screenshots."
      intro="Each project is a story about a problem that mattered. Open one."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.id} p={p} index={i} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      {/* immersive detail overlay */}
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.article
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              className="glass-deep edge-glow relative w-full max-w-2xl overflow-hidden rounded-3xl p-7 md:p-10"
            >
              <div
                className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 blur-3xl"
                style={{ background: `radial-gradient(ellipse, ${project.accent}2e, transparent 70%)` }}
              />
              <button
                onClick={() => setOpenId(null)}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/40 hover:text-fg"
                aria-label="Close"
              >
                ✕
              </button>
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                style={{ color: project.accent, border: `1px solid ${project.accent}44` }}
              >
                {project.domain} — {project.tag}
              </span>
              <h3 className="mt-5 text-3xl font-bold tracking-tight text-fg md:text-4xl">
                {project.name}
              </h3>
              <div className="mt-2 font-mono text-xs text-dim">
                case file // {project.id}
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted">{project.story}</p>
              <div className="mt-7">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
                  System components
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-fg"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
