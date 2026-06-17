"use client";

import { motion } from "framer-motion";
import { Snowflake } from "lucide-react";
import { TalkSceneFrame } from "../bits";

export function Hook() {
  return (
    <TalkSceneFrame label="A pergunta">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.08]"
        style={{ fontSize: "clamp(2rem, 5.4vw, 3.6rem)" }}
      >
        Quantas vendas você perdeu essa semana
        <br className="hidden sm:block" /> <span className="gradient-text">sem nem perceber?</span>
      </motion.h2>

      {/* card de lead esfriando */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-10 max-w-sm"
      >
        <motion.div
          animate={{ opacity: [1, 1, 0.35], filter: ["grayscale(0)", "grayscale(0)", "grayscale(1)"] }}
          transition={{ delay: 1.2, duration: 2.4, times: [0, 0.4, 1] }}
          className="relative flex items-center gap-3 rounded-card-lg border border-white/10 bg-white/[0.03] p-4"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-electric/20 font-semibold text-electric">CL</span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-cream">Cliente que disse “me liga mês que vem”</p>
            <p className="text-xs text-muted">Você anotou. E nunca mais ligou.</p>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8 }}
            className="flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[11px] text-muted"
          >
            <Snowflake className="h-3.5 w-3.5" /> esfriou
          </motion.span>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="mx-auto mt-8 max-w-lg text-center text-lg text-muted"
      >
        Não é falta de lead. É lead que <span className="text-cream">você já tinha na mão.</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
