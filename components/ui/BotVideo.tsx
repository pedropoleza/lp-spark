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
 * Avatar/mascote em vídeo (SparkBot). Lazy (só toca no viewport), em loop, mudo,
 * e respeita prefers-reduced-motion (mostra só o poster).
 */
export function BotVideo({ src, className, blend = false, fit = "contain" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const style: CSSProperties = {
    mixBlendMode: blend ? "screen" : "normal",
    objectFit: fit,
  };
  const base = "h-full w-full";

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`${src}.jpg`} alt="SparkBot" className={cn(base, className)} style={style} />;
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
      className={cn(base, className)}
      style={style}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
