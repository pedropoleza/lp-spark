"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Canvas contínuo "Spark OS" — camada fixa atrás de toda a página.
 * Disciplina premium: 3 camadas em movimento (tom evolutivo + 2 auroras + malha
 * de pontos), todas em transform/opacity. O silêncio visual deixa o conteúdo pesar.
 */
export function SparkBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yDots = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -180]);
  const yAuroraA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -280]);
  const yAuroraB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  // tom "respira" — acentua no meio da página e assenta nas pontas
  const toneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 0.85, 0.5]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink [contain:strict]" aria-hidden>
      {/* tom radial evolutivo */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: toneOpacity,
          background:
            "radial-gradient(55rem 55rem at 80% -8%, rgba(var(--accent-rgb), 0.18), transparent 60%), radial-gradient(50rem 50rem at -10% 35%, rgba(var(--accent-rgb), 0.11), transparent 55%)",
        }}
      />

      {/* auroras: deriva própria + parallax */}
      <motion.div style={{ y: yAuroraA }} className="absolute left-[-12%] top-[6%] h-[42rem] w-[42rem]">
        <div className="aurora-a h-full w-full rounded-full bg-accent/20 blur-[110px]" />
      </motion.div>
      <motion.div style={{ y: yAuroraB }} className="absolute right-[-14%] top-[48%] h-[38rem] w-[38rem]">
        <div className="aurora-b h-full w-full rounded-full bg-accent/15 blur-[110px]" />
      </motion.div>

      {/* malha de pontos em parallax (sem loop próprio — o scroll é o motor) */}
      <motion.div
        style={{ y: yDots }}
        className="backdrop-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(90%_80%_at_50%_30%,black,transparent)]"
      />

      {/* vinheta */}
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
