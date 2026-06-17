"use client";

import { motion } from "framer-motion";
import { StickyNote, NotebookPen, MessageCircle, Brain } from "lucide-react";
import { TalkSceneFrame } from "../bits";

const CHAOS = [
  { icon: StickyNote, label: "Post-it na tela" },
  { icon: NotebookPen, label: "Caderno da mesa" },
  { icon: MessageCircle, label: "WhatsApp lotado" },
  { icon: Brain, label: "“Tá na memória”" },
];

export function WhySystem() {
  return (
    <TalkSceneFrame label="Por que isso acontece">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}>
        Não é preguiça. <span className="gradient-text">É falta de sistema.</span>
      </h2>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
        {CHAOS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 14, rotate: i % 2 ? 2 : -2 }}
              animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="flex flex-col items-center gap-2 rounded-card-lg border border-white/10 bg-white/[0.03] p-5 text-center"
            >
              <Icon className="h-6 w-6 text-muted" />
              <span className="text-xs text-cream/80">{c.label}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-9 max-w-lg text-center text-lg text-muted"
      >
        Você não esquece o lead porque não liga. Esquece porque a sua cabeça não é um CRM,{" "}
        <span className="text-cream">e ninguém devia pedir isso dela.</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
