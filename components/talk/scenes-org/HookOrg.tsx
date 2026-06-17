"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { HOOK_ORG } from "@/content/talk/copy-org";

export function HookOrg() {
  return (
    <TalkSceneFrame label="A pergunta">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.1]"
        style={{ fontSize: "clamp(1.9rem, 5.2vw, 3.5rem)" }}
      >
        Você tem um negócio —{" "}
        <span className="gradient-text">ou um emprego que te liga às 22h?</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-10 flex max-w-lg items-center gap-3 rounded-card-lg border border-amber-400/25 bg-amber-400/[0.05] p-4"
      >
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-300" />
        <p className="text-base text-cream/90">{HOOK_ORG.sub}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
