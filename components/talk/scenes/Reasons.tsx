"use client";

import { motion } from "framer-motion";
import { BellRing, Layers, Zap } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { REASONS } from "@/content/talk/copy";

const ICONS = [BellRing, Layers, Zap];

export function Reasons() {
  return (
    <TalkSceneFrame wide label="Por que o Spark, pra você">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
        Três coisas que mudam <span className="gradient-text">o seu mês.</span>
      </h2>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
        {REASONS.map((r, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="rounded-card-lg border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-display text-lg font-bold text-cream">{r.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
            </motion.div>
          );
        })}
      </div>
    </TalkSceneFrame>
  );
}
