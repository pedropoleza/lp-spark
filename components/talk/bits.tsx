"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTalk } from "./talk-context";

/** Wrapper de cena: largura/respiro consistentes, rótulo mono e entrada animada. */
export function TalkSceneFrame({
  label,
  children,
  wide,
  hint,
  className,
}: {
  label?: string;
  children: ReactNode;
  wide?: boolean;
  hint?: string;
  className?: string;
}) {
  const { mode } = useTalk();
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mx-auto w-full px-6", wide ? "max-w-6xl" : "max-w-3xl", className)}
    >
      {label && <p className="label-mono mb-5 text-center">{label}</p>}
      {children}
      {mode === "solo" && hint && <p className="mt-7 text-center text-xs text-muted">{hint}</p>}
    </motion.div>
  );
}

/** Número que conta até o alvo (suave). Reanima sempre que `value` muda. */
export function CountUp({ value, format, durationMs = 900, className }: { value: number; format?: (n: number) => string; durationMs?: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number>();

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      fromRef.current = value;
    };
  }, [value, durationMs]);

  return <span className={cn("tabular-nums", className)}>{format ? format(display) : display.toLocaleString("en-US")}</span>;
}
