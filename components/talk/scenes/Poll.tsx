"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { TALK } from "@/content/talk/copy";
import { cn } from "@/lib/utils";

const OPTIONS = ["1", "2", "3", "5+"];

export function Poll() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <TalkSceneFrame label="Enquete · responda em voz alta">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3rem)" }}>
        Depois de quantos “não” <span className="gradient-text">você desiste?</span>
      </h2>

      <div className="mx-auto mt-9 grid max-w-xl grid-cols-4 gap-3">
        {OPTIONS.map((o) => {
          const isPick = picked === o;
          const isWin = picked && o === "5+";
          return (
            <button
              key={o}
              onClick={() => setPicked(o)}
              className={cn(
                "rounded-card-lg border py-6 font-display text-2xl font-bold transition",
                isWin
                  ? "border-lime/50 bg-lime/10 text-lime"
                  : isPick
                    ? "border-amber-400/50 bg-amber-400/10 text-amber-300"
                    : "border-white/10 bg-white/[0.03] text-cream hover:border-accent/40",
              )}
            >
              {o}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-9 max-w-xl space-y-3"
          >
            <div className="flex items-center gap-4 rounded-card-lg border border-amber-400/25 bg-amber-400/[0.06] p-4">
              <span className="font-display text-3xl font-bold tabular-nums text-amber-300">{TALK.stats.giveUpAfterFirst}%</span>
              <p className="text-sm text-cream/90">dos vendedores desistem depois de <span className="font-semibold">um único</span> follow-up.</p>
            </div>
            <div className="flex items-center gap-4 rounded-card-lg border border-lime/30 bg-lime/[0.06] p-4">
              <span className="font-display text-3xl font-bold tabular-nums text-lime">{TALK.stats.salesAfterFifth}%</span>
              <p className="text-sm text-cream/90">das vendas acontecem do <span className="font-semibold">5º contato em diante.</span></p>
            </div>
            <p className="text-center text-xs text-muted/70">Estudos de vendas (direcional). [confirmar fonte]</p>
          </motion.div>
        )}
      </AnimatePresence>
    </TalkSceneFrame>
  );
}
