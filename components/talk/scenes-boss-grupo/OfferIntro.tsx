"use client";

import { motion } from "framer-motion";
import { Check, Tag } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "../scenes-boss/BossMark";
import { OFFER_INTRO_GRUPO } from "@/content/talk/copy-boss-grupo";

export function OfferIntro() {
  return (
    <TalkSceneFrame label="A condição do time">
      <div className="mx-auto max-w-xl text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent"
        >
          <Tag className="h-3.5 w-3.5" /> Exclusivo do time <BossMark className="text-accent" />
        </motion.span>

        <h2 className="mt-5 font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
          E pra vocês, <span className="gradient-text">só nesta chamada</span>, o Spark sai por menos.
        </h2>
      </div>

      {/* o que entra (stack de valor) */}
      <div className="mx-auto mt-7 max-w-md space-y-2.5">
        {OFFER_INTRO_GRUPO.stack.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.18 }}
            className="flex items-center gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] px-4 py-3"
          >
            <Check className="h-4 w-4 shrink-0 text-lime" />
            <span className="text-[15px] text-cream">{s}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-6 max-w-lg text-center text-muted"
      >
        {OFFER_INTRO_GRUPO.note}
      </motion.p>
    </TalkSceneFrame>
  );
}
