"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import Magnetic from "./Magnetic";
import { identity } from "@/lib/data";

const CHANNELS = [
  { label: "Email", value: identity.email, href: `mailto:${identity.email}`, icon: "✉" },
  { label: "LinkedIn", value: "/in/khawajayy", href: identity.linkedin, icon: "in" },
  { label: "GitHub", value: "/khawajayy", href: identity.github, icon: "⌥" },
  { label: "Resume", value: "PDF, one page", href: "/Hamza-Sadiq-Resume.pdf", icon: "↓" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name || "your website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section
      id="contact"
      kicker="Contact"
      title="Open a channel."
      intro="Recruiting, collaborating, or just curious — every message gets read."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* channels */}
        <div className="grid grid-cols-2 gap-4">
          {CHANNELS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Magnetic strength={0.18} className="h-full w-full">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  download={c.label === "Resume" ? true : undefined}
                  className="glass float-y group flex h-full flex-col justify-between rounded-2xl p-5 transition-colors hover:border-accent/30"
                  style={{ animationDelay: `${i * 0.7}s` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-[#0b0f16] font-mono text-accent transition-shadow group-hover:shadow-[0_0_18px_-4px_var(--glow)]">
                    {c.icon}
                  </span>
                  <div className="mt-6">
                    <div className="font-semibold text-fg">{c.label}</div>
                    <div className="mt-0.5 break-all font-mono text-[11px] text-muted">{c.value}</div>
                  </div>
                </a>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        {/* glass form */}
        <motion.form
          onSubmit={send}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="glass-deep edge-glow flex flex-col gap-4 rounded-3xl p-6 md:p-8"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
            transmission://new
          </div>
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-dim focus:border-accent/50"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-dim focus:border-accent/50"
          />
          <textarea
            required
            placeholder="Your message..."
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="resize-none rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-dim focus:border-accent/50"
          />
          <Magnetic strength={0.15}>
            <button
              type="submit"
              className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#04070c] transition-shadow hover:shadow-[0_0_40px_-8px_var(--glow)]"
            >
              Transmit →
            </button>
          </Magnetic>
        </motion.form>
      </div>
    </Section>
  );
}
