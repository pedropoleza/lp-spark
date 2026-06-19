"use client";

import { motion } from "framer-motion";
import { Copy, Layers } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { SNAPSHOTS_BOSS } from "@/content/talk/copy-boss";

const AGENTS = ["AG", "LM", "RC", "JS", "MP", "TF"];

export function SnapshotsBoss() {
  return (
    <TalkSceneFrame wide label={SNAPSHOTS_BOSS.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
        Customize uma vez. <span className="gradient-text">Replique pra todos.</span>
      </h2>

      <div className="mx-auto mt-7 grid max-w-4xl gap-4 md:grid-cols-3">
        {SNAPSHOTS_BOSS.plans.map((p, i) => {
          const featured = i === 1;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.16 }}
              className={`flex flex-col overflow-hidden rounded-card-lg border ${
                featured ? "border-accent/50 bg-accent/[0.06]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
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

      {/* replicação pros agentes (escala) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-4 rounded-card-lg border border-accent/25 bg-accent/[0.04] px-5 py-5 sm:flex-row"
      >
        {/* snapshot origem */}
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent text-ink">
          <Layers className="h-5 w-5" />
        </span>

        {/* leque de agentes */}
        <div className="flex flex-1 items-center justify-center gap-2 sm:justify-start">
          {AGENTS.map((a, i) => (
            <motion.span
              key={a}
              initial={{ opacity: 0, scale: 0.6, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-xs font-semibold text-cream/90"
            >
              {a}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="ml-1 text-sm font-semibold text-accent"
          >
            +todos
          </motion.span>
        </div>

        <p className="text-center text-sm text-cream/90 sm:max-w-[15rem] sm:text-left">{SNAPSHOTS_BOSS.punch}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
