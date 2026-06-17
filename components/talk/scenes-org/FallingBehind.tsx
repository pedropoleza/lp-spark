"use client";

import { motion } from "framer-motion";
import { TrendingUp, ChevronRight } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { FALLING_BEHIND, TALK_ORG } from "@/content/talk/copy-org";

export function FallingBehind() {
  return (
    <TalkSceneFrame label="O mercado não espera">
      <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
        Quem não se organiza{" "}
        <span className="gradient-text">fica para trás</span>, devagar, sem perceber.
      </h2>

      <ul className="mx-auto mt-8 max-w-xl space-y-3">
        {FALLING_BEHIND.points.map((p, i) => (
          <motion.li
            key={p}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.18 }}
            className="flex gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] px-4 py-3"
          >
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-[15px] leading-snug text-cream/90">{p}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-7 flex max-w-xl items-center gap-3 rounded-card-lg border border-accent/25 bg-accent/[0.05] px-4 py-3"
      >
        <TrendingUp className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-cream/90">
          O vendedor médio passa{" "}
          <span className="font-bold text-accent">menos de {TALK_ORG.facts.sellingTimePct}%</span> do tempo de fato
          vendendo. O resto é administração e caça à informação. Organização devolve esse tempo.
          <span className="mt-1 block text-[11px] text-muted/70">Fonte: {TALK_ORG.facts.sellingTimeSource}.</span>
        </p>
      </motion.div>
    </TalkSceneFrame>
  );
}
