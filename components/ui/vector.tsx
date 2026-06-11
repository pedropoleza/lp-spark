"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Micro-animações vetoriais (conceito Lottie, implementadas como SVG inline:
   zero dependência extra, stroke fino do design system, play único). */

/** Check que se DESENHA (stroke teal) ao entrar no viewport. */
export function DrawnCheck({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden>
      <motion.path
        d="M4.5 12.5l5 5L19.5 6.5"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </svg>
  );
}

/** Loader do quiz: 3 pontos orbitando com spark central pulsando. */
export function SparkLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-12 w-12", className)} role="status" aria-label="Calculando">
      <div className="absolute inset-0 animate-[spin_1.3s_linear_infinite]">
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent"
            style={{ transform: `rotate(${deg}deg) translateY(-17px)` }}
          />
        ))}
      </div>
      <span className="absolute inset-[36%] animate-pulse-soft rounded-full bg-accent/80 shadow-glow" />
    </div>
  );
}

/** Cadeado de linha com alça que se fecha (estado "preparando checkout"). */
export function LockSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn("h-4 w-4", className)} aria-hidden>
      <rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" opacity={0.18} />
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <motion.path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  );
}
