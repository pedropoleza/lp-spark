"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GitBranch, Bot, BarChart3, Play } from "lucide-react";
import { Container, Section } from "../ui/primitives";
import { Logo } from "../ui/Logo";

const FEATURES = [
  {
    icon: GitBranch,
    title: "Pipeline de vendas",
    desc: "Cada lead com um estágio e um próximo passo claro — nada esfria esquecido.",
  },
  {
    icon: Bot,
    title: "SparkBot integrado",
    desc: "A IA responde, faz follow-up e agenda reuniões direto dentro do CRM.",
  },
  {
    icon: BarChart3,
    title: "Dashboards de operação",
    desc: "Captação, retenção e recrutamento num painel — decisão com visão, não achismo.",
  },
];

export function CrmShowcase() {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <Section id="crm" spacing="loose">
      <Container>
        {/* título editorial com linhas em gradiente */}
        <div className="mb-4 flex items-center justify-center gap-4">
          <span className="h-px w-24 bg-gradient-to-l from-accent to-transparent sm:w-40" />
          <span className="font-mono text-xs uppercase tracking-[0.32em] text-accent">CRM</span>
          <span className="h-px w-24 bg-gradient-to-r from-accent to-transparent sm:w-40" />
        </div>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2
            className="font-display font-bold leading-[1.0] tracking-tight"
            style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}
          >
            Sua operação inteira <span className="gradient-text">numa tela só.</span>
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Veja o CRM da Spark por dentro — pipeline, SparkBot e dashboards trabalhando juntos.
          </p>
        </div>

        {/* janela do produto com o vídeo real do CRM */}
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 rounded-[3rem] bg-accent/10 blur-3xl" />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-plan"
          >
            {/* chrome da janela */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="flex gap-2">
                <i className="h-3 w-3 rounded-full bg-[#ED5656]" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
                <i className="h-3 w-3 rounded-full bg-white/20" />
              </span>
              <div className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> app.sparkleads.pro/crm
              </div>
            </div>

            {/* tela: vídeo do CRM (Loom) — carrega o player só ao clicar (leve no 3G) */}
            <div className="relative aspect-video w-full bg-ink">
              {loaded ? (
                <iframe
                  src="https://www.loom.com/embed/8958ea9c307c4360999d702d54682394?autoplay=1&hide_owner=true&hideEmbedTopBar=true&hide_share=true"
                  title="CRM Spark Leads"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  onClick={() => setLoaded(true)}
                  aria-label="Reproduzir vídeo do CRM"
                  className="group absolute inset-0 grid place-items-center bg-ink"
                >
                  <div className="absolute inset-0 blueprint-grid opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
                  <Logo variant="mark" className="absolute h-16 w-16 opacity-10" />
                  <span className="relative flex flex-col items-center gap-3">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-ink shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                    <span className="text-sm font-medium text-cream">Ver o CRM em ação</span>
                    <span className="text-xs text-muted">vídeo · ~1 min</span>
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          {/* destaques do que está na tela */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-card border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/15 text-accent">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold">{f.title}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
