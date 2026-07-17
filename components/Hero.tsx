"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { identity } from "@/lib/data";

// ---- neural network canvas: drifting nodes + proximity lines ----
function NeuralField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    let mx = -1e4, my = -1e4;
    type N = { x: number; y: number; vx: number; vy: number };
    let nodes: N[] = [];

    const resize = () => {
      const r = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(70, Math.floor((w * h) / 22000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const LINK = 130;
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx; n.y += n.vy;
          // gentle pull toward cursor
          const dx = mx - n.x, dy = my - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 200 * 200) { n.x += dx * 0.0012; n.y += dy * 0.0012; }
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const alpha = (1 - d / LINK) * 0.14;
            ctx.strokeStyle = `rgba(77,163,255,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(140,190,255,0.5)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 opacity-70" aria-hidden />;
}

// ---- headline with per-letter reveal ----
// Gradient is applied PER LETTER with an offset background-position:
// child transforms/filters would break background-clip:text on a parent.
function SplitLine({
  text,
  delay,
  className,
  gradient = false,
}: {
  text: string;
  delay: number;
  className?: string;
  gradient?: boolean;
}) {
  const letters = text.split("");
  const n = letters.length;
  return (
    <span className={`block ${className ?? ""}`} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          style={
            gradient
              ? {
                  backgroundImage:
                    "linear-gradient(100deg, #ffffff 15%, var(--accent) 55%, var(--accent-2) 90%)",
                  backgroundSize: `${n * 100}% 100%`,
                  backgroundPosition: `${(i / Math.max(n - 1, 1)) * 100}% 0`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }
              : undefined
          }
          initial={{ opacity: 0, y: "0.6em", rotateX: 60, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.028,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ booted }: { booted: boolean }) {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % identity.roles.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  if (!booted) return <section id="home" className="h-screen" />;

  return (
    <section id="home" className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <NeuralField />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* status chip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="glass mx-auto mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-muted"
        >
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#28c840]" />
          system online — currently building something better than yesterday
        </motion.div>

        {/* soft light pool behind the name (replaces text-shadow, which
            would paint glyph-shaped blobs over gradient-clipped text) */}
        <div
          className="pointer-events-none absolute left-1/2 top-[16%] -z-10 h-56 w-[80%] -translate-x-1/2 blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--glow), transparent 70%)", opacity: 0.5 }}
          aria-hidden
        />
        <h1 className="relative text-[clamp(2.6rem,9vw,7.5rem)] font-bold leading-[0.98] tracking-tighter">
          <SplitLine text="HAMZA SADIQ" delay={0.35} gradient />
        </h1>

        <div className="mt-6 text-[clamp(1.3rem,3.4vw,2.6rem)] font-medium tracking-tight text-fg/90">
          <SplitLine text="Engineering Quality." delay={1.0} />
          <SplitLine text="Building Systems." delay={1.35} />
          <SplitLine text="Always Improving." delay={1.7} className="text-muted" />
        </div>

        {/* rotating identity */}
        <div className="mt-10 flex h-8 items-center justify-center gap-3 font-mono text-sm text-muted">
          <span className="text-accent2">{">"}</span>
          <div className="relative h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -26, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block leading-8 text-accent"
              >
                {identity.roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="blink inline-block h-4 w-2 bg-accent" />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#os"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#04070c] transition-shadow hover:shadow-[0_0_40px_-8px_var(--glow)]"
            >
              Explore My World
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#projects" className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/40">
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a href="/Hamza-Sadiq-Resume.pdf" download className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/40">
              Download Resume <span className="text-accent2">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-fg">
              Contact Me
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#os"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-dim"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em]"
        >
          SCROLL
          <span className="block h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </motion.a>
    </section>
  );
}
