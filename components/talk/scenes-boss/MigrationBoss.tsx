"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { MIGRATION_BOSS } from "@/content/talk/copy-boss";

export function MigrationBoss() {
  return (
    <TalkSceneFrame wide label="Sair do Como sem perder nada">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)" }}>
        Você troca de ferramenta. <span className="gradient-text">Não perde a sua operação.</span>
      </h2>

      <div className="mx-auto mt-9 flex max-w-3xl items-center gap-4">
        {/* Como */}
        <div className="grid h-24 flex-1 place-items-center rounded-card-lg border border-white/10 bg-white/[0.02]">
          <span className="font-display text-xl font-bold text-muted">{MIGRATION_BOSS.from}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-ink"
        >
          <ArrowRight className="h-5 w-5" />
        </motion.div>

        {/* Spark */}
        <div className="grid h-24 flex-1 place-items-center rounded-card-lg border border-accent/30 bg-accent/[0.06]">
          <span className="font-display text-xl font-bold text-cream">{MIGRATION_BOSS.to}</span>
        </div>
      </div>

      {/* checklist do que migra */}
      <div className="mx-auto mt-6 grid max-w-3xl gap-2.5 sm:grid-cols-2">
        {MIGRATION_BOSS.items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.18 }}
            className={`flex items-center gap-3 rounded-card-lg border px-4 py-3 ${
              it.confirmed ? "border-lime/25 bg-lime/[0.05]" : "border-amber-400/25 bg-amber-400/[0.05]"
            }`}
          >
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${it.confirmed ? "bg-lime/15 text-lime" : "bg-amber-400/15 text-amber-300"}`}>
              {it.confirmed ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </span>
            <span className="flex-1 text-[15px] text-cream">{it.label}</span>
            {!it.confirmed && <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-300/80">a confirmar</span>}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-card-lg border border-accent/25 bg-accent/[0.05] px-4 py-3"
      >
        <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-cream/90">{MIGRATION_BOSS.proof}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
