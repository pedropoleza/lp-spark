"use client";

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
import { STAGES, fmtUSD, type Opp, type Tone } from "@/content/demo/data";
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
          <p className="font-mono text-[11px] tabular-nums text-muted">{fmtUSD(opp.value)}/ano</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-medium", tagClass(opp.tag))}>{opp.tag}</span>
        <span className="text-[10px] text-muted">{opp.ageDays === 0 ? "hoje" : `${opp.ageDays}d`}</span>
      </div>
    </div>
  );
}

function Column({ stage, opps }: { stage: (typeof STAGES)[number]; opps: Opp[] }) {
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
      <p className={cn("mb-2 px-1 font-mono text-[11px] tabular-nums", tone.text)}>{fmtUSD(total)}</p>
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

/** Funil kanban com drag & drop real — os totais por coluna recalculam ao arrastar. */
export function Funnel() {
  const { store, dispatch } = useDemo();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function onDragEnd(e: DragEndEvent) {
    const id = String(e.active.id);
    const toStage = e.over ? String(e.over.id) : null;
    if (toStage && STAGES.some((s) => s.id === toStage)) dispatch({ type: "opp.move", id, toStage });
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STAGES.map((stage) => (
          <Column key={stage.id} stage={stage} opps={store.opps.filter((o) => o.stageId === stage.id)} />
        ))}
      </div>
    </DndContext>
  );
}
