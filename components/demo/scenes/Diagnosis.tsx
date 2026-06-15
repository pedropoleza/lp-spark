"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { PAIN_DIAGNOSIS } from "@/content/demo/quiz";
import { ROI, fmtUSD } from "@/content/demo/data";

export function Diagnosis() {
  const { pain } = useDemo();
  const d = pain ? PAIN_DIAGNOSIS[pain] : PAIN_DIAGNOSIS.followup;
  const monthlyLost = ROI.lostLeadsPerMonth * ROI.commissionPerClient;

  return (
    <SceneFrame label="O diagnóstico" hint="Faz sentido? → continue">
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.08]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
      >
        {d.headline}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mx-auto mt-5 max-w-xl text-center text-lg leading-relaxed text-muted"
      >
        {d.body}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-card-lg border border-amber-400/25 bg-amber-400/[0.06] p-5"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
          <TrendingDown className="h-6 w-6" />
        </span>
        <div>
          <p className="font-display text-2xl font-bold tabular-nums text-cream">~{fmtUSD(monthlyLost)}/mês</p>
          <p className="text-sm text-muted">
            estimados saindo pela porta — ~{ROI.lostLeadsPerMonth} leads que esfriam, a {fmtUSD(ROI.commissionPerClient)} de comissão cada.
          </p>
        </div>
      </motion.div>
      <p className="mt-4 text-center text-xs text-muted/70">Estimativa ilustrativa — ajustável com seus números reais.</p>
    </SceneFrame>
  );
}
