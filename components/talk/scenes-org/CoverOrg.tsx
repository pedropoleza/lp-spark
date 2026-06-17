"use client";

import { motion } from "framer-motion";
import { Zap, X } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";

/* eslint-disable @next/next/no-img-element */

export function CoverOrg() {
  const { agency, setAgency, logoUrl, mode } = useTalk();

  return (
    <TalkSceneFrame hint="Setas ← → para navegar · F tela cheia · N suas notas">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-9 flex items-center justify-center gap-5"
      >
        <div className={`grid h-16 min-w-[8rem] place-items-center rounded-2xl border px-5 ${logoUrl ? "border-black/5 bg-white" : "border-white/10 bg-white/[0.03]"}`}>
          {logoUrl ? (
            <img src={logoUrl} alt={agency} className="max-h-12 w-auto object-contain" draggable={false} />
          ) : (
            <span className="font-display text-base font-bold text-cream/90">{agency}</span>
          )}
        </div>
        <X className="h-5 w-5 text-muted" />
        <div className="flex h-16 items-center gap-2 rounded-2xl border border-accent/30 bg-accent/[0.06] px-5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold text-cream">Spark Leads</span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="label-mono text-center"
      >
        Feito para o time da{" "}
        {mode === "solo" ? (
          agency
        ) : (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setAgency(e.currentTarget.textContent?.trim() || agency)}
            className="rounded px-1 text-accent outline-none ring-accent/40 focus:ring-2"
            title="Clique para editar o nome da agência"
          >
            {agency}
          </span>
        )}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-4 text-center font-display font-bold leading-[1.04]"
        style={{ fontSize: "clamp(2.2rem, 5.6vw, 4rem)" }}
      >
        De agente a <span className="gradient-text">empresa</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-muted"
      >
        Os próximos 20 minutos não são sobre software. São sobre parar de tocar o seu negócio
        <span className="text-cream"> de cabeça</span>, e começar a operar como gente grande.
      </motion.p>
    </TalkSceneFrame>
  );
}
