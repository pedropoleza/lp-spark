"use client";

import { useState } from "react";
import { Users, CalendarCheck, TrendingUp, Sparkles, Check } from "lucide-react";
import { useDemo } from "../../demo-context";
import { STAGES, type Tone } from "@/content/demo/data";
import { cn } from "@/lib/utils";

const BAR: Record<Tone, string> = { lime: "bg-lime", electric: "bg-electric", spark: "bg-accent", amber: "bg-amber-400", glow: "bg-glow" };

export function Dashboard() {
  const { store } = useDemo();
  const [period, setPeriod] = useState(30);
  const [gen, setGen] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState(false);

  const GENS: Record<string, { label: string; pct: number; tone: Tone }[]> = {
    "Origem dos meus leads": [
      { label: "Instagram", pct: 42, tone: "electric" },
      { label: "WhatsApp", pct: 31, tone: "lime" },
      { label: "Indicação", pct: 27, tone: "spark" },
    ],
    "Taxa de comparecimento": [{ label: "Compareceram", pct: 82, tone: "lime" }],
  };

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

      <div data-tour="dash-cards" className="grid grid-cols-3 gap-3">
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

      {/* Pergunte à IA */}
      <div data-tour="dash-askai" className="mt-3 rounded-xl border border-accent/20 bg-accent/[0.04] p-4">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold text-cream">
          <Sparkles className="h-3.5 w-3.5 text-accent" /> Pergunte à IA
        </p>
        <p className="text-[11px] text-muted">Peça qualquer métrica e o SparkBot monta o painel pra você.</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {Object.keys(GENS).map((q) => (
            <button
              key={q}
              onClick={() => setGen(q)}
              className={cn("rounded-full border px-2.5 py-1 text-[11px] transition", gen === q ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-muted hover:text-cream")}
            >
              {q}
            </button>
          ))}
          <button
            onClick={() => setScheduled((s) => !s)}
            className={cn("flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition", scheduled ? "border-lime/40 bg-lime/10 text-lime" : "border-white/10 text-muted hover:text-cream")}
          >
            {scheduled && <Check className="h-3 w-3" />} {scheduled ? "Resumo toda sexta" : "Agendar resumo (sexta)"}
          </button>
        </div>
        {gen && (
          <div className="mt-3 rounded-lg border border-white/10 bg-ink/30 p-3">
            <p className="mb-2 text-[12px] font-semibold text-cream">{gen}</p>
            <div className="space-y-1.5">
              {GENS[gen].map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <span className="w-24 shrink-0 text-[11px] text-muted">{r.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div className={cn("h-full rounded-full", BAR[r.tone])} style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-cream">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
