"use client";

import { motion } from "framer-motion";
import { Search, CalendarX, Snowflake } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { CHAOS_DAY, CHAOS_DAY_CLOSER } from "@/content/talk/copy-org";

const TONE = {
  busy: { ring: "border-electric/30", Icon: Search, ic: "text-electric" },
  slip: { ring: "border-amber-400/30", Icon: CalendarX, ic: "text-amber-300" },
  cold: { ring: "border-sky-400/30", Icon: Snowflake, ic: "text-sky-300" },
} as const;

export function ChaosDay() {
  return (
    <TalkSceneFrame wide label="Um dia tocando tudo de cabeça">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3rem)" }}>
        Você se <span className="gradient-text">reconhece</span> aqui?
      </h2>

      <div className="relative mx-auto mt-9 max-w-2xl">
        <div className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-white/10" />
        <ul className="space-y-3">
          {CHAOS_DAY.map((e, i) => {
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
        transition={{ delay: 0.3 + CHAOS_DAY.length * 0.45 }}
        className="mx-auto mt-8 max-w-xl text-center text-lg text-muted"
      >
        {CHAOS_DAY_CLOSER.split("Ele percebe")[0]}
        <span className="text-cream">Ele percebe{CHAOS_DAY_CLOSER.split("Ele percebe")[1]}</span>
      </motion.p>
    </TalkSceneFrame>
  );
}
