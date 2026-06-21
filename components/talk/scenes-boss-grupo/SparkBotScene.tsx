"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { SparkBotPanel } from "@/components/demo/app/SparkBotPanel";
import { SPARKBOT_GRUPO } from "@/content/talk/copy-boss-grupo";

export function SparkBotScene() {
  return (
    <TalkSceneFrame wide label={SPARKBOT_GRUPO.eyebrow}>
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* o bot, ao vivo */}
        <div className="mx-auto h-[60vh] min-h-[420px] w-full max-w-md">
          <SparkBotPanel />
        </div>

        {/* valor */}
        <div>
          <h2 className="font-display font-bold leading-[1.14]" style={{ fontSize: "clamp(1.6rem, 3.6vw, 2.5rem)" }}>
            O SparkBot trabalha o seu <span className="gradient-text">WhatsApp por você</span>.
          </h2>

          <ul className="mt-6 space-y-3">
            {SPARKBOT_GRUPO.points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.18 }}
                className="flex gap-3 text-[15px] leading-snug text-cream/90"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 border-l-2 border-accent pl-4 text-lg font-semibold text-cream"
          >
            {SPARKBOT_GRUPO.punch}
          </motion.p>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
