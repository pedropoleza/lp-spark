"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll com inércia elegante (Lenis). Respeita prefers-reduced-motion
 * (não inicializa) e libera containers internos via data-lenis-prevent.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
