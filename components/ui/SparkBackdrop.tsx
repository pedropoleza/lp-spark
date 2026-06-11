"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Canvas contínuo "Spark OS" — camada fixa atrás de toda a página.
 * Mistura tom evolutivo + auroras que flutuam sozinhas + parallax por scroll +
 * feixe de varredura + constelação cintilante. 2D, só transform/opacity.
 */
const NODES = [
  { x: 12, y: 22, d: 0 },
  { x: 28, y: 64, d: 0.6 },
  { x: 44, y: 30, d: 1.2 },
  { x: 62, y: 72, d: 0.3 },
  { x: 74, y: 38, d: 1.6 },
  { x: 88, y: 60, d: 0.9 },
  { x: 54, y: 14, d: 2.1 },
  { x: 20, y: 44, d: 1.4 },
];

export function SparkBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yDots = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const yAuroraA = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -320]);
  const yAuroraB = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 260]);
  const yAuroraC = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -160]);
  const yConst = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  // tom "respira" forte ao longo da página
  const toneOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.55]);
  const hue = useTransform(scrollYProgress, [0, 0.5, 1], [0, 18, -10]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink" aria-hidden>
      {/* tom radial evolutivo */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: toneOpacity,
          rotate: reduce ? 0 : hue,
          background:
            "radial-gradient(55rem 55rem at 80% -8%, rgba(var(--accent-rgb), 0.22), transparent 60%), radial-gradient(50rem 50rem at -10% 35%, rgba(var(--accent-rgb), 0.14), transparent 55%)",
        }}
      />

      {/* auroras: flutuam sozinhas + parallax */}
      <motion.div style={{ y: yAuroraA }} className="absolute left-[-12%] top-[4%] h-[44rem] w-[44rem]">
        <div className="aurora-a h-full w-full rounded-full bg-accent/25 blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: yAuroraB }} className="absolute right-[-16%] top-[42%] h-[40rem] w-[40rem]">
        <div className="aurora-b h-full w-full rounded-full bg-accent/20 blur-[120px]" />
      </motion.div>
      <motion.div style={{ y: yAuroraC }} className="absolute left-[30%] top-[78%] h-[34rem] w-[34rem]">
        <div className="aurora-c h-full w-full rounded-full bg-accent/15 blur-[120px]" />
      </motion.div>

      {/* feixe de varredura diagonal */}
      {!reduce && <div className="scan-beam" />}

      {/* malha de pontos: rola sozinha + parallax */}
      <motion.div
        style={{ y: yDots }}
        className="backdrop-dots dots-drift absolute inset-0 opacity-70 [mask-image:radial-gradient(90%_80%_at_50%_30%,black,transparent)]"
      />

      {/* constelação cintilante */}
      <motion.svg
        style={{ y: yConst }}
        className="absolute inset-0 h-full w-full opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {NODES.slice(0, -1).map((n, i) => {
          const m = NODES[i + 1];
          return (
            <line
              key={`l-${i}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke="rgba(0,164,205,0.18)"
              strokeWidth={0.12}
            />
          );
        })}
        {NODES.map((n, i) => (
          <circle
            key={`c-${i}`}
            cx={n.x}
            cy={n.y}
            r={0.5}
            fill="#00a4cd"
            className={reduce ? "" : "twinkle"}
            style={{ transformOrigin: `${n.x}px ${n.y}px`, animationDelay: `${n.d}s` }}
          />
        ))}
      </motion.svg>

      {/* vinheta */}
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
