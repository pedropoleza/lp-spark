"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BlinkDot, ScrollFillBar } from "./motion2d";
import { BotReaction } from "./BotReaction";
import { Parallax } from "./effects";

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
  spacing = "normal",
  reaction,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Esquema de cor da faixa. Light/Gray invertem para fundo claro. */
  theme?: SectionTheme;
  /** Ativa blobs de luz que derivam sozinhos (movimento ambiente). */
  ambient?: boolean;
  /** Ritmo vertical: momentos-chave respiram mais, apoio comprime. */
  spacing?: "loose" | "normal" | "tight";
  /** Card de reação do SparkBot, contextual ao conteúdo da seção. */
  reaction?: {
    clip: string;
    caption: string;
    blend?: boolean;
    side?: "left" | "right";
  };
}) {
  // Painéis translúcidos sobre o canvas vivo (frosted); o backdrop respira nas bordas.
  const themeClass =
    theme === "light"
      ? "theme-light panel-light"
      : theme === "gray"
        ? "theme-light panel-gray"
        : "panel-dark";

  const pad = {
    loose: "py-28 sm:py-36",
    normal: "py-20 sm:py-28",
    tight: "py-14 sm:py-20",
  }[spacing];

  return (
    <section
      id={id}
      data-theme={theme === "dark" ? "dark" : "light"}
      className={cn("relative overflow-hidden scroll-mt-24", pad, themeClass, className)}
    >
      {ambient && (
        <div className="ambient" aria-hidden>
          <span className="ambient-blob ambient-blob-1" />
          <span className="ambient-blob ambient-blob-2" />
        </div>
      )}
      <div className="relative z-[1]">{children}</div>
      {reaction && (
        <div
          className={cn(
            "container-spark relative z-[1] mt-12 flex",
            reaction.side === "left" ? "justify-start" : "justify-end",
          )}
        >
          <BotReaction {...reaction} />
        </div>
      )}
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
      initial={reduce ? false : { opacity: 0, y: y + 12, scale: 0.94, filter: "blur(8px)" }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
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
    <Parallax
      speed={0.12}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {label && (
        <Label className={cn("mb-4 inline-flex items-center gap-2", align === "center" && "justify-center")}>
          <BlinkDot />
          {label}
        </Label>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      <ScrollFillBar align={align} className="mt-5" />
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
    </Parallax>
  );
}
