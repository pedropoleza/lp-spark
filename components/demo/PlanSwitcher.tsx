"use client";

import { useDemo } from "./demo-context";
import { PLAN_NAME } from "@/content/demo/plans-features";
import type { PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

const PLANS: PlanId[] = ["starter", "growth", "agency"];

/** Seletor de plano ativo (o apresentador customiza a demo na hora). */
export function PlanSwitcher({ className }: { className?: string }) {
  const { activePlan, setActivePlan } = useDemo();
  return (
    <div className={cn("flex rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] font-medium", className)}>
      {PLANS.map((p) => (
        <button
          key={p}
          onClick={() => setActivePlan(p)}
          className={cn("rounded-full px-2.5 py-1 transition", activePlan === p ? "bg-accent text-ink" : "text-muted hover:text-cream")}
        >
          {PLAN_NAME[p]}
        </button>
      ))}
    </div>
  );
}
