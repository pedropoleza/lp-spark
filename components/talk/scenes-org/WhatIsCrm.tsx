"use client";

import { motion } from "framer-motion";
import { User, History, ArrowRightCircle } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { WHAT_IS_CRM } from "@/content/talk/copy-org";

const ICONS = [User, History, ArrowRightCircle];

export function WhatIsCrm() {
  return (
    <TalkSceneFrame wide label="Desmistificando">
      <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)" }}>
        CRM não é software caro. <span className="gradient-text">É uma ideia simples.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted">{WHAT_IS_CRM.lead}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {WHAT_IS_CRM.pillars.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={p.q}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.2 }}
              className="rounded-card-lg border border-white/10 bg-white/[0.02] p-5 text-center"
            >
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-3 font-display text-xl font-bold text-cream">{p.q}</p>
              <p className="mt-1.5 text-sm leading-snug text-muted">{p.body}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-7 max-w-xl text-center text-muted"
      >
        Se você responde essas três a qualquer momento, <span className="text-cream">você tem um CRM.</span> Simples
        assim.
      </motion.p>
    </TalkSceneFrame>
  );
}
