"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Canvas contínuo "Spark OS" — estética blueprint / grid técnico (editorial-tech).
 * Grid de linhas (maior teal + menor neutra) com crosshairs e ticks de coordenada,
 * um foco central que respira e um scanner lento. Parallax por scroll.
 * 2D, só transform/opacity.
 */

// crosshairs e ticks esparsos, em coordenadas % (anotações de blueprint)
const MARKS = [
  { x: 16, y: 22 },
  { x: 84, y: 18 },
  { x: 50, y: 40 },
  { x: 24, y: 70 },
  { x: 78, y: 66 },
  { x: 62, y: 86 },
];

export function SparkBackdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const yGrid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yMarks = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  // foco central "respira" ao longo da página
  const focusOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.95, 0.55]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-ink [contain:strict]" aria-hidden>
      {/* foco central teal (substitui as auroras dispersas) */}
      <motion.div
        style={{ y: yGlow, opacity: focusOpacity }}
        className="absolute left-1/2 top-1/3 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,164,205,0.16),transparent_62%)] blur-2xl"
      />

      {/* grid blueprint com máscara radial (foco no centro, some nas bordas) */}
      <motion.div
        style={{ y: yGrid }}
        className="blueprint-grid absolute inset-[-15%] [mask-image:radial-gradient(115%_90%_at_50%_35%,black_30%,transparent_85%)]"
      />

      {/* crosshairs / ticks de coordenada */}
      <motion.svg
        style={{ y: yMarks }}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {MARKS.map((m, i) => (
          <g key={i} stroke="rgba(0,164,205,0.4)" strokeWidth={0.12}>
            <line x1={m.x - 1.1} y1={m.y} x2={m.x + 1.1} y2={m.y} />
            <line x1={m.x} y1={m.y - 1.1} x2={m.x} y2={m.y + 1.1} />
            {!reduce && (
              <circle cx={m.x} cy={m.y} r={0.45} fill="rgba(0,164,205,0.55)" stroke="none">
                <animate
                  attributeName="opacity"
                  values="0.25;1;0.25"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.5}s`}
                />
              </circle>
            )}
          </g>
        ))}
      </motion.svg>

      {/* scanner lento de blueprint */}
      {!reduce && (
        <div className="blueprint-scan absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      )}

      {/* vinheta */}
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
