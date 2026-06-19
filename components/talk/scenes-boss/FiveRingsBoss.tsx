"use client";

import { motion } from "framer-motion";
import { DownloadCloud, Workflow, SlidersHorizontal, ArrowRight, type LucideIcon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { FIVERINGS_BOSS } from "@/content/talk/copy-boss";

const ICONS: LucideIcon[] = [DownloadCloud, Workflow, SlidersHorizontal];

export function FiveRingsBoss() {
  return (
    <TalkSceneFrame wide label={FIVERINGS_BOSS.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)" }}>
        Integração nativa com o <span className="gradient-text">portal da Five Rings</span>.
      </h2>

      <div className="mx-auto mt-9 flex max-w-4xl flex-col items-stretch gap-3 md:flex-row md:items-center">
        {FIVERINGS_BOSS.steps.map((s, i) => {
          const Icon = ICONS[i] ?? DownloadCloud;
          return (
            <div key={s.t} className="flex flex-1 items-center gap-3 md:flex-col md:gap-0">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.2 }}
                className="flex-1 rounded-card-lg border border-white/10 bg-white/[0.02] p-5 text-center md:w-full"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <p className="mt-3 font-display text-lg font-bold text-cream">{s.t}</p>
                <p className="mt-1.5 text-sm leading-snug text-muted">{s.d}</p>
              </motion.div>
              {i < FIVERINGS_BOSS.steps.length - 1 && (
                <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-muted md:rotate-0" />
              )}
            </div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-7 text-center text-muted"
      >
        Isso ninguém te dá. <span className="text-cream">E a gente personaliza pra forma como a BO$$ trabalha.</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
