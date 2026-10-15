"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import { books, learningTopics, credentials } from "@/lib/data";

export default function Learning() {
  const [openBook, setOpenBook] = useState<number | null>(null);
  const book = openBook !== null ? books[openBook] : null;

  return (
    <Section
      id="learning"
      kicker="Learning Engine"
      title="The library never closes."
      intro="Reading is downloading someone else's decade. Click a spine to open it."
    >
      {/* current topics ticker */}
      <div className="glass mb-10 overflow-hidden rounded-full py-2.5">
        <div
          className="flex w-max gap-10 whitespace-nowrap font-mono text-xs text-muted"
          style={{ animation: "ticker 26s linear infinite" }}
        >
          {[...learningTopics, ...learningTopics].map((t, i) => (
            <span key={i} className="flex items-center gap-2.5 px-2">
              <span className="h-1 w-1 rounded-full bg-accent2" />
              currently learning: <span className="text-accent">{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* credentials */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {credentials.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:border-accent/25"
            data-cursor
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
              {c.kind === "Certification" ? "✓" : "◎"}
            </span>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-accent2">
                {c.kind}
              </div>
              <div className="mt-0.5 text-sm font-medium text-fg">{c.title}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* bookshelf */}
        <div>
          <div className="glass-deep edge-glow rounded-3xl p-6">
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
              shelf://favorites — click a spine
            </div>
            <div className="flex h-56 items-end gap-2 border-b-2 border-line pb-0">
              {books.map((b, i) => (
                <motion.button
                  key={b.title}
                  className="book-spine relative flex-1 rounded-t-md"
                  style={{
                    height: `${62 + ((i * 37) % 30)}%`,
                    background: `linear-gradient(180deg, ${b.spine}cc, ${b.spine}55)`,
                    boxShadow: openBook === i ? `0 0 24px ${b.spine}88` : `inset -3px 0 6px rgba(0,0,0,0.5)`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -12, rotate: -2 }}
                  onClick={() => setOpenBook(openBook === i ? null : i)}
                  aria-label={b.title}
                  data-cursor
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center overflow-hidden px-1 font-mono text-[9px] font-semibold text-black/70"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {b.title}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-3 text-center font-mono text-[10px] text-dim">
              ~1 book / week · psychology · systems · engineering · finance
            </div>
          </div>
        </div>

        {/* open book panel */}
        <div className="flex items-stretch">
          <AnimatePresence mode="wait">
            {book ? (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, rotateY: -18, x: 20 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 12, x: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="glass-deep edge-glow w-full rounded-3xl p-7"
                style={{ perspective: 800 }}
              >
                <div
                  className="mb-4 h-1 w-16 rounded-full"
                  style={{ background: book.spine, boxShadow: `0 0 12px ${book.spine}88` }}
                />
                <h3 className="text-2xl font-bold text-fg">{book.title}</h3>
                <div className="mt-1 font-mono text-xs text-dim">by {book.author}</div>
                <p className="mt-5 text-sm leading-relaxed text-muted">{book.summary}</p>
                <div className="mt-6 font-mono text-[10px] text-accent2">
                  status: absorbed → applied
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass flex w-full flex-col items-center justify-center rounded-3xl p-10 text-center"
              >
                <span className="text-3xl">❐</span>
                <p className="mt-4 max-w-xs text-sm text-muted">
                  Select a book from the shelf to read its distilled summary.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
