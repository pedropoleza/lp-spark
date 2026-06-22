"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { SOCIO_GRUPO } from "@/content/talk/copy-boss-grupo";

export function SocioBridge() {
  return (
    <TalkSceneFrame label={SOCIO_GRUPO.eyebrow}>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.1]"
        style={{ fontSize: "clamp(1.9rem, 5vw, 3.3rem)" }}
      >
        E se você tivesse um <span className="gradient-text">sócio que nunca dorme?</span>
      </motion.h2>

      <ul className="mx-auto mt-8 max-w-xl space-y-3">
        {SOCIO_GRUPO.lines.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="flex gap-3 text-[16px] leading-snug text-cream/90"
          >
            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
            <span>{l}</span>
          </motion.li>
        ))}
      </ul>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + SOCIO_GRUPO.lines.length * 0.2 }}
        className="mx-auto mt-8 max-w-xl text-center text-lg font-semibold text-cream"
      >
        {SOCIO_GRUPO.punch.split("SparkBot")[0]}
        <span className="gradient-text">SparkBot</span>.
      </motion.p>
    </TalkSceneFrame>
  );
}
