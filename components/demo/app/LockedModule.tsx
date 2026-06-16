"use client";

import { Lock } from "lucide-react";
import { useDemo } from "../demo-context";
import { PLAN_NAME } from "@/content/demo/plans-features";
import type { PlanId } from "@/lib/plans";

/** Overlay de recurso bloqueado no plano ativo (cria caminho de upgrade). */
export function LockedModule({ title, minPlan }: { title: string; minPlan: PlanId }) {
  const { setActivePlan } = useDemo();
  return (
    <div className="grid h-full place-items-center rounded-2xl border border-white/10 bg-card text-center">
      <div className="max-w-xs px-6">
        <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/5 text-muted">
          <Lock className="h-5 w-5" />
        </span>
        <p className="font-display text-lg font-bold text-cream">{title}</p>
        <p className="mt-1 text-sm text-muted">
          Disponível no plano <span className="font-semibold text-accent">{PLAN_NAME[minPlan]}</span> e acima.
        </p>
        <button onClick={() => setActivePlan(minPlan)} className="btn-secondary mt-4 !py-2 text-xs">
          Ver no {PLAN_NAME[minPlan]}
        </button>
      </div>
    </div>
  );
}
