"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onEgg } from "@/lib/bus";

// ------------------------- Confetti ---------------------------
function Confetti({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  // keep the latest callback without re-running the effect —
  // a changing onDone identity would reset the burst forever
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const colors = ["#4da3ff", "#22d3ee", "#f5c153", "#a78bfa", "#5ee1a2", "#ff7a70"];
    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number; va: number };
    const parts: P[] = Array.from({ length: 220 }, () => ({
      x: innerWidth / 2 + (Math.random() - 0.5) * 200,
      y: innerHeight * 0.6,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 6,
      r: Math.random() * 5 + 3,
      c: colors[(Math.random() * colors.length) | 0],
      a: Math.random() * Math.PI,
      va: (Math.random() - 0.5) * 0.3,
    }));
    let raf = 0;
    let frames = 0;
    const draw = () => {
      frames++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.va;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        ctx.restore();
      }
      if (frames < 220) raf = requestAnimationFrame(draw);
      else onDoneRef.current();
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-[900] pointer-events-none" />;
}

// ------------------------ Matrix rain -------------------------
function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    document.documentElement.classList.add("theme-matrix");
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const CHARS = "アイウエオカキクケコ01<>/{}=+*#$";
    const cols = Math.floor(innerWidth / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -60);
    let raf = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(3,8,4,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        ctx.fillStyle = Math.random() > 0.975 ? "#d8ffe8" : "#34d17b";
        ctx.fillText(ch, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("theme-matrix");
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-[850] pointer-events-none opacity-60"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// ------------------------ Football mode -----------------------
function FootballMode({ onClose }: { onClose: () => void }) {
  const [kicks, setKicks] = useState(0);
  const [crowd, setCrowd] = useState(false);
  const audioRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const ballControls = useRef<HTMLDivElement>(null);
  const [ballAnim, setBallAnim] = useState(0);

  // synthesized crowd noise — filtered white noise, no audio assets
  useEffect(() => {
    if (!crowd) {
      audioRef.current?.gain.gain.setTargetAtTime(0, audioRef.current.ctx.currentTime, 0.2);
      return;
    }
    if (!audioRef.current) {
      const ctx = new AudioContext();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        // brown-ish noise sounds like a distant crowd
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 600;
      filter.Q.value = 0.5;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start();
      audioRef.current = { ctx, gain };
    }
    audioRef.current.gain.gain.setTargetAtTime(0.25, audioRef.current.ctx.currentTime, 0.3);
    return () => {
      audioRef.current?.gain.gain.setTargetAtTime(0, audioRef.current.ctx.currentTime, 0.2);
    };
  }, [crowd]);

  useEffect(
    () => () => {
      audioRef.current?.ctx.close();
    },
    []
  );

  const kick = () => {
    setKicks((k) => k + 1);
    setBallAnim((b) => b + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[860] flex flex-col items-center justify-center overflow-hidden bg-black/85 backdrop-blur-md"
    >
      {/* stadium lights */}
      {[12, 38, 62, 88].map((x, i) => (
        <div
          key={x}
          className="absolute -top-10"
          style={{
            left: `${x}%`,
            width: 260,
            height: "80vh",
            transformOrigin: "top center",
            transform: `translateX(-50%) rotate(${(i - 1.5) * 6}deg)`,
            background:
              "linear-gradient(180deg, rgba(255,255,240,0.20), rgba(255,255,240,0.02) 70%, transparent)",
            clipPath: "polygon(42% 0, 58% 0, 100% 100%, 0% 100%)",
            animation: `stadium-flicker ${3 + i * 0.7}s ease-in-out infinite`,
          }}
        />
      ))}
      {/* pitch line */}
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-[#0a3d1e] to-transparent" />

      <div className="relative z-10 text-center">
        <div className="font-mono text-xs tracking-[0.4em] text-[#f5c153]">FOOTBALL MODE</div>
        <h3 className="mt-2 text-4xl font-bold text-white">Keep-ups: {kicks}</h3>
        <p className="mt-1 text-sm text-white/60">click the ball. don&apos;t let the streak die.</p>

        <motion.div
          ref={ballControls}
          key={ballAnim}
          initial={{ y: 0, rotate: 0 }}
          animate={ballAnim ? { y: [-0, -180, 0], rotate: 360 } : {}}
          transition={{ duration: 0.9, ease: ["easeOut", "easeIn"] }}
          onClick={kick}
          className="mx-auto mt-10 cursor-pointer select-none text-7xl"
          role="button"
          aria-label="Kick the football"
          data-cursor
        >
          ⚽
        </motion.div>

        <div className="mt-12 flex items-center justify-center gap-3">
          <button
            onClick={() => setCrowd(!crowd)}
            className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              crowd
                ? "border-[#f5c153] text-[#f5c153]"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            {crowd ? "🔊 crowd: ON" : "🔇 crowd: off"}
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:text-white"
          >
            full time — exit
          </button>
        </div>
        {kicks >= 10 && (
          <div className="mt-4 font-mono text-xs text-[#5ee1a2]">
            {kicks >= 25 ? "⭐ ICON rating. EA would be proud." : "solid touch. keep going for ICON rating (25)"}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ------------------------- Dev mode ---------------------------
function DevMode({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[860] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-deep edge-glow max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 font-mono text-xs md:p-8"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-bold text-accent">⌥ DEVELOPER MODE</div>
          <button onClick={onClose} className="text-dim hover:text-fg">✕</button>
        </div>

        <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-dim">Architecture</div>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-line bg-black/40 p-4 leading-relaxed text-[#9fb3c8]">{`┌────────────────────────────────────────────┐
│                HAMZA://OS                  │
│  Next.js App Router · React 19 · TS        │
├──────────────┬─────────────┬───────────────┤
│  Starfield   │  NeuralNet  │  Aurora       │
│  canvas 2d   │  canvas 2d  │  css blur     │
├──────────────┴─────────────┴───────────────┤
│  Sections (Framer Motion scroll reveals)   │
│  Hero → OS → Now → Journey → Galaxy →      │
│  Stats → Projects → AI Lab → Fitness →     │
│  Investing → Library → Globe(three.js) →   │
│  Philosophy → Achievements → Terminal      │
├────────────────────────────────────────────┤
│  Event bus (CustomEvents) ── easter eggs   │
│  confetti · matrix · football · devmode    │
└────────────────────────────────────────────┘`}</pre>

        <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-dim">Tech stack</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion", "Three.js", "Canvas 2D", "SVG paths", "WebAudio", "Zero templates"].map((t) => (
            <span key={t} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-fg">{t}</span>
          ))}
        </div>

        <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-dim">Project graph</div>
        <pre className="mt-2 overflow-x-auto rounded-xl border border-line bg-black/40 p-4 leading-relaxed text-[#9fb3c8]">{`data.ts ──▶ every section (single source of truth)
bus.ts  ──▶ Terminal ──▶ EasterEggs overlays
Cursor + Magnetic ──▶ all interactive elements
Starfield (fixed, z-0) ◀── everything floats above`}</pre>

        <div className="mt-5 text-[10px] text-dim">
          you found dev mode. there are at least 4 more secrets. happy hunting. —H
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------- Orchestrator --------------------------
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export default function EasterEggs() {
  const [confetti, setConfetti] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [football, setFootball] = useState(false);
  const [devmode, setDevmode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // egg bus
  useEffect(
    () =>
      onEgg((name) => {
        if (name === "confetti") setConfetti(true);
        if (name === "matrix") setMatrix((m) => !m);
        if (name === "football") setFootball(true);
        if (name === "devmode") setDevmode(true);
      }),
    []
  );

  // konami listener
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === KONAMI[idx].toLowerCase() || e.key === KONAMI[idx]) {
        idx++;
        if (idx === KONAMI.length) {
          idx = 0;
          const on = document.documentElement.classList.toggle("theme-aurum");
          setToast(on ? "⬆⬆⬇⬇⬅➡⬅➡BA — AURUM THEME UNLOCKED" : "back to electric blue");
          setTimeout(() => setToast(null), 2600);
        }
      } else {
        idx = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <AnimatePresence>
        {matrix && <MatrixRain key="matrix" />}
        {football && <FootballMode key="football" onClose={() => setFootball(false)} />}
        {devmode && <DevMode key="dev" onClose={() => setDevmode(false)} />}
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-deep edge-glow fixed bottom-6 left-1/2 z-[950] -translate-x-1/2 rounded-full px-5 py-2.5 font-mono text-xs text-accent"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      {confetti && <Confetti onDone={() => setConfetti(false)} />}
    </>
  );
}
