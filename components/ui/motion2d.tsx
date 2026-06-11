"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* Lógicas de animação 2D reutilizáveis em toda a LP.
   Tudo via tokens (accent / paper / ink) — sem cores hardcoded, sem 3D. */

/** Texto com glitch RGB-split (canais accent / accent-2). */
export function GlitchText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("glitch", className)} data-text={children}>
      {children}
    </span>
  );
}

/** Pisca-pisca de "terminal" — quadradinho/cursor de acento. */
export function BlinkDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("blink inline-block h-2 w-2 bg-accent align-middle", className)} />;
}

/** Marcadores de canto brutalistas em volta de um bloco. */
export function CornerMarks({ className }: { className?: string }) {
  const base = "pointer-events-none absolute h-4 w-4 border-accent/60";
  return (
    <span aria-hidden className={className}>
      <span className={cn(base, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(base, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(base, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(base, "bottom-0 right-0 border-b-2 border-r-2")} />
    </span>
  );
}

/**
 * Barra que preenche conforme o scroll (useScroll + useSpring).
 * Usada sob títulos de seção para uma linguagem de movimento consistente.
 */
export function ScrollFillBar({
  className,
  align = "left",
}: {
  className?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.45"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <div
      ref={ref}
      className={cn("h-[3px] w-20 overflow-hidden bg-accent/15", align === "center" && "mx-auto", className)}
    >
      <motion.div
        className="h-full w-full bg-accent"
        style={{ scaleX: reduce ? 1 : scaleX, transformOrigin: align === "center" ? "center" : "left" }}
      />
    </div>
  );
}

/**
 * Marquee horizontal infinito (loop sem costura via 2 cópias).
 * `items` alternam cor accent/atual; respeita reduced-motion.
 */
export function Marquee({
  items,
  className,
  reverse = false,
  big = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  big?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <div
        className={cn(
          "flex w-max whitespace-nowrap",
          !reduce && (reverse ? "animate-marquee-rev" : "animate-marquee"),
          className,
        )}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {items.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className={cn(
                  "flex items-center",
                  big ? "px-4 font-heavy uppercase leading-none" : "px-5 font-mono text-sm uppercase tracking-[0.25em]",
                  i % 2 === 1 && "text-accent",
                )}
                style={big ? { fontSize: "clamp(40px, 8vw, 120px)" } : undefined}
              >
                {word}
                {!big && <span className="ml-5 text-accent">/</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Faixa marquee de marca, pronta pra usar como divisor entre seções. */
export function BrandMarquee({
  items,
  theme = "dark",
}: {
  items: string[];
  theme?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "border-y-[3px] py-3",
        theme === "dark" ? "border-ink bg-ink-deep text-paper" : "theme-light border-ink bg-paper text-ink",
      )}
    >
      <Marquee items={items} />
    </div>
  );
}

export type { ReactNode };
