"use client";

import { motion } from "framer-motion";
import { PlugZap, Compass, LifeBuoy, type LucideIcon } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { ONBOARDING_STEPS, ONBOARDING_SUPPORT } from "@/content/demo/pitch";

const ICONS: LucideIcon[] = [PlugZap, Compass, LifeBuoy];

/** Implementação e onboarding: reversão de risco antes do fechamento. */
export function Onboarding() {
  const { activePlan } = useDemo();
  return (
    <SceneFrame label="Como você começa" hint="→ último passo">
      <h2 className="text-center font-display font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}>
        A gente te coloca pra <span className="gradient-text">rodar.</span>
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-muted">Tudo numa única reunião. Você não configura nada sozinho.</p>

      <div className="mt-9 grid gap-3 sm:grid-cols-3">
        {ONBOARDING_STEPS.map((s, i) => {
          const Icon = ICONS[i];
          const body = i === 2 ? ONBOARDING_SUPPORT[activePlan] : s.body;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 * i }}
              className="relative rounded-card-lg border border-white/10 bg-white/[0.02] p-5"
            >
              <span className="absolute right-4 top-3 font-display text-2xl font-bold text-white/10">{i + 1}</span>
              <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-accent/12 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-display text-base font-bold text-cream">{s.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-cream/80">{body}</p>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}
