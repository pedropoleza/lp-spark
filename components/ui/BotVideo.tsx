"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Caminho base SEM extensão, ex.: "/bot/bot-smile". */
  src: string;
  className?: string;
  /**
   * true para clipes com FUNDO PRETO: aplica mix-blend screen e o preto
   * "some" no fundo escuro da página (remoção de fundo sem chroma-key).
   */
  blend?: boolean;
  /** object-fit do vídeo. */
  fit?: "cover" | "contain";
};

/**
 * Mascote em vídeo (SparkBot).
 * - Em loop, mudo, sem download até precisar (preload="metadata").
 * - Em telas com mouse: toca no HOVER e pausa ao sair (volta ao início).
 * - Em telas sem hover (mobile): toca quando entra no viewport.
 * - Respeita prefers-reduced-motion (mostra só o poster).
 */
export function BotVideo({ src, className, blend = false, fit = "contain" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      setReduced(mqReduce.matches);
      setCanHover(mqHover.matches);
    };
    update();
    mqReduce.addEventListener("change", update);
    mqHover.addEventListener("change", update);
    return () => {
      mqReduce.removeEventListener("change", update);
      mqHover.removeEventListener("change", update);
    };
  }, []);

  // Sem hover (mobile): autoplay quando visível.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || canHover) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, canHover]);

  const style: CSSProperties = {
    mixBlendMode: blend ? "screen" : "normal",
    objectFit: fit,
  };
  const base = "h-full w-full";

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`${src}.jpg`} alt="SparkBot" className={cn(base, className)} style={style} />;
  }

  function play() {
    if (canHover) ref.current?.play().catch(() => {});
  }
  function stop() {
    if (canHover && ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  }

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="metadata"
      poster={`${src}.jpg`}
      onMouseEnter={play}
      onMouseLeave={stop}
      className={cn(base, canHover && "cursor-pointer", className)}
      style={style}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
