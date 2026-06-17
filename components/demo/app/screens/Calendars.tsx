"use client";

import { useState } from "react";
import { Check, Clock, CalendarDays, Link2 } from "lucide-react";
import { useDemo } from "../../demo-context";
import { cn } from "@/lib/utils";

const SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const TAKEN = new Set(["10:00", "16:00"]);

export function Calendars() {
  const { store, dispatch } = useDemo();
  const [justBooked, setJustBooked] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  function copyLink() {
    navigator.clipboard?.writeText("https://spark.link/marcos/discovery").catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1600);
  }

  function book(time: string) {
    if (TAKEN.has(time)) return;
    dispatch({ type: "agenda.add", event: { id: `slot-${time}`, title: "Novo agendamento (lead)", when: `Hoje · ${time}`, kind: "discovery" } });
    TAKEN.add(time);
    setJustBooked(time);
    setTimeout(() => setJustBooked(null), 2200);
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-[260px_1fr]">
      {/* agenda de hoje */}
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted">
          <CalendarDays className="h-3.5 w-3.5" /> Hoje · {store.agenda.length}
        </p>
        <div className="space-y-2">
          {store.agenda.map((e) => (
            <div key={e.id} className="rounded-lg border border-white/10 bg-ink/40 p-3">
              <p className="text-[13px] font-medium text-cream">{e.title}</p>
              <p className="flex items-center gap-1 text-[11px] text-muted"><Clock className="h-3 w-3" /> {e.when}</p>
            </div>
          ))}
        </div>
      </div>

      {/* página pública de agendamento */}
      <div className="rounded-xl border border-white/10 bg-ink/40 p-5">
        <p className="text-[11px] uppercase tracking-wide text-accent">Página de agendamento</p>
        <h3 className="font-display text-lg font-bold text-cream">Discovery Call · 30 min</h3>
        <p className="mb-3 text-xs text-muted">O lead escolhe o horário e entra direto na sua agenda.</p>
        <div data-tour="cal-link" className="mb-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <Link2 className="h-3.5 w-3.5 shrink-0 text-accent" />
          <span className="flex-1 truncate font-mono text-[11px] text-muted">spark.link/marcos/discovery</span>
          <button onClick={copyLink} className="shrink-0 text-[11px] font-semibold text-accent">
            {linkCopied ? "copiado" : "copiar link"}
          </button>
        </div>
        <div data-tour="cal-slots" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {SLOTS.map((t) => {
            const taken = TAKEN.has(t);
            return (
              <button
                key={t}
                onClick={() => book(t)}
                disabled={taken}
                className={cn(
                  "rounded-lg border px-2 py-2.5 text-center text-[13px] tabular-nums transition",
                  taken ? "cursor-not-allowed border-white/5 text-muted/40 line-through" : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
        {justBooked && (
          <p className="mt-4 flex items-center gap-1.5 rounded-lg border border-lime/30 bg-lime/10 px-3 py-2 text-[13px] text-lime">
            <Check className="h-4 w-4" /> Agendado {justBooked}. Confirmação enviada e lembrete programado.
          </p>
        )}
      </div>
    </div>
  );
}
