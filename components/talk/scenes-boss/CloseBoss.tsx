"use client";

import { motion } from "framer-motion";
import { Check, Rocket } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { CLOSE_BOSS } from "@/content/talk/copy-boss";

export function CloseBoss() {
  return (
    <TalkSceneFrame label={CLOSE_BOSS.eyebrow}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-card-lg border border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent p-8 text-center"
      >
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-ink">
          <Rocket className="h-6 w-6" />
        </span>

        <h2 className="mt-5 font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.6rem)" }}>
          {CLOSE_BOSS.title}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-lg text-muted">{CLOSE_BOSS.lead}</p>

        <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left">
          {CLOSE_BOSS.points.map((p, i) => (
            <motion.li
              key={p}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex gap-2.5 text-[15px] text-cream/90"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>

        <p className="mt-7 font-display text-xl font-bold text-cream">{CLOSE_BOSS.cta}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
