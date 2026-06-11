"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Emenda entre módulos: zona transparente onde o canvas vivo aparece, com uma
 * linha de acento que "varre" e um nó central que pulsa conforme o scroll.
 */
export function Seam({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const nodeScale = useTransform(scaleX, [0, 0.5, 1], [0.4, 1.3, 0.6]);
  const nodeOpacity = useTransform(scaleX, [0, 0.5, 1], [0, 1, 0.4]);

  return (
    <div ref={ref} aria-hidden className={cn("relative h-20 w-full sm:h-28", className)}>
      <div className="container-spark relative flex h-full items-center">
        {/* ticks nas pontas */}
        <span className="absolute left-5 h-3 w-[2px] bg-accent/60 sm:left-8" />
        <span className="absolute right-5 h-3 w-[2px] bg-accent/60 sm:right-8" />

        {/* linha que varre */}
        <motion.div className="seam-line w-full" style={{ scaleX: reduce ? 1 : scaleX }} />

        {/* nó central pulsante */}
        <motion.span
          style={{ scale: reduce ? 1 : nodeScale, opacity: reduce ? 0.7 : nodeOpacity }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <span className="block h-2.5 w-2.5 rotate-45 bg-accent shadow-[0_0_18px_rgba(0,164,205,0.8)]" />
        </motion.span>
      </div>
    </div>
  );
}
