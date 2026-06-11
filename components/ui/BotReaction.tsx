"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CornerMarks } from "./motion2d";
import { cn } from "@/lib/utils";

type Props = {
  /** Caminho base do clipe, ex.: "/bot/bot-smile". */
  clip: string;
  /** Texto da reação do SparkBot ao conteúdo da seção. */
  caption: string;
  /** true para clipes de fundo PRETO (blend screen remove o fundo). */
  blend?: boolean;
  /** Lado de entrada/alinhamento do card. */
  side?: "left" | "right";
  className?: string;
};

/**
 * Card de reação do SparkBot.
 * - Reage ao SCROLL: o clipe toca (em loop) enquanto a seção está visível e
 *   pausa ao sair — o bot reage conforme o usuário desce a página.
 * - O card também DERIVA suavemente no eixo Y conforme o scroll (parallax).
 * - Respeita prefers-reduced-motion (mostra só o poster, sem movimento).
 */
export function BotReaction({ clip, caption, blend = false, side = "right", className }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 26, reduce ? 0 : -26]);

  // toca em loop enquanto visível; pausa ao sair (dirigido pelo scroll)
  useEffect(() => {
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!vid) return;
        if (entry.isIntersecting) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const mediaStyle: CSSProperties = { mixBlendMode: blend ? "screen" : "normal" };

  return (
    <motion.div
      ref={wrapRef}
      style={{ y: drift }}
      initial={reduce ? false : { opacity: 0, x: side === "right" ? 28 : -28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={cn(
        "glass-card relative flex max-w-sm items-center gap-3 rounded-card p-3 pr-4",
        className,
      )}
    >
      <CornerMarks className="absolute inset-1.5" />

      <div
        className={cn(
          "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20",
          blend ? "bg-ink-deep" : "bg-cream/[0.04]",
        )}
      >
        {reduce ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${clip}.jpg`} alt="SparkBot" className="h-full w-full object-cover" style={mediaStyle} />
        ) : (
          <video
            ref={videoRef}
            aria-hidden
            muted
            loop
            playsInline
            preload="metadata"
            poster={`${clip}.jpg`}
            className="h-full w-full object-cover"
            style={mediaStyle}
          >
            <source src={`${clip}.webm`} type="video/webm" />
            <source src={`${clip}.mp4`} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="min-w-0">
        <span className="label-mono mb-1 flex items-center gap-1.5 !text-[10px]">
          <span className="blink inline-block h-1.5 w-1.5 bg-accent" /> SPARKBOT
        </span>
        <p className="text-sm leading-snug text-cream">{caption}</p>
      </div>
    </motion.div>
  );
}
