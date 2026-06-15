"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Users, MessageCircle } from "lucide-react";
import { SceneFrame } from "../SceneFrame";

/** Cena "quem somos" — autoridade calorosa + frame consultivo. Números = placeholders do fundador. */
const stats = [
  { icon: Clock, value: "4 anos", label: "de operação real", todo: false },
  { icon: Users, value: "____", label: "agentes ativos", todo: true },
  { icon: MessageCircle, value: "PT-BR", label: "suporte humano", todo: false },
];

export function WhoWeAre() {
  return (
    <SceneFrame label="Quem somos" hint="← → para navegar">
      <h2 className="text-center font-display font-bold leading-[1.05]" style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}>
        Feito desde o dia 1 para o <span className="gradient-text">agente Five Rings / National Life.</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted">
        Não é ferramenta genérica adaptada. Cada funil, template e automação nasceu da realidade do
        agente de seguros brasileiro. Feito por quem vive a sua operação.
      </p>

      <div className="mt-9 grid grid-cols-3 gap-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="rounded-card-lg border border-white/10 bg-white/[0.02] p-5 text-center"
            >
              <Icon className="mx-auto mb-2 h-5 w-5 text-accent" />
              <p className={`font-display text-2xl font-bold ${s.todo ? "text-muted/60" : "text-cream"}`}>{s.value}</p>
              <p className="mt-0.5 text-xs text-muted">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-card-lg border border-accent/20 bg-accent/[0.05] p-5">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p className="text-[15px] leading-relaxed text-cream">
          “Não vim te vender mais um software. Vim te mostrar, em 5 minutos, onde você está deixando
          dinheiro na mesa — e como recuperar.”
        </p>
      </div>
    </SceneFrame>
  );
}
