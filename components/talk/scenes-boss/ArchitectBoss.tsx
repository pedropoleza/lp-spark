"use client";

import { motion } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "./BossMark";
import { ARCHITECT_BOSS } from "@/content/talk/copy-boss";

export function ArchitectBoss() {
  return (
    <TalkSceneFrame label={ARCHITECT_BOSS.eyebrow}>
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.12]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
      >
        {ARCHITECT_BOSS.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-5 max-w-2xl text-center text-xl text-muted"
      >
        Vai <span className="gradient-text">desenhar a estrutura</span> que os seus agentes rodam.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mx-auto mt-8 max-w-xl text-center text-lg text-cream"
      >
        Você entende o sistema uma vez, e vira a <span className="font-semibold">arquiteta</span> da operação da{" "}
        <BossMark className="text-cream" />.
      </motion.p>
    </TalkSceneFrame>
  );
}
