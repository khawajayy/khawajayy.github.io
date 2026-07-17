"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { emitEgg } from "@/lib/bus";

const LINKS = [
  ["Home", "#home"],
  ["Projects", "#projects"],
  ["Journey", "#journey"],
  ["Skills", "#skills"],
  ["AI Lab", "#ai-lab"],
  ["Fitness", "#fitness"],
  ["Investing", "#investing"],
  ["Now", "#now"],
  ["Terminal", "#terminal"],
  ["Contact", "#contact"],
] as const;

// Floating glass nav — hides on scroll down, returns on scroll up.
export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 300);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-1/2 top-4 z-[100] w-[min(96vw,1080px)] -translate-x-1/2"
      animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <nav
        className={`glass-deep edge-glow flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "shadow-2xl" : ""
        }`}
      >
        <a
          href="#home"
          onDoubleClick={(e) => {
            e.preventDefault();
            emitEgg("devmode");
          }}
          title="Curious? Try double-clicking."
          className="group flex items-center gap-2.5 pl-1"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-[#0b0f16] font-mono text-sm font-bold text-accent transition-shadow group-hover:shadow-[0_0_20px_-4px_var(--glow)]">
            H
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent2 pulse-dot" />
          </span>
          <span className="hidden font-mono text-xs tracking-widest text-muted sm:block">
            HAMZA://OS
          </span>
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {label}
            </a>
          ))}
        </div>

        <button
          className="rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-muted hover:text-fg lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-deep edge-glow mt-2 grid grid-cols-2 gap-1 rounded-2xl p-3 lg:hidden"
          >
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted hover:bg-white/5 hover:text-fg"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
