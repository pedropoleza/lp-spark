"use client";

import { motion } from "framer-motion";
import { BadgePercent, Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { OFFER } from "@/content/talk/copy-org";

export function OfferOrg() {
  const { agency } = useTalk();

  return (
    <TalkSceneFrame label="Uma condição que é só de vocês">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-card-lg border border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent p-7 text-center"
      >
        <span className="mx-auto flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          <BadgePercent className="h-3.5 w-3.5" />
          {OFFER.badge} {agency}
        </span>

        <h2 className="mt-5 font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
          {OFFER.headline}
        </h2>

        {OFFER.price && (
          <p className="mt-4 flex items-baseline justify-center gap-2">
            <span className="text-lg text-muted line-through">{OFFER.price.from}</span>
            <span className="font-display text-3xl font-bold text-lime">{OFFER.price.to}</span>
          </p>
        )}

        <ul className="mx-auto mt-6 max-w-sm space-y-2.5 text-left">
          {OFFER.perks.map((p, i) => (
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

        <p className="mt-6 text-xs text-muted/80">{OFFER.fine}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
