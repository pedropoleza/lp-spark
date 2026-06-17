"use client";

import { motion } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { BEFORE_AFTER } from "@/content/talk/copy";

function Column({ closed, total, label, sub, tone, delay }: { closed: number; total: number; label: string; sub: string; tone: "muted" | "lime"; delay: number }) {
  const pct = Math.round((closed / total) * 100);
  const isLime = tone === "lime";
  return (
    <div className="flex flex-col items-center">
      <p className={`font-display text-sm font-bold ${isLime ? "text-lime" : "text-muted"}`}>{label}</p>
      <p className="mb-3 text-[11px] text-muted/70">{sub}</p>
      <div className="flex h-56 w-28 items-end overflow-hidden rounded-card-lg border border-white/10 bg-white/[0.02]">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${pct}%` }}
          transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full ${isLime ? "bg-lime/70" : "bg-white/15"}`}
        />
      </div>
      <p className={`mt-3 font-display text-3xl font-bold tabular-nums ${isLime ? "text-lime" : "text-cream"}`}>{closed}</p>
      <p className="text-xs text-muted">de {total} fecham</p>
    </div>
  );
}

export function BeforeAfter() {
  const { memory, cadence, total } = BEFORE_AFTER;
  return (
    <TalkSceneFrame label="Antes × depois">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
        Mesmos 100 leads. <span className="gradient-text">Resultados diferentes.</span>
      </h2>

      <div className="mx-auto mt-10 flex max-w-md items-end justify-center gap-12">
        <Column closed={memory.closed} total={total} label={memory.label} sub={memory.sub} tone="muted" delay={0.4} />
        <Column closed={cadence.closed} total={total} label={cadence.label} sub={cadence.sub} tone="lime" delay={0.7} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mx-auto mt-9 max-w-lg text-center text-lg text-muted"
      >
        A diferença não é talento. É <span className="text-cream">constância</span> — e ninguém é constante de cabeça.
      </motion.p>
      <p className="mt-2 text-center text-xs text-muted/60">Números ilustrativos.</p>
    </TalkSceneFrame>
  );
}
