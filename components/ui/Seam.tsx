"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Emenda entre módulos: zona transparente onde o canvas vivo aparece, com uma
 * linha de acento que "varre" conforme o scroll (useScroll + useSpring).
 * É a transição entre seções — o fundo contínuo respira aqui.
 */
export function Seam({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <div ref={ref} aria-hidden className={cn("relative h-16 w-full sm:h-24", className)}>
      <div className="container-spark flex h-full items-center">
        <motion.div className="seam-line w-full" style={{ scaleX: reduce ? 1 : scaleX }} />
      </div>
    </div>
  );
}
