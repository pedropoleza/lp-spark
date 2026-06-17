"use client";

import { motion } from "framer-motion";
import { MessageCircle, PhoneMissed, Snowflake } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { AGENT_DAY, AGENT_DAY_CLOSER } from "@/content/talk/copy";

const TONE = {
  busy: { ring: "border-electric/30", dot: "bg-electric", Icon: MessageCircle, ic: "text-electric" },
  slip: { ring: "border-amber-400/30", dot: "bg-amber-300", Icon: PhoneMissed, ic: "text-amber-300" },
  cold: { ring: "border-sky-400/30", dot: "bg-sky-300", Icon: Snowflake, ic: "text-sky-300" },
} as const;

export function AgentDay() {
  return (
    <TalkSceneFrame wide label="Um dia na sua vida">
      <h2
        className="text-center font-display font-bold leading-[1.1]"
        style={{ fontSize: "clamp(1.8rem, 4.6vw, 3rem)" }}
      >
        Você se <span className="gradient-text">reconhece</span> aqui?
      </h2>

      <div className="relative mx-auto mt-9 max-w-2xl">
        {/* linha do tempo */}
        <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-white/10" />
        <ul className="space-y-3">
          {AGENT_DAY.map((e, i) => {
            const t = TONE[e.tone];
            return (
              <motion.li
                key={e.time}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.45 }}
                className="relative flex items-center gap-4"
              >
                <span className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-ink ${t.ring}`}>
                  <t.Icon className={`h-4 w-4 ${t.ic}`} />
                </span>
                <div className="flex flex-1 items-baseline gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] px-4 py-3">
                  <span className="font-mono text-xs tabular-nums text-muted">{e.time}</span>
                  <span className="text-[15px] leading-snug text-cream/90">{e.text}</span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + AGENT_DAY.length * 0.45 }}
        className="mx-auto mt-8 max-w-xl text-center text-lg text-muted"
      >
        {AGENT_DAY_CLOSER.split("É esforço")[0]}
        <span className="text-cream">É esforço{AGENT_DAY_CLOSER.split("É esforço")[1]}</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
