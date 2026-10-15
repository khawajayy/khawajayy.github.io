"use client";

import { useEffect, useRef } from "react";

// A glowing orb replaces the cursor. It lerps toward the pointer,
// swells over interactive elements, and tightens while clicking.
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on fine pointers
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("orb-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = innerWidth / 2;
    let my = innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let down = false;
    let raf = 0;

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor], h1, h2, .planet, .book-spine"
      );

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      targetScale = isInteractive(e.target) ? 2.4 : 1;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const onDown = () => (down = true);
    const onUp = () => (down = false);
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += ((down ? targetScale * 0.7 : targetScale) - scale) * 0.18;
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("orb-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <div
        ref={dotRef}
        className="absolute h-2 w-2 rounded-full opacity-0"
        style={{
          background: "var(--accent)",
          boxShadow: "0 0 12px 2px var(--glow), 0 0 30px 6px var(--glow)",
          transition: "opacity 0.3s",
        }}
      />
      <div
        ref={ringRef}
        className="absolute h-10 w-10 rounded-full opacity-0"
        style={{
          border: "1px solid color-mix(in srgb, var(--accent) 55%, transparent)",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}
