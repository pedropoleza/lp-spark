"use client";

import { motion } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { AGENDA_BOSS } from "@/content/talk/copy-boss";

export function AgendaBoss() {
  return (
    <TalkSceneFrame label="O que vamos ver hoje">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.8rem)" }}>
        Cinco coisas. <span className="gradient-text">Sem enrolação.</span>
      </h2>

      <div className="mx-auto mt-9 max-w-2xl space-y-3">
        {AGENDA_BOSS.map((a, i) => (
          <motion.div
            key={a.n}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex items-center gap-4 rounded-card-lg border border-white/10 bg-white/[0.02] px-5 py-3.5"
          >
            <span className="font-display text-xl font-bold tabular-nums text-accent">{a.n}</span>
            <span className="text-[17px] text-cream">{a.t}</span>
          </motion.div>
        ))}
      </div>
    </TalkSceneFrame>
  );
}
