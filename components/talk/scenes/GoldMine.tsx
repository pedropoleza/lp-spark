"use client";

import { motion } from "framer-motion";
import { Flame, Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { GOLD_MINE } from "@/content/talk/copy";

export function GoldMine() {
  return (
    <TalkSceneFrame wide label={GOLD_MINE.eyebrow}>
      <div className="grid items-center gap-9 md:grid-cols-2">
        {/* mensagem / argumento */}
        <div>
          <h2 className="font-display font-bold leading-[1.14]" style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)" }}>
            Seus leads “mortos” são o{" "}
            <span className="gradient-text">dinheiro mais barato</span> do mercado.
          </h2>

          <ul className="mt-5 space-y-2.5">
            {GOLD_MINE.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="flex gap-2.5 text-[15px] leading-snug text-muted"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-5 border-l-2 border-lime pl-4 font-semibold text-cream"
          >
            {GOLD_MINE.punch}
          </motion.p>
        </div>

        {/* lead frio reacendendo + script */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 rounded-card-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <motion.span
              animate={{ filter: ["grayscale(1)", "grayscale(0)"], scale: [1, 1.08, 1] }}
              transition={{ delay: 1, duration: 1.4 }}
              className="grid h-11 w-11 place-items-center rounded-full bg-amber-400/20 text-amber-300"
            >
              <Flame className="h-5 w-5" />
            </motion.span>
            <div>
              <p className="text-sm font-semibold text-cream">Lead de 6 meses atrás</p>
              <p className="text-xs text-muted">de “frio” para “quente” com uma mensagem</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 rounded-card-lg border border-white/10 bg-white/[0.02] p-4"
          >
            <span className="label-mono mb-3 block text-accent">{GOLD_MINE.script.tag}</span>
            <div className="rounded-2xl rounded-bl-sm bg-[#0f2e23] p-3.5 text-[13.5px] leading-snug text-cream/95 shadow-plan">
              {GOLD_MINE.script.text}
              <span className="mt-1.5 block text-right text-[10px] text-lime/70">enviado ✓✓</span>
            </div>
          </motion.div>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
