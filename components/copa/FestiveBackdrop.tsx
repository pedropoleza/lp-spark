"use client";

import { motion, useReducedMotion } from "framer-motion";

const BUNTING_COLORS = ["#FFD23F", "#00A4CD", "#0E7A4B", "#E10600", "#FFFFFF", "#FDE100"];

/** Bandeirinhas (varal de festa) balançando no topo. */
export function Bunting() {
  const reduce = useReducedMotion();
  const flags = Array.from({ length: 22 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 overflow-hidden">
      {/* cordinha */}
      <div className="h-px w-full bg-white/30" />
      <div className="flex w-full justify-between px-1">
        {flags.map((_, i) => (
          <motion.span
            key={i}
            initial={reduce ? false : { y: -4 }}
            animate={reduce ? undefined : { y: [-4, 2, -4] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: (i % 6) * 0.18, ease: "easeInOut" }}
            style={{
              borderTopColor: BUNTING_COLORS[i % BUNTING_COLORS.length],
              width: 0,
              height: 0,
            }}
            className="border-x-[11px] border-t-[18px] border-x-transparent drop-shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}

/** Fundo: gramado em gradiente + padrão sutil de bolas/estrelas. */
export function FestiveBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#15623F_0%,#0C3D29_45%,#072218_100%)]" />
      {/* linhas de campo bem sutis */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(90deg,transparent_49.6%,#fff_49.6%,#fff_50.4%,transparent_50.4%)]" />
      {/* padrão de bolas/estrelinhas */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #fff 1.5px, transparent 2px), radial-gradient(circle at 70% 60%, #fff 1.5px, transparent 2px), radial-gradient(circle at 45% 85%, #fff 1.5px, transparent 2px)",
          backgroundSize: "90px 90px, 120px 120px, 70px 70px",
        }}
      />
      {/* brilho dourado no topo */}
      <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#FFD23F]/15 blur-[120px]" />
    </div>
  );
}
