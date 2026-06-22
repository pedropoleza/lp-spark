"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, BrainCircuit, type LucideIcon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { VALUE_GRUPO } from "@/content/talk/copy-boss-grupo";

const ICONS: LucideIcon[] = [TrendingUp, Clock, BrainCircuit];

export function ValuePillars() {
  return (
    <TalkSceneFrame wide label={VALUE_GRUPO.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
        Mais comissão. <span className="gradient-text">Menos correria.</span>
      </h2>

      <div className="mx-auto mt-9 grid max-w-4xl gap-4 md:grid-cols-3">
        {VALUE_GRUPO.pillars.map((p, i) => {
          const Icon = ICONS[i] ?? TrendingUp;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="rounded-card-lg border border-white/10 bg-white/[0.02] p-6"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-xl font-bold text-cream">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-7 text-center text-lg font-semibold text-cream"
      >
        {VALUE_GRUPO.punch}
      </motion.p>
    </TalkSceneFrame>
  );
}
