"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Hover magnético sutil para CTAs primários: o botão "vem" até o cursor
 * (máx. 4px) e volta com spring. Desligado em reduced-motion / touch.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16 });
  const y = useSpring(0, { stiffness: 220, damping: 16 });

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const clamp = (v: number) => Math.max(-7, Math.min(7, v));
    x.set(clamp(((e.clientX - (r.left + r.width / 2)) / r.width) * 16));
    y.set(clamp(((e.clientY - (r.top + r.height / 2)) / r.height) * 16));
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/** Número que conta até o valor ao entrar no viewport (uma vez). */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? value : 0}
    </span>
  );
}

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
