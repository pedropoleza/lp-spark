"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Download, Headphones, Quote, type LucideIcon } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { Avatar } from "../app/Avatar";
import { SECURITY, TESTIMONIALS, SOCIAL_STATS } from "@/content/demo/pitch";

const ICON: Record<(typeof SECURITY)[number]["icon"], LucideIcon> = {
  lock: Lock,
  shield: ShieldCheck,
  download: Download,
  headset: Headphones,
};

/** Confiança & Segurança + prova social — derruba o medo antes do fechamento. */
export function Trust() {
  return (
    <SceneFrame wide label="Seus dados estão seguros" hint="→ último passo">
      <h2 className="text-center font-display font-bold leading-tight" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}>
        Sólido, seguro e <span className="gradient-text">sem aprisionamento.</span>
      </h2>

      <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
        {SECURITY.map((s, i) => {
          const Icon = ICON[s.icon];
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-start gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-[15px] font-semibold text-cream">{s.title}</p>
                <p className="text-[13px] leading-snug text-muted">{s.body}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* prova social */}
      <div className="mx-auto mt-8 max-w-4xl">
        <div className="mb-4 flex items-center justify-center gap-6">
          {SOCIAL_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className={`font-display text-2xl font-bold tabular-nums ${s.todo ? "text-muted/60" : "text-cream"}`}>{s.value}</p>
              <p className="text-[11px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-card-lg border border-white/10 bg-white/[0.02] p-4"
            >
              <Quote className="mb-2 h-4 w-4 text-accent/60" />
              <p className="text-[13px] leading-relaxed text-cream">“{t.quote}”</p>
              <div className="mt-3 flex items-center gap-2.5">
                <Avatar name={t.name} src={t.avatar} size={34} />
                <div>
                  <p className="text-[12px] font-semibold text-cream">{t.name}</p>
                  <p className="text-[10px] text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-muted/60">Depoimentos ilustrativos. O fundador substitui pelos reais. Claims de segurança a confirmar antes de publicar.</p>
      </div>
    </SceneFrame>
  );
}
