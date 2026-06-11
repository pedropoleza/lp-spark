"use client";

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Parallax 2D em camadas: desloca o conteúdo no eixo Y conforme o scroll.
 * `speed` ~0.1–0.4 (positivo = sobe mais rápido). Estático em reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 90, -speed * 90]);
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Barra de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress w-full" style={{ scaleX }} aria-hidden />;
}

/** Textura de grão sutil sobre toda a página (puramente decorativa). */
export function Grain() {
  return <div className="grain-overlay" aria-hidden />;
}

/**
 * Card com "spotlight" que segue o cursor.
 * Atualiza as CSS vars --mx/--my consumidas por `.spotlight::before`.
 */
export function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  const Comp = Tag as "div";
  return (
    <Comp ref={ref} onMouseMove={onMove} className={cn("spotlight relative", className)}>
      {children}
    </Comp>
  );
}
