"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./ui/Logo";

/**
 * Tela de abertura "system boot" — logo Spark Leads abrindo como cortina.
 * Curta (~1s) e não bloqueia a navegação. Respeita prefers-reduced-motion
 * (nesse caso, encerra quase instantânea).
 */
export function Curtain() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 150 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          {/* linha de brilho atravessando */}
          <motion.div
            className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-spark to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 1, 0.4] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={reduce ? false : { scale: 0.6, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-accent/40 blur-2xl" />
              <Logo variant="mark" className="relative h-20 w-20 sm:h-24 sm:w-24" />
            </motion.div>
            <Logo variant="wordmark" onDark className="mt-6 h-7 sm:h-9" />
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              CRM • Automations • AI • Growth
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
