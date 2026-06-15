"use client";

import { useState } from "react";
import { Users, CalendarCheck, TrendingUp } from "lucide-react";
import { useDemo } from "../../demo-context";
import { STAGES, type Tone } from "@/content/demo/data";
import { cn } from "@/lib/utils";

const BAR: Record<Tone, string> = { lime: "bg-lime", electric: "bg-electric", spark: "bg-accent", amber: "bg-amber-400", glow: "bg-glow" };

export function Dashboard() {
  const { store } = useDemo();
  const [period, setPeriod] = useState(30);

  const total = store.opps.length;
  const clientes = store.opps.filter((o) => o.stageId === "cliente").length;
  const leadsAtivos = total - clientes;
  const conv = total ? Math.round((clientes / total) * 100) : 0;
  const leadsPeriodo = Math.round(leadsAtivos * (period / 30) * 3.2);
  const counts = STAGES.map((s) => ({ s, n: store.opps.filter((o) => o.stageId === s.id).length }));
  const maxN = Math.max(1, ...counts.map((c) => c.n));

  const cards = [
    { icon: Users, label: "Leads ativos", value: leadsAtivos },
    { icon: CalendarCheck, label: "Reuniões hoje", value: store.agenda.length },
    { icon: TrendingUp, label: "Taxa de conversão", value: `${conv}%` },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wide text-muted">Visão geral</p>
        <div className="flex rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px]">
          {[7, 30, 90].map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={cn("rounded-full px-2.5 py-1 transition", period === p ? "bg-accent text-ink" : "text-muted hover:text-cream")}>
              {p}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <Icon className="mb-2 h-4 w-4 text-accent" />
              <p className="font-display text-3xl font-bold tabular-nums text-cream">{c.value}</p>
              <p className="text-[11px] text-muted">{c.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-[13px] font-semibold text-cream">Funil de vendas</p>
          <p className="text-[11px] text-muted">Leads no período ({period}d): <span className="font-semibold tabular-nums text-cream">{leadsPeriodo}</span></p>
        </div>
        <div className="flex h-40 items-end gap-3">
          {counts.map(({ s, n }) => (
            <div key={s.id} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-[12px] font-semibold tabular-nums text-cream">{n}</span>
              <div className={cn("w-full rounded-t-md transition-all", BAR[s.tone])} style={{ height: `${(n / maxN) * 100}%`, minHeight: 6 }} />
              <span className="truncate text-[9px] text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
