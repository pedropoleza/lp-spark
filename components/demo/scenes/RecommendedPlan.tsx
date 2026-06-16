"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { PLAN_CONTENT } from "@/content/pt-br";

export function RecommendedPlan() {
  const { activePlan } = useDemo();
  const p = PLAN_CONTENT.find((x) => x.id === activePlan) ?? PLAN_CONTENT[1];

  return (
    <SceneFrame label="A sua prescrição" hint="→ veja funcionando">
      <div className="mx-auto max-w-xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Recomendado pra você
          </span>
        </motion.div>

        <h2 className="text-center font-display font-bold leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Spark Leads <span className="gradient-text">{p.name}</span>
        </h2>
        <p className="mt-2 text-center text-lg text-muted">{p.tagline}</p>

        {/* value stack — empilha o valor ANTES do preço (ancoragem) */}
        <div className="mt-7 space-y-2.5">
          {p.features.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-[15px] text-cream">{f}</span>
            </motion.div>
          ))}
        </div>

        {/* preço revelado depois do stack */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + p.features.length * 0.08 }}
          className="mt-7 flex items-end justify-center gap-2 border-t border-white/10 pt-6"
        >
          <span className="font-display text-5xl font-bold">US$ {p.price}</span>
          <span className="mb-2 text-muted">/mês</span>
        </motion.div>
        <p className="mt-2 text-center text-sm text-muted">
          Tudo isso, pronto no dia 1. Agora deixa eu te mostrar funcionando.
        </p>
      </div>
    </SceneFrame>
  );
}
