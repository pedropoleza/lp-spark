"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Blend = "screen" | "lighten" | "plus-lighter" | "overlay" | "normal";

type Props = {
  /**
   * Caminho base SEM extensão. Ex.: "/loops/hero-glow" carrega:
   *   /loops/hero-glow.webm, /loops/hero-glow.mp4 e /loops/hero-glow.jpg (poster)
   * Gere os arquivos com `npm run optimize:loops`.
   */
  src: string;
  className?: string;
  /** Opacidade 0–100 (loops de fundo costumam ficar bem entre 30 e 70). */
  opacity?: number;
  /** Blend mode para integrar o loop como luz, sem virar um retângulo de vídeo. */
  blend?: Blend;
  /** Se há poster .jpg gerado (default true). */
  poster?: boolean;
};

/**
 * Loop de vídeo decorativo para fundo de seção.
 * - Lazy: só dá play quando entra no viewport (IntersectionObserver) e pausa ao sair.
 * - preload="none": não baixa o vídeo até ser necessário.
 * - Respeita prefers-reduced-motion: mostra apenas o poster estático, sem tocar.
 * - aria-hidden + pointer-events-none: puramente visual, não atrapalha leitura/teclado.
 */
export function BackgroundLoop({
  src,
  className,
  opacity = 55,
  blend = "screen",
  poster = true,
}: Props) {
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
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const style: CSSProperties = {
    opacity: opacity / 100,
    mixBlendMode: blend as CSSProperties["mixBlendMode"],
  };
  const baseClass = "pointer-events-none absolute inset-0 h-full w-full object-cover";

  // Reduced motion: poster estático (ou nada, se não houver poster).
  if (reduced) {
    if (!poster) return null;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`${src}.jpg`} alt="" aria-hidden className={cn(baseClass, className)} style={style} />;
  }

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      poster={poster ? `${src}.jpg` : undefined}
      className={cn(baseClass, className)}
      style={style}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
