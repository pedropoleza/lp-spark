"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { HOOK_GRUPO } from "@/content/talk/copy-boss-grupo";

export function HookGrupo() {
  return (
    <TalkSceneFrame label="A pergunta">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.1]"
        style={{ fontSize: "clamp(1.9rem, 5vw, 3.4rem)" }}
      >
        Quanto a sua semana <span className="gradient-text">deixou na mesa</span>, sem você ver?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-muted"
      >
        {HOOK_GRUPO.sub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="mx-auto mt-8 flex max-w-lg items-center gap-3 rounded-card-lg border border-accent/30 bg-accent/[0.06] p-4"
      >
        <MessageSquare className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-base text-cream">{HOOK_GRUPO.chat}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
