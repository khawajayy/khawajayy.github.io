"use client";

import { useEffect, useRef } from "react";
import { emitEgg } from "@/lib/bus";

export default function Footer() {
  const ref = useRef<HTMLCanvasElement>(null);

  // tiny dedicated starfield strip
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let w = 0, h = 0;
    let stars: { x: number; y: number; r: number; p: number }[] = [];

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = 120;
      canvas.width = w;
      canvas.height = h;
      stars = Array.from({ length: 70 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.3,
        p: Math.random() * Math.PI * 2,
      }));
    };
    let t = 0;
    const draw = () => {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = 0.3 + 0.5 * Math.abs(Math.sin(t + s.p));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,205,235,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <footer className="relative z-10 mt-10 overflow-hidden border-t border-line">
      <canvas ref={ref} className="absolute inset-x-0 top-0 h-[120px] w-full opacity-70" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <p className="font-mono text-sm text-muted">
          <span className="text-accent">$</span> Currently building something better than yesterday
          <span className="blink ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />
        </p>
        <div className="flex items-center gap-4 font-mono text-[10px] text-dim">
          <span>hamza://os v6.2</span>
          <span>·</span>
          <span>handcrafted, no templates</span>
          <span>·</span>
          <button
            onClick={() => emitEgg("football")}
            className="transition-transform hover:scale-125"
            title="?"
            aria-label="A hidden football"
          >
            ⚽
          </button>
        </div>
      </div>
    </footer>
  );
}
