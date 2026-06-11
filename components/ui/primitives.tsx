"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Container com largura máxima editorial. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-spark", className)}>{children}</div>;
}

type SectionTheme = "dark" | "light" | "gray";

/** Section full-bleed com tema próprio e fundo opcional que se move sozinho. */
export function Section({
  id,
  children,
  className,
  theme = "dark",
  ambient = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Esquema de cor da faixa. Light/Gray invertem para fundo claro. */
  theme?: SectionTheme;
  /** Ativa blobs de luz que derivam sozinhos (movimento ambiente). */
  ambient?: boolean;
}) {
  const themeClass =
    theme === "light"
      ? "theme-light bg-[#FCFCFC]"
      : theme === "gray"
        ? "theme-light bg-[#EEF1F4]"
        : "bg-ink";

  return (
    <section
      id={id}
      data-theme={theme === "dark" ? "dark" : "light"}
      className={cn("relative overflow-hidden py-20 sm:py-28 scroll-mt-24", themeClass, className)}
    >
      {ambient && (
        <div className="ambient" aria-hidden>
          <span className="ambient-blob ambient-blob-1" />
          <span className="ambient-blob ambient-blob-2" />
        </div>
      )}
      <div className="relative z-[1]">{children}</div>
    </section>
  );
}

/** Texto com gradiente Spark. */
export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("gradient-text", className)}>{children}</span>;
}

/** Micro-label monospaçada em uppercase. */
export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("label-mono", className)}>{children}</span>;
}

/** Wrapper de scroll reveal — respeita prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Badge pequeno com borda translúcida. */
export function AnimatedBadge({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "spark" | "lime" | "electric" | "glow";
}) {
  const tones: Record<string, string> = {
    default: "border-white/15 bg-white/5 text-muted",
    spark: "border-spark/40 bg-spark/10 text-spark",
    lime: "border-lime/40 bg-lime/10 text-lime",
    electric: "border-electric/40 bg-electric/10 text-electric",
    glow: "border-glow/40 bg-glow/10 text-glow",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Título de seção com label opcional. */
export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "left",
}: {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && <Label className="mb-4 block">{label}</Label>}
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </div>
  );
}
