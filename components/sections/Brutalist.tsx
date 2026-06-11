"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { GlitchText } from "../ui/motion2d";
import { BotReaction } from "../ui/BotReaction";
import { cn } from "@/lib/utils";

/* ===========================================================
   SEÇÃO 1 — "Compare os planos" (grid brutalista, 4 linhas)
   Cores via tokens da paleta: paper / ink / ink-deep / accent.
   =========================================================== */

const COMPARE_ROWS = [
  { label: "CRM & PIPELINE", value: "EM TODOS OS PLANOS" },
  { label: "AUTOMAÇÕES", value: "9 → 19 WORKFLOWS" },
  { label: "SPARKBOT IA", value: "200 → 1500 MSG" },
  { label: "DASHBOARDS", value: "CAPTAÇÃO → EQUIPE" },
];

const MARQUEE_WORDS = ["COMPARE", "OS", "PLANOS", "/", "SPARK", "LEADS", "/"];

export function CompareStrip() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  // preenchimento de acento de cada linha, escalonado conforme o scroll
  const w0 = useTransform(spring, [0.0, 0.45], ["0%", "100%"]);
  const w1 = useTransform(spring, [0.12, 0.57], ["0%", "100%"]);
  const w2 = useTransform(spring, [0.24, 0.69], ["0%", "100%"]);
  const w3 = useTransform(spring, [0.36, 0.81], ["0%", "100%"]);
  const widths = [w0, w1, w2, w3];

  return (
    <section ref={ref} id="compare-strip" className="scroll-mt-24 bg-paper">
      {/* header marquee */}
      <div className="overflow-hidden border-y-[3px] border-ink bg-ink-deep py-2">
        <div className={cn("flex w-max whitespace-nowrap", !reduce && "animate-marquee")}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {MARQUEE_WORDS.map((word, i) => (
                <span
                  key={`${copy}-${i}`}
                  className={cn(
                    "px-4 font-heavy uppercase leading-none",
                    i % 2 === 0 ? "text-paper" : "text-accent",
                  )}
                  style={{ fontSize: "clamp(72px, 14vw, 220px)" }}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 4 linhas com barra de preenchimento (acento) */}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        {COMPARE_ROWS.map((row, i) => (
          <div
            key={row.label}
            className="relative flex items-center overflow-hidden border-b-[3px] border-ink"
            style={{ minHeight: "clamp(84px, 13vw, 168px)" }}
          >
            {/* barra de acento (cover) que se preenche no scroll */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: reduce ? "100%" : widths[i] }}
            />
            <div className="relative z-10 flex w-full items-center justify-between gap-4 px-1">
              <span
                className="font-heavy uppercase leading-none tracking-tight text-ink"
                style={{ fontSize: "clamp(28px, 6vw, 80px)" }}
              >
                {row.label}
              </span>
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-ink sm:text-sm">
                {row.value}
              </span>
            </div>
          </div>
        ))}

        {/* footer link */}
        <div className="py-8">
          <a
            href="#comparar"
            className="inline-block font-mono text-sm uppercase tracking-[0.2em] text-ink transition hover:opacity-70"
          >
            <span className="border-b-[3px] border-accent pb-1">ver comparativo completo →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================
   SEÇÃO 2 — "SPARK.DIAGNOSE --CLIENT" (bug / terminal)
   =========================================================== */

function TypoBug({ wrong, right }: { wrong: string; right: string }) {
  return (
    <span className="inline-flex items-baseline gap-2 font-mono">
      <span className="text-muted line-through decoration-2">{wrong}</span>
      <span aria-hidden className="text-muted">
        →
      </span>
      <span className="text-accent">{right}</span>
    </span>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute h-5 w-5 border-accent", className)} />
  );
}

export function DiagnoseTerminal() {
  return (
    <section
      id="diagnose"
      className="relative scroll-mt-24 overflow-hidden bg-ink-deep py-20 text-paper sm:py-28"
    >
      <div className="scanlines" />

      {/* marcadores de canto */}
      <CornerMark className="left-4 top-4 border-l-2 border-t-2" />
      <CornerMark className="right-4 top-4 border-r-2 border-t-2" />
      <CornerMark className="bottom-4 left-4 border-b-2 border-l-2" />
      <CornerMark className="bottom-4 right-4 border-b-2 border-r-2" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-5 sm:px-8">
        {/* barra de terminal */}
        <div className="mb-10 flex items-center gap-4 border-b border-paper/15 pb-4">
          <span className="flex gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-accent/50" />
            <span className="h-3 w-3 rounded-full bg-graphite" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">
            spark://diagnose
          </span>
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            [ <span className="blink">████████░░</span> ]
          </span>
        </div>

        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.4em] text-accent">
          $ spark.diagnose --client
        </p>

        <h2
          className="font-heavy uppercase leading-[0.95] tracking-tighter"
          style={{ fontSize: "clamp(44px, 9vw, 140px)" }}
        >
          <GlitchText>SPARK.DIAGNOSE</GlitchText>
          <span className="block text-accent">--CLIENT</span>
        </h2>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-paper/85 sm:text-xl">
          A maioria das empresas opera num caos invisível: leads que esfriam sem follow-up,
          recrutamento sem etapa e decisões no achismo. A Spark roda o diagnóstico e converte esse
          ruído em sistema — com pipeline, automações e dashboards.
        </p>

        <p className="mt-8 font-mono text-base uppercase tracking-[0.15em] sm:text-lg">
          STATUS DA OPERAÇÃO: <TypoBug wrong="quebrada" right="funcionando" />
        </p>

        <p className="mt-10 font-mono text-sm uppercase tracking-[0.3em] text-accent sm:text-base">
          {">"} spark.fix(operacao) — pronto para deploy <span className="blink">█</span>
        </p>

        <div className="mt-10 flex justify-end">
          <BotReaction
            clip="/bot/bot-surprise"
            caption="Diagnóstico rodado: achei os gargalos. Dá pra arrumar isso."
            blend
            side="right"
          />
        </div>
      </div>
    </section>
  );
}
