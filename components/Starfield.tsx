"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 (parallax + brightness)
  r: number;
  tw: number; // twinkle phase
  vx: number;
};

type Shooter = { x: number; y: number; vx: number; vy: number; life: number };

// Fixed full-screen canvas: parallax starfield, glowing drifting
// particles, mouse-reactive light, and occasional shooting stars.
// Sits behind everything; aurora blobs layered on top via CSS.
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let mx = -1000;
    let my = -1000;
    let smx = -1000;
    let smy = -1000;
    let scrollY = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(260, Math.floor((w * h) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        r: Math.random() * 1.3 + 0.3,
        tw: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.06,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onScroll = () => (scrollY = window.scrollY);

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // mouse light — a soft ambient pool following the cursor
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;
      if (smx > -500) {
        const g = ctx.createRadialGradient(smx, smy, 0, smx, smy, 380);
        g.addColorStop(0, "rgba(77,163,255,0.055)");
        g.addColorStop(0.5, "rgba(34,211,238,0.02)");
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // stars with depth parallax against scroll + slight drift
      for (const s of stars) {
        s.x += s.vx * (reduced ? 0 : 1);
        if (s.x < -5) s.x = w + 5;
        if (s.x > w + 5) s.x = -5;
        const py = (s.y - scrollY * s.z * 0.18 + h * 4) % h;
        const twinkle = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(t * (0.6 + s.z) + s.tw);
        const alpha = (0.25 + s.z * 0.65) * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, py, s.r + s.z * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.z > 0.75 ? "160,205,255" : "225,232,245"},${alpha})`;
        ctx.fill();
        if (s.z > 0.88) {
          // brightest stars get a glow halo
          ctx.beginPath();
          ctx.arc(s.x, py, (s.r + 1.6) * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(77,163,255,${0.05 * twinkle})`;
          ctx.fill();
        }
      }

      // shooting stars
      if (!reduced && Math.random() < 0.0035 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * w * 0.8 + w * 0.2,
          y: Math.random() * h * 0.35,
          vx: -(5 + Math.random() * 5),
          vy: 2.4 + Math.random() * 2,
          life: 1,
        });
      }
      shooters = shooters.filter((sh) => sh.life > 0);
      for (const sh of shooters) {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life -= 0.016;
        const grad = ctx.createLinearGradient(
          sh.x, sh.y,
          sh.x - sh.vx * 12, sh.y - sh.vy * 12
        );
        grad.addColorStop(0, `rgba(190,225,255,${0.85 * sh.life})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x - sh.vx * 12, sh.y - sh.vy * 12);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* base vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% -10%, #0a1220 0%, #050505 55%)",
        }}
      />
      {/* aurora blobs */}
      <div
        className="aurora"
        style={{
          width: "55vw",
          height: "45vh",
          top: "-12vh",
          left: "-8vw",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora"
        style={{
          width: "45vw",
          height: "40vh",
          top: "10vh",
          right: "-10vw",
          animationDelay: "-9s",
          animationDuration: "32s",
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--accent-2) 11%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora"
        style={{
          width: "40vw",
          height: "36vh",
          bottom: "-14vh",
          left: "26vw",
          animationDelay: "-17s",
          animationDuration: "38s",
          background:
            "radial-gradient(ellipse, rgba(120,90,255,0.10), transparent 65%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='0.05'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
