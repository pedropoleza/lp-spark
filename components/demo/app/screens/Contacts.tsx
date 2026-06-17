"use client";

import { useState } from "react";
import { ChevronLeft, MessageCircle, Phone, CalendarCheck, StickyNote, Lock, FileText, CheckSquare, Square } from "lucide-react";
import { CONTACTS, type Contact } from "@/content/demo/screens";
import { useDemo } from "../../demo-context";
import { PLAN_HAS, FEATURE_MINPLAN, PLAN_NAME } from "@/content/demo/plans-features";
import { Avatar } from "../Avatar";
import { cn } from "@/lib/utils";

function scoreTone(s: number) {
  if (s >= 80) return { t: "text-lime", b: "bg-lime" };
  if (s >= 60) return { t: "text-electric", b: "bg-electric" };
  return { t: "text-amber-400", b: "bg-amber-400" };
}
const TL = { msg: MessageCircle, call: Phone, meeting: CalendarCheck, note: StickyNote };

export function Contacts() {
  const { activePlan } = useDemo();
  const hasLeadScore = PLAN_HAS[activePlan].leadScore;
  const [sel, setSel] = useState<Contact | null>(null);

  if (!sel) {
    return (
      <div data-tour="contacts-table" className="h-full overflow-y-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-[13px]">
          <thead className="sticky top-0 bg-card text-[11px] uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-2.5 font-medium">Contato</th>
              <th className="px-4 py-2.5 font-medium">Negócio</th>
              <th className="hidden px-4 py-2.5 font-medium md:table-cell">Última atividade</th>
              <th className="px-4 py-2.5 font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {CONTACTS.map((c) => (
              <tr key={c.id} onClick={() => setSel(c)} className="cursor-pointer border-t border-white/5 transition hover:bg-white/5">
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2.5">
                    <Avatar name={c.name} src={c.avatar} size={32} />
                    <span>
                      <span className="block font-medium text-cream">{c.name}</span>
                      <span className="block text-[11px] text-muted">{c.phone}</span>
                    </span>
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{c.business}</td>
                <td className="hidden px-4 py-3 text-muted md:table-cell">{c.lastActivity}</td>
                <td className="px-4 py-3">
                  <span className="flex flex-wrap gap-1">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-cream/80">{t}</span>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const tone = scoreTone(sel.leadScore);
  return (
    <div className="h-full overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <button onClick={() => setSel(null)} className="mb-4 flex items-center gap-1 text-xs text-muted hover:text-cream">
        <ChevronLeft className="h-4 w-4" /> Contatos
      </button>

      <div className="flex items-start gap-4">
        <Avatar name={sel.name} src={sel.avatar} size={64} />
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-cream">{sel.name}</h3>
          <p className="text-sm text-muted">{sel.business} · {sel.phone}</p>
          <p className="text-xs text-muted">{sel.email}</p>
        </div>
        {/* Lead Score (bloqueado fora do Growth/Agency) */}
        <div className="w-40 shrink-0 rounded-xl border border-white/10 bg-ink/40 p-3 text-center">
          <p className="text-[10px] uppercase tracking-wide text-muted">Lead Score</p>
          {hasLeadScore ? (
            <>
              <p className={cn("font-display text-3xl font-bold tabular-nums", tone.t)}>{sel.leadScore}</p>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className={cn("h-full rounded-full", tone.b)} style={{ width: `${sel.leadScore}%` }} />
              </div>
            </>
          ) : (
            <>
              <Lock className="mx-auto my-1.5 h-5 w-5 text-muted/60" />
              <p className="text-[11px] text-muted">
                no <span className="font-semibold text-accent">{PLAN_NAME[FEATURE_MINPLAN.leadScore]}</span>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[["Origem", sel.source], ["Objeção", sel.objection], ["Status", sel.status]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 bg-ink/30 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted">{k}</p>
            <p className="mt-0.5 text-[13px] text-cream">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-ink/30 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted"><StickyNote className="h-3 w-3" /> Notas</p>
          <p className="text-[12px] text-cream/85">{sel.objection !== "Nenhuma" ? sel.objection : "Cliente fiel, já indicou novos contatos."}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-ink/30 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted"><FileText className="h-3 w-3" /> Documentos</p>
          <p className="flex items-center gap-1.5 text-[12px] text-cream/85"><FileText className="h-3 w-3 text-accent" /> Proposta_FlexLife.pdf</p>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-cream/85"><FileText className="h-3 w-3 text-accent" /> Documento_ID.jpg</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-ink/30 p-3">
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted"><CheckSquare className="h-3 w-3" /> Tarefas</p>
          <p className="flex items-center gap-1.5 text-[12px] text-cream/85"><Square className="h-3 w-3 text-muted" /> Enviar proposta</p>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-muted line-through"><CheckSquare className="h-3 w-3 text-lime" /> Ligar pós-apresentação</p>
        </div>
      </div>

      <p className="mb-2 mt-6 text-[11px] uppercase tracking-wide text-muted">Linha do tempo</p>
      <div className="space-y-2.5">
        {sel.timeline.map((e, i) => {
          const Icon = TL[e.kind];
          return (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[13px] text-cream">{e.text}</p>
                <p className="text-[10px] text-muted">{e.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
