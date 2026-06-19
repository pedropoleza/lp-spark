"use client";

import { motion } from "framer-motion";
import { Copy, Layers, ArrowDownToLine } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { SNAPSHOTS_BOSS } from "@/content/talk/copy-boss";

export function SnapshotsBoss() {
  return (
    <TalkSceneFrame wide label={SNAPSHOTS_BOSS.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
        Customize uma vez. <span className="gradient-text">Replique pra todos.</span>
      </h2>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
        {SNAPSHOTS_BOSS.plans.map((p, i) => {
          const featured = i === 1;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.18 }}
              className={`flex flex-col overflow-hidden rounded-card-lg border ${
                featured ? "border-accent/50 bg-accent/[0.06]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {/* cabeçalho white-label */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Layers className="h-3.5 w-3.5" /> Snapshot
                </span>
                <BossMark className="text-sm text-cream" />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="font-display text-2xl font-bold text-cream">{p.name}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent">
                  <Copy className="h-3.5 w-3.5" /> Replicar pro agente
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* replicação pros agentes */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-6 flex max-w-3xl items-center gap-3 rounded-card-lg border border-accent/25 bg-accent/[0.05] px-4 py-3"
      >
        <ArrowDownToLine className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-cream/90">{SNAPSHOTS_BOSS.punch}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
