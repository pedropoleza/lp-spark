"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";

/**
 * Intro "system boot" → a marca se forma no centro e a cortina se ABRE em duas
 * metades (com uma linha teal na emenda), revelando o hero de forma fluida.
 * Curta (~1.9s) e não bloqueia interação. Respeita prefers-reduced-motion.
 */
export function Curtain() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setDone(true), 250);
      return () => clearTimeout(t);
    }
    const t1 = setTimeout(() => setOpen(true), 1050);
    const t2 = setTimeout(() => setDone(true), 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  if (done) return null;

  const ease = [0.83, 0, 0.17, 1] as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200]" aria-hidden>
      {/* metade superior */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[51%] bg-ink"
        animate={open ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.9, ease }}
      />
      {/* metade inferior */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[51%] bg-ink"
        animate={open ? { y: "101%" } : { y: 0 }}
        transition={{ duration: 0.9, ease }}
      />

      {/* linha teal na emenda, que brilha e some ao abrir */}
      <motion.div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={open ? { opacity: [0.9, 0], scaleX: 1.3 } : { opacity: 0.9, scaleX: 1 }}
        transition={{ duration: 0.9, ease }}
      />

      {/* marca centralizada */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={open ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: open ? 0.4 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="absolute -inset-6 rounded-full bg-accent/25 blur-2xl" />
            <span className="ring-pulse absolute inset-0 rounded-full border border-accent/60" />
            <Logo variant="mark" className="relative h-20 w-20 sm:h-24 sm:w-24" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo variant="wordmark" onDark className="mt-6 h-7 sm:h-9" />
          </motion.div>

          <motion.div
            className="mt-5 h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5, duration: 0.6, ease }}
          />
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            CRM • Automations • AI • Growth
          </div>
        </div>
      </motion.div>
    </div>
  );
}
