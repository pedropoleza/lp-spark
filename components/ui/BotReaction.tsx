"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 * Apresentação FLUIDA (entra com spring quando aparece), e o clipe TOCA UMA VEZ
 * ao surgir — não fica em loop de vídeo de fundo. Re-toca no hover (desktop).
 * Respeita prefers-reduced-motion (mostra só o poster).
 */
export function BotReaction({ clip, caption, blend = false, side = "right", className }: Props) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canHover, setCanHover] = useState(true);
  const played = useRef(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // toca uma vez quando entra no viewport
  useEffect(() => {
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || !vid || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  function replay() {
    if (!canHover || reduce) return;
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }

  const mediaStyle: CSSProperties = { mixBlendMode: blend ? "screen" : "normal" };

  return (
    <motion.div
      ref={wrapRef}
      initial={reduce ? false : { opacity: 0, x: side === "right" ? 28 : -28, y: 10 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      onMouseEnter={replay}
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
            playsInline
            preload="metadata"
            poster={`${clip}.jpg`}
            className={cn("h-full w-full object-cover", canHover && "cursor-pointer")}
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
