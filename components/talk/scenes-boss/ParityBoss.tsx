"use client";

import { motion } from "framer-motion";
import { GitBranch, MessageCircle, Users, Workflow, Calendar, Building2, Bot, Link2, type LucideIcon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { PARITY_BOSS } from "@/content/talk/copy-boss";

const ICONS: LucideIcon[] = [GitBranch, MessageCircle, Users, Workflow, Calendar, Building2, Bot, Link2];

export function ParityBoss() {
  return (
    <TalkSceneFrame wide label="Tudo num lugar só">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)" }}>
        Tudo que o Como te dá. <span className="gradient-text">E o que ele não dá.</span>
      </h2>

      <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
        {PARITY_BOSS.map((m, i) => {
          const Icon = ICONS[i] ?? GitBranch;
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className={`flex items-center gap-3 rounded-card-lg border px-4 py-3 ${
                m.plus ? "border-accent/30 bg-accent/[0.05]" : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${m.plus ? "bg-accent/15 text-accent" : "bg-white/5 text-muted"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="flex-1 text-[15px] text-cream">{m.name}</span>
              {m.plus && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">e mais</span>}
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-7 text-center text-muted"
      >
        Calendário e gestão de agência nativos, sem puxadinho. <span className="text-cream">É paridade, e mais um degrau.</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
