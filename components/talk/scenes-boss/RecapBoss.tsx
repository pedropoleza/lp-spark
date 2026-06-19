"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { RECAP_BOSS } from "@/content/talk/copy-boss";

export function RecapBoss() {
  return (
    <TalkSceneFrame label="A estrutura da BO$$">
      <div className="mx-auto mb-7 flex max-w-2xl flex-wrap justify-center gap-2.5">
        {RECAP_BOSS.pillars.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/[0.06] px-3.5 py-1.5 text-sm text-cream"
          >
            <Check className="h-3.5 w-3.5 text-accent" /> {p}
          </motion.span>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center font-display font-bold leading-[1.12]"
        style={{ fontSize: "clamp(1.9rem, 4.8vw, 3rem)" }}
      >
        Isso não é trocar de CRM.
        <br className="hidden sm:block" /> É montar a estrutura da <BossMark className="gradient-text" />.
      </motion.h2>
    </TalkSceneFrame>
  );
}
