"use client";

import { useState } from "react";
import { ChevronLeft, Folder, Sparkles, Plus, Zap, Clock, GitBranch, Send, ArrowRight } from "lucide-react";
import { WORKFLOW_FOLDERS, BUILDER } from "@/content/demo/screens";
import { cn } from "@/lib/utils";

const NODE_ICON = { action: Send, delay: Clock, branch: GitBranch, move: ArrowRight };

export function Automation() {
  const [open, setOpen] = useState<string | null>(null);

  if (open) {
    return (
      <div className="h-full overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <button onClick={() => setOpen(null)} className="mb-4 flex items-center gap-1 text-xs text-muted hover:text-cream">
          <ChevronLeft className="h-4 w-4" /> Automações
        </button>
        <h3 className="font-display text-lg font-bold text-cream">{open}</h3>
        <div className="mx-auto mt-5 flex max-w-sm flex-col items-center">
          {/* gatilho */}
          <div className="w-full rounded-xl border border-accent/50 bg-accent/10 p-3 text-center">
            <p className="text-[10px] uppercase tracking-wide text-accent">Gatilho</p>
            <p className="text-[13px] font-medium text-cream">{BUILDER.trigger}</p>
          </div>
          {BUILDER.nodes.map((n, i) => {
            const Icon = NODE_ICON[n.kind];
            return (
              <div key={i} className="flex w-full flex-col items-center">
                <span className="my-1.5 h-5 w-px bg-white/15" />
                <div className="flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-card p-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 text-accent"><Icon className="h-3.5 w-3.5" /></span>
                  <span className="text-[13px] text-cream">{n.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-[12px] font-medium text-accent">
          <Sparkles className="h-3.5 w-3.5" /> Build using AI
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-cream"><Plus className="h-3.5 w-3.5" /> Create workflow</button>
      </div>
      <div className="space-y-4">
        {WORKFLOW_FOLDERS.map((f) => (
          <div key={f.folder}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-semibold text-cream/80"><Folder className="h-3.5 w-3.5 text-muted" /> {f.folder}</p>
            <div className="overflow-hidden rounded-lg border border-white/10">
              {f.items.map((it, i) => (
                <button
                  key={it.name}
                  onClick={() => setOpen(it.name)}
                  className={cn("flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-white/5", i > 0 && "border-t border-white/5")}
                >
                  <Zap className={cn("h-3.5 w-3.5 shrink-0", it.status === "active" ? "text-lime" : "text-muted/50")} />
                  <span className="flex-1 truncate text-[13px] text-cream">{it.name}</span>
                  <span className={cn("rounded px-1.5 py-0.5 text-[10px]", it.status === "active" ? "bg-lime/15 text-lime" : "bg-white/10 text-muted")}>{it.status === "active" ? "Ativo" : "Rascunho"}</span>
                  <span className="hidden text-[11px] tabular-nums text-muted sm:inline">{it.active} ativos · {it.enrolled} total</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
