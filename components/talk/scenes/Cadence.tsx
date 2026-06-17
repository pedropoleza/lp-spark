"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mic } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { CADENCE } from "@/content/talk/copy";

function channelIcon(channel: string) {
  if (channel.toLowerCase().includes("liga")) return Phone;
  if (channel.toLowerCase().includes("áudio")) return Mic;
  return MessageCircle;
}

export function Cadence() {
  return (
    <TalkSceneFrame label="A cadência que vende · anote">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)" }}>
        Cinco toques. <span className="gradient-text">Sempre os mesmos.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-muted">
        Você não precisa de talento extra. Precisa de constância. Essa é a esteira:
      </p>

      <div className="mx-auto mt-9 max-w-2xl">
        {CADENCE.map((step, i) => {
          const Icon = channelIcon(step.channel);
          return (
            <motion.div
              key={step.day}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-stretch gap-4"
            >
              {/* trilho */}
              <div className="flex flex-col items-center">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                {i < CADENCE.length - 1 && <span className="my-1 w-px flex-1 bg-white/10" />}
              </div>
              {/* conteúdo */}
              <div className="pb-5">
                <p className="flex items-center gap-2">
                  <span className="font-display text-base font-bold text-cream">{step.day}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-muted">{step.channel}</span>
                </p>
                <p className="mt-0.5 text-sm text-muted">{step.intent}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </TalkSceneFrame>
  );
}
