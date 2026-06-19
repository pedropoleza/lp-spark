"use client";

import { motion } from "framer-motion";
import { Zap, X } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { COVER_BOSS } from "@/content/talk/copy-boss";

export function CoverBoss() {
  return (
    <TalkSceneFrame hint="Setas ← → para navegar · F tela cheia · N seu roteiro">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-9 flex items-center justify-center gap-5"
      >
        <div className="grid h-16 min-w-[8rem] place-items-center rounded-2xl border border-white/10 bg-white/[0.03] px-6">
          <BossMark className="text-2xl text-cream" />
        </div>
        <X className="h-5 w-5 text-muted" />
        <div className="flex h-16 items-center gap-2 rounded-2xl border border-accent/30 bg-accent/[0.06] px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold text-cream">Spark Leads</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="label-mono text-center"
      >
        {COVER_BOSS.eyebrow} <BossMark className="text-accent" />
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-4 text-center font-display font-bold leading-[1.04]"
        style={{ fontSize: "clamp(2.3rem, 6vw, 4.4rem)" }}
      >
        A estrutura da <BossMark className="gradient-text" />.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-muted"
      >
        {COVER_BOSS.sub}
      </motion.p>
    </TalkSceneFrame>
  );
}
