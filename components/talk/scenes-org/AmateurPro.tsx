"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { AMATEUR_PRO } from "@/content/talk/copy-org";

export function AmateurPro() {
  return (
    <TalkSceneFrame wide label="Em qual coluna você está hoje?">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
        Amador <span className="text-muted">×</span> <span className="gradient-text">Profissional</span>
      </h2>

      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
        {/* amador */}
        <div className="rounded-card-lg border border-white/10 bg-white/[0.02] p-5">
          <p className="label-mono mb-4 text-muted">Side hustle</p>
          <ul className="space-y-3">
            {AMATEUR_PRO.map((r, i) => (
              <motion.li
                key={r.amateur}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex gap-2.5 text-[15px] leading-snug text-muted"
              >
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/70" />
                <span>{r.amateur}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* profissional */}
        <div className="rounded-card-lg border border-accent/25 bg-accent/[0.05] p-5">
          <p className="label-mono mb-4 text-accent">Empresa</p>
          <ul className="space-y-3">
            {AMATEUR_PRO.map((r, i) => (
              <motion.li
                key={r.pro}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex gap-2.5 text-[15px] leading-snug text-cream/90"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span>{r.pro}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-7 max-w-xl text-center text-muted"
      >
        Ninguém nasce na coluna da direita. <span className="text-cream">Profissional é quem você decide ser</span> — e
        a decisão começa na organização.
      </motion.p>
    </TalkSceneFrame>
  );
}
