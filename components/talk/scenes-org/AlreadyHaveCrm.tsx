"use client";

import { motion } from "framer-motion";
import { Brain, MessageCircle, NotebookPen, StickyNote, Moon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { ALREADY_CRM } from "@/content/talk/copy-org";

const ICONS = [Brain, MessageCircle, NotebookPen, StickyNote, Moon];

export function AlreadyHaveCrm() {
  return (
    <TalkSceneFrame label="A verdade incômoda">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 4.8vw, 3rem)" }}>
        Você já tem um CRM hoje. <span className="gradient-text">Só que ele vaza.</span>
      </h2>

      <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {ALREADY_CRM.items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-cream/90"
            >
              <Icon className="h-4 w-4 text-muted" /> {item}
            </motion.span>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + ALREADY_CRM.items.length * 0.15 }}
        className="mx-auto mt-8 max-w-xl text-center text-muted"
      >
        {ALREADY_CRM.punch.split("A pergunta")[0]}
        <span className="text-cream">A pergunta{ALREADY_CRM.punch.split("A pergunta")[1]}</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
