"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { TOUCH_SCRIPTS, TOUCH_SCRIPTS_TIP } from "@/content/talk/copy";

export function Scripts() {
  return (
    <TalkSceneFrame wide label="O que dizer em cada toque">
      <h2
        className="text-center font-display font-bold leading-[1.12]"
        style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}
      >
        A cadência é o <span className="text-muted">quando</span>.{" "}
        <span className="gradient-text">Isto é o quê.</span>
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {TOUCH_SCRIPTS.map((s, i) => (
          <motion.div
            key={s.tag}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.2 }}
            className="flex flex-col rounded-card-lg border border-white/10 bg-white/[0.02] p-4"
          >
            <span className="label-mono mb-3 text-accent">{s.tag}</span>
            {/* bolha de chat */}
            <div className="relative rounded-2xl rounded-bl-sm bg-[#0f2e23] p-3.5 text-[13.5px] leading-snug text-cream/95 shadow-plan">
              {s.text}
              <span className="mt-1.5 block text-right text-[10px] text-lime/70">enviado ✓✓</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-6 flex max-w-2xl items-center gap-3 rounded-card-lg border border-accent/25 bg-accent/[0.05] px-4 py-3"
      >
        <Lightbulb className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-cream/90">{TOUCH_SCRIPTS_TIP}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
