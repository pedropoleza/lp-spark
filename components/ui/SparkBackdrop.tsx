"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Canvas contínuo "Spark OS" — camada fixa atrás de toda a página.
 * O tom evolui e as camadas fazem parallax conforme o scroll, dando a sensação
 * de um sistema vivo por trás dos painéis translúcidos. 2D, só transform/opacity.
 */
export function SparkBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yDots = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const yAuroraA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -240]);
  const yAuroraB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  // tom "respira" — acentua no meio da página e suaviza nas pontas
  const toneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.85, 0.45]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden>
      {/* tom radial evolutivo */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: toneOpacity,
          background:
            "radial-gradient(60rem 60rem at 82% -8%, rgba(var(--accent-rgb), 0.16), transparent 60%), radial-gradient(52rem 52rem at -10% 32%, rgba(var(--accent-rgb), 0.10), transparent 55%)",
        }}
      />

      {/* auroras de acento em parallax */}
      <motion.div
        style={{ y: yAuroraA }}
        className="absolute left-[-12%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-accent/15 blur-[110px]"
      />
      <motion.div
        style={{ y: yAuroraB }}
        className="absolute right-[-14%] top-[52%] h-[38rem] w-[38rem] rounded-full bg-accent/10 blur-[110px]"
      />

      {/* malha de pontos (constelação) em parallax lento */}
      <motion.div
        style={{ y: yDots }}
        className="backdrop-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(85%_75%_at_50%_30%,black,transparent)]"
      />

      {/* vinheta para aprofundar as bordas */}
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
