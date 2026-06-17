"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDemo } from "../demo-context";
import { PIPELINES, PLAN_RANK, fmtUSD, type Opp, type Stage, type Tone } from "@/content/demo/data";
import { Avatar } from "./Avatar";
import { cn } from "@/lib/utils";

const TONE: Record<Tone, { text: string; dot: string; ring: string }> = {
  lime: { text: "text-lime", dot: "bg-lime", ring: "border-lime/40" },
  electric: { text: "text-electric", dot: "bg-electric", ring: "border-electric/40" },
  spark: { text: "text-accent", dot: "bg-accent", ring: "border-accent/40" },
  amber: { text: "text-amber-400", dot: "bg-amber-400", ring: "border-amber-400/40" },
  glow: { text: "text-glow", dot: "bg-glow", ring: "border-glow/40" },
};

function tagClass(tag: string) {
  if (/quente/i.test(tag)) return "bg-amber-400/15 text-amber-300";
  if (/cliente/i.test(tag)) return "bg-lime/15 text-lime";
  if (/indica/i.test(tag)) return "bg-electric/15 text-electric";
  if (/follow/i.test(tag)) return "bg-accent/15 text-accent";
  return "bg-white/10 text-muted";
}

function Card({ opp }: { opp: Opp }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: opp.id });
  const hasValue = opp.value > 0;
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={cn(
        "group cursor-grab touch-none rounded-xl border border-white/10 bg-card p-3 text-left transition active:cursor-grabbing",
        isDragging ? "z-50 scale-[1.03] border-accent/50 shadow-plan" : "hover:border-white/20",
      )}
    >
      <div className="flex items-center gap-2.5">
        <Avatar name={opp.name} src={opp.avatar} size={34} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-cream">{opp.name}</p>
          <p className="truncate font-mono text-[11px] tabular-nums text-muted">{hasValue ? `${fmtUSD(opp.value)}/ano` : opp.tag}</p>
        </div>
      </div>
      {opp.fiveRings && (opp.birthday || opp.review) && (
        <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-muted">
          {opp.birthday && <span>🎂 {opp.birthday}</span>}
          {opp.review && <span>🔄 {opp.review}</span>}
        </div>
      )}
      <div className="mt-2.5 flex items-center justify-between">
        {hasValue ? (
          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-medium", tagClass(opp.tag))}>{opp.tag}</span>
        ) : (
          <span />
        )}
        <span className="text-[10px] text-muted">{opp.ageDays === 0 ? "hoje" : `${opp.ageDays}d`}</span>
      </div>
    </div>
  );
}

function Column({ stage, opps }: { stage: Stage; opps: Opp[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const total = opps.reduce((s, o) => s + o.value, 0);
  const tone = TONE[stage.tone];
  return (
    <div className="flex w-[230px] shrink-0 flex-col">
      <div className={cn("mb-2 flex items-center justify-between rounded-lg border bg-white/[0.03] px-3 py-2", tone.ring)}>
        <span className="flex items-center gap-2 text-[13px] font-semibold text-cream">
          <i className={cn("h-2 w-2 rounded-full", tone.dot)} />
          {stage.label}
        </span>
        <span className="text-[11px] text-muted">{opps.length}</span>
      </div>
      {total > 0 && <p className={cn("mb-2 px-1 font-mono text-[11px] tabular-nums", tone.text)}>{fmtUSD(total)}</p>}
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[120px] flex-1 flex-col gap-2 rounded-xl border border-dashed p-2 transition",
          isOver ? "border-accent/60 bg-accent/[0.04]" : "border-white/5",
        )}
      >
        {opps.map((o) => (
          <Card key={o.id} opp={o} />
        ))}
      </div>
    </div>
  );
}

/** Funil kanban com drag & drop + seletor de pipeline (por plano) e Five Rings. */
export function Funnel() {
  const { store, dispatch, activePlan } = useDemo();
  const available = PIPELINES.filter((p) => PLAN_RANK[activePlan] >= PLAN_RANK[p.minPlan]);
  const [pid, setPid] = useState("vendas");
  const current = available.find((p) => p.id === pid) ?? available[0];
  const [localOpps, setLocalOpps] = useState<Record<string, Opp[]>>(() =>
    Object.fromEntries(PIPELINES.filter((p) => !p.mutable).map((p) => [p.id, p.opps])),
  );
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const isVendas = !!current.mutable;
  const opps = isVendas ? store.opps : localOpps[current.id] ?? current.opps;

  function onDragEnd(e: DragEndEvent) {
    const id = String(e.active.id);
    const toStage = e.over ? String(e.over.id) : null;
    if (!toStage || !current.stages.some((s) => s.id === toStage)) return;
    if (isVendas) dispatch({ type: "opp.move", id, toStage });
    else setLocalOpps((prev) => ({ ...prev, [current.id]: (prev[current.id] ?? current.opps).map((o) => (o.id === id ? { ...o, stageId: toStage } : o)) }));
  }

  return (
    <div className="flex h-full flex-col">
      {available.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-muted">Funil:</span>
          {available.map((p) => (
            <button
              key={p.id}
              onClick={() => setPid(p.id)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] transition",
                current.id === p.id ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-muted hover:text-cream",
              )}
            >
              {p.name}
            </button>
          ))}
          {current.fiveRings && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-muted">
              <i className="h-1.5 w-1.5 rounded-full bg-lime" /> Sincronizado da Five Rings
            </span>
          )}
        </div>
      )}
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div data-tour="funil-board" className="flex flex-1 gap-3 overflow-x-auto pb-2">
          {current.stages.map((stage) => (
            <Column key={stage.id} stage={stage} opps={opps.filter((o) => o.stageId === stage.id)} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
