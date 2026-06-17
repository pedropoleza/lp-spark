"use client";

import { motion } from "framer-motion";
import { Table2, Gift } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { START_SIMPLE } from "@/content/talk/copy-org";

export function StartSimple() {
  return (
    <TalkSceneFrame wide label="Presente: faça isso hoje">
      <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
        Você não precisa do Spark pra começar.{" "}
        <span className="gradient-text">Precisa começar.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{START_SIMPLE.lead}</p>

      {/* planilha ilustrativa */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-card-lg border border-white/10"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
          <Table2 className="h-4 w-4 text-lime" />
          <span className="text-sm font-semibold text-cream">Minha base · planilha simples</span>
        </div>
        <div className="grid grid-cols-5 divide-x divide-white/5 bg-white/[0.02] text-center">
          {START_SIMPLE.columns.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="px-2 py-3 text-[12.5px] font-medium text-cream/90"
            >
              {c}
            </motion.div>
          ))}
          {/* duas linhas-fantasma para parecer planilha */}
          {[0, 1].map((row) =>
            START_SIMPLE.columns.map((_, i) => (
              <div key={`${row}-${i}`} className="border-t border-white/5 px-2 py-3">
                <span className="mx-auto block h-2 w-3/4 rounded bg-white/5" />
              </div>
            )),
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-card-lg border border-lime/25 bg-lime/[0.05] px-4 py-3"
      >
        <Gift className="h-5 w-5 shrink-0 text-lime" />
        <p className="text-sm text-cream/90">{START_SIMPLE.note}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
