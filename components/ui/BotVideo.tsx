"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

type Props = {
  /** Caminho base SEM extensão, ex.: "/bot/bot-smile". */
  src: string;
  className?: string;
  /** true para clipes com FUNDO PRETO (blend screen remove o fundo). */
  blend?: boolean;
  /** object-fit do vídeo. */
  fit?: "cover" | "contain";
};

/**
 * Mascote em vídeo (SparkBot).
 * - DISPARA NO SCROLL: toca uma vez (do início ao fim) quando entra na viewport;
 *   re-dispara toda vez que reentra. Não fica em loop contínuo (menos custo de GPU).
 * - HOVER: re-toca a animação a qualquer momento.
 * - Respeita prefers-reduced-motion (mostra só o poster).
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
        if (entry.isIntersecting) {
          el.currentTime = 0;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      // margem generosa: começa a carregar/tocar pouco antes de entrar na tela
      { threshold: 0.2, rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const replay = () => {
    const el = ref.current;
    if (!el || reduced) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const style: CSSProperties = {
    mixBlendMode: blend ? "screen" : "normal",
    objectFit: fit,
  };
  const base = "h-full w-full";
  const u = asset(src);

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`${u}.webp`} alt="SparkBot" className={cn(base, className)} style={style} />;
  }

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      playsInline
      preload="none"
      poster={`${u}.webp`}
      onMouseEnter={replay}
      className={cn(base, "cursor-pointer", className)}
      style={style}
    >
      <source src={`${u}.webm`} type="video/webm" />
      <source src={`${u}.mp4`} type="video/mp4" />
    </video>
  );
}
