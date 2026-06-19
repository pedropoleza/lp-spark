"use client";

import { motion } from "framer-motion";
import { Lock, Download, Headphones, KeyRound, ShieldCheck, type LucideIcon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { SECURITY_BOSS } from "@/content/talk/copy-boss";

const ICONS: LucideIcon[] = [Lock, Download, Headphones, KeyRound];

export function SecurityBoss() {
  return (
    <TalkSceneFrame wide label={SECURITY_BOSS.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.8rem)" }}>
        Os seus dados <span className="gradient-text">são seus</span>. Ponto.
      </h2>

      <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {SECURITY_BOSS.items.map((it, i) => {
          const Icon = ICONS[i] ?? Lock;
          return (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="flex items-start gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] p-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cream">{it.t}</p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{it.d}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* independência (sutil) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-card-lg border border-white/10 bg-white/[0.015] px-4 py-3"
      >
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-muted" />
        <p className="text-sm leading-relaxed text-muted">{SECURITY_BOSS.independence}</p>
      </motion.div>
    </TalkSceneFrame>
  );
}
