"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "../scenes-boss/BossMark";
import { NATALIA_GRUPO } from "@/content/talk/copy-boss-grupo";

export function NataliaEndorse() {
  return (
    <TalkSceneFrame label={NATALIA_GRUPO.eyebrow}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl rounded-card-lg border border-accent/25 bg-accent/[0.05] p-8"
      >
        <Quote className="h-8 w-8 text-accent/70" />
        <p className="mt-4 font-display font-bold leading-[1.2] text-cream" style={{ fontSize: "clamp(1.5rem, 3.4vw, 2.3rem)" }}>
          {NATALIA_GRUPO.quote}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 font-display font-bold text-accent">
            NF
          </span>
          <div>
            <p className="font-semibold text-cream">{NATALIA_GRUPO.name}</p>
            <p className="text-sm text-accent">{NATALIA_GRUPO.role}</p>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-muted"
      >
        {NATALIA_GRUPO.body.split("a sua vez")[0]}
        <span className="text-cream">a sua vez{NATALIA_GRUPO.body.split("a sua vez")[1]}</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
