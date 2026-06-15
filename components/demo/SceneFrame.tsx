"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useDemo } from "./demo-context";

/** Wrapper de cena: largura/respiro consistentes, rótulo mono e animação de entrada. */
export function SceneFrame({ label, children, wide, hint, className }: { label?: string; children: ReactNode; wide?: boolean; hint?: string; className?: string }) {
  const { mode } = useDemo();
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
