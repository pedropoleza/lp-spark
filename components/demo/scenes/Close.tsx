"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { useSpark } from "@/components/spark-context";
import { PLAN_CONTENT } from "@/content/pt-br";
import { ROI, fmtUSD } from "@/content/demo/data";
import type { PlanId } from "@/lib/plans";

export function Close() {
  const { plan, mode } = useDemo();
  const { openCheckout } = useSpark();
  const planId = (plan ?? "growth") as PlanId;
  const p = PLAN_CONTENT.find((x) => x.id === planId) ?? PLAN_CONTENT[1];

  const recoveredClients = ROI.lostLeadsPerMonth * ROI.recoveryRate; // ~1.2/mês
  const recoveredValue = recoveredClients * ROI.commissionPerClient;
  const clientsToPayback = Math.max(1, Math.ceil(p.price / ROI.commissionPerClient));

  return (
    <SceneFrame label="O próximo passo">
      <h2 className="text-center font-display font-bold leading-[1.06]" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
        O próximo passo óbvio é <span className="gradient-text">começar.</span>
      </h2>

      {/* ROI */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3"
      >
        <div className="rounded-card-lg border border-lime/25 bg-lime/[0.06] p-5 text-center">
          <p className="font-display text-2xl font-bold tabular-nums text-lime">~{fmtUSD(recoveredValue)}/mês</p>
          <p className="mt-1 text-xs text-muted">recuperando só {Math.round(ROI.recoveryRate * 100)}% dos leads que hoje esfriam</p>
        </div>
        <div className="rounded-card-lg border border-white/10 bg-white/[0.03] p-5 text-center">
          <p className="font-display text-2xl font-bold tabular-nums text-cream">US$ {p.price}/mês</p>
          <p className="mt-1 text-xs text-muted">{clientsToPayback === 1 ? "1 cliente novo já paga o plano" : `${clientsToPayback} clientes pagam o plano`}</p>
        </div>
      </motion.div>

      {/* risco zero */}
      <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Cancele quando quiser</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> A gente configura pra você</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Suporte humano em PT</span>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button onClick={() => openCheckout(planId)} className="btn-primary px-8 py-4 text-base">
          {mode === "solo" ? `Assinar o ${p.name} agora` : "Começar agora"} <ArrowRight className="h-5 w-5" />
        </button>
        <p className="text-xs text-muted/70">Condição de fundador. [placeholder: o fundador define a oferta/vagas].</p>
      </div>
    </SceneFrame>
  );
}
