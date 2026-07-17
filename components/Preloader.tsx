"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BOOT_LINES = [
  { text: "HAMZA://OS v6.2 — initializing kernel", delay: 0 },
  { text: "mounting /experience ............ OK", delay: 420 },
  { text: "loading modules: automation, ai, systems", delay: 820 },
  { text: "loading /projects ............... OK", delay: 1240 },
  { text: "loading /ideas .................. OK", delay: 1600 },
  { text: "compiling curiosity ............. ∞", delay: 1960 },
  { text: "SYSTEM READY.", delay: 2400 },
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number>(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Skip on repeat visits within the session — respect the visitor's time.
    const seen = sessionStorage.getItem("booted");
    if (seen) {
      // defer so the skip doesn't cascade a render inside the effect
      const skip = setTimeout(() => {
        setGone(true);
        onDone();
      }, 0);
      return () => clearTimeout(skip);
    }
    const timers = BOOT_LINES.map((l, i) =>
      setTimeout(() => setVisible(i + 1), l.delay)
    );
    const end = setTimeout(() => {
      sessionStorage.setItem("booted", "1");
      setGone(true);
      onDone();
    }, 3150);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(end);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="scanlines relative w-[min(92vw,560px)] rounded-xl border border-line bg-[#07090c] p-6 font-mono text-sm shadow-[0_0_120px_-20px_rgba(77,163,255,0.4)]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-dim">boot — hamza://os</span>
            </div>
            <div className="min-h-[190px] space-y-1.5">
              {BOOT_LINES.slice(0, visible).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    i === BOOT_LINES.length - 1
                      ? "pt-2 font-semibold text-accent text-glow"
                      : "text-[#9fb3c8]"
                  }
                >
                  <span className="mr-2 text-accent2">▸</span>
                  {l.text}
                </motion.div>
              ))}
              <span className="blink inline-block h-4 w-2 translate-y-0.5 bg-accent" />
            </div>
            {/* progress bar */}
            <div className="mt-4 h-px w-full overflow-hidden rounded bg-line">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent2"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.9, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
