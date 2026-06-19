"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { MOMENT_BOSS } from "@/content/talk/copy-boss";

export function MomentBoss() {
  return (
    <TalkSceneFrame label={MOMENT_BOSS.eyebrow}>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.12]"
        style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}
      >
        Uma das <span className="gradient-text">maiores agências</span> da Five Rings.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-card-lg border border-amber-400/25 bg-amber-400/[0.05] p-4"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
          <TrendingDown className="h-5 w-5" />
        </span>
        <div>
          {MOMENT_BOSS.points.map((p) => (
            <p key={p} className="text-[15px] leading-snug text-cream/90">
              {p}
            </p>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-7 max-w-xl border-l-2 border-accent pl-4 text-lg text-cream"
      >
        {MOMENT_BOSS.punch}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mx-auto mt-5 max-w-xl text-center text-muted"
      >
        A pergunta não é trocar de ferramenta. É ter uma estrutura que trabalha pra <BossMark className="text-cream" />.
      </motion.p>
    </TalkSceneFrame>
  );
}
