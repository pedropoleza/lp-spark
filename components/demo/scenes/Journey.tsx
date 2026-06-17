"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { LADDER } from "@/content/demo/pitch";
import { PLAN_CONTENT } from "@/content/pt-br";
import { cn } from "@/lib/utils";

/** A jornada: os 3 planos são 3 degraus da carreira. Onde você está → até onde cresce. */
export function Journey() {
  const { activePlan } = useDemo();
  return (
    <SceneFrame label="A sua jornada" hint="→ continue">
      <h2 className="text-center font-display font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}>
        Onde você está hoje, e <span className="gradient-text">até onde o Spark te leva.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">
        Os planos são 3 momentos da sua carreira. O Spark cresce com você.
      </p>

      <div className="mt-9 grid items-end gap-3 sm:grid-cols-3">
        {LADDER.map((rung, i) => {
          const p = PLAN_CONTENT.find((x) => x.id === rung.plan)!;
          const isYou = activePlan === rung.plan;
          return (
            <motion.div
              key={rung.plan}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className={cn(
                "relative rounded-card-lg border p-5 transition",
                isYou ? "border-accent bg-accent/[0.07] shadow-glow" : "border-white/10 bg-white/[0.02]",
              )}
              style={{ marginBottom: i * 14 }}
            >
              {isYou && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-ink">
                  Você está aqui
                </span>
              )}
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{rung.stage}</p>
              <p className="mt-1 font-display text-xl font-bold text-cream">{p.name}</p>
              <p className="text-sm text-muted">{rung.title}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-cream/80">{rung.desc}</p>
              <p className="mt-4 font-display text-2xl font-bold tabular-nums text-cream">US$ {p.price}<span className="text-sm font-normal text-muted">/mês</span></p>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-7 flex items-center justify-center gap-2 text-center text-sm text-muted">
        <Check className="h-4 w-4 text-accent" /> Comece onde faz sentido hoje. Subir de degrau é 1 clique, e seus dados vão junto.
      </p>
    </SceneFrame>
  );
}
