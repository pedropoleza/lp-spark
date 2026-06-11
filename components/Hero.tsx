"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Activity,
  Flame,
  MessageSquare,
  CalendarCheck,
  Send,
} from "lucide-react";
import { content } from "@/content/pt-br";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { Container } from "./ui/primitives";
import { Magnetic, CountUp } from "./ui/effects";
import { Logo } from "./ui/Logo";
import { BackgroundLoop } from "./ui/BackgroundLoop";
import { BotVideo } from "./ui/BotVideo";
import { loopAvailable } from "@/lib/loops";

const floatCards = [
  { label: "Lead respondeu agora", icon: Activity, pos: "left-[-10%] top-[6%]" },
  { label: "Agendamento confirmado", icon: CheckCircle2, pos: "right-[-12%] top-[34%]" },
  { label: "Lead Score: Hot", icon: Flame, pos: "left-[-8%] bottom-[10%]" },
];

const feedItems = [
  { icon: MessageSquare, label: "Respondeu um lead em 8s", time: "agora" },
  { icon: CalendarCheck, label: "Reunião agendada · amanhã 15h", time: "1m" },
  { icon: Send, label: "Follow-up enviado · 3 leads", time: "4m" },
];

export function Hero() {
  const { openQuiz } = useSpark();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const goPlans = () => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="top" ref={ref} className="relative overflow-hidden pt-20 sm:pt-28">
      {loopAvailable("hero-glow") && (
        <BackgroundLoop src="/loops/hero-glow" opacity={40} blend="screen" className="z-0" />
      )}

      <div className="halo left-[-10%] top-[-10%] h-[30rem] w-[30rem] bg-accent/30" />
      <div className="halo right-[-6%] top-[18%] h-[26rem] w-[26rem] bg-accent/20" />
      <motion.div
        style={{ y: yGrid }}
        className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />

      <Container className="relative z-10 grid items-center gap-10 pb-20 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
        <motion.div style={{ y: yText }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3.5"
          >
            <span className="relative inline-block h-6 w-6">
              {!reduce && (
                <span className="ring-pulse absolute inset-0 rounded-full border border-accent/60" />
              )}
              <Logo variant="mark" className="relative h-6 w-6" />
            </span>
            <span className="label-mono">{content.hero.label}</span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 font-display font-bold leading-[0.98] tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 7vw, 5.4rem)" }}
          >
            Sua operação de seguros,{" "}
            <span className="gradient-text">rodando no automático.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {content.hero.sub}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <button
                onClick={() => {
                  trackEvent("hero_cta_clicked", { cta: "quiz" });
                  openQuiz();
                }}
                className="btn-primary"
              >
                {content.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>
            <button
              onClick={() => {
                trackEvent("hero_cta_clicked", { cta: "plans" });
                goPlans();
              }}
              className="btn-secondary"
            >
              {content.hero.ctaSecondary}
            </button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {content.hero.stats.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* SparkBot protagonista + painel Spark OS */}
        <motion.div style={{ y: yPanel }} className="relative">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute left-1/2 top-[-1rem] h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[90px]" />

            {/* mascote no comando — palco próprio, sem bordas de vídeo */}
            <motion.div
              className="relative z-20 mx-auto h-60 w-60 sm:h-72 sm:w-72"
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.7, delay: 0.3 },
                scale: { duration: 0.7, delay: 0.3 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {/* anel orbital com satélite */}
              {!reduce && (
                <div className="absolute inset-[-6%] animate-[spin_26s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-dashed border-accent/25" />
                  <span className="absolute left-1/2 top-[-4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-glow" />
                </div>
              )}
              <div className="absolute inset-8 rounded-full bg-accent/25 blur-3xl" />
              {/* máscara radial: o clipe se funde ao fundo, sem retângulo */}
              <BotVideo
                src="/bot/bot-smile"
                blend
                className="relative [mask-image:radial-gradient(closest-side,black_55%,transparent_76%)]"
              />
            </motion.div>

            {/* painel: SparkBot ao vivo — feed prático do que a IA faz por você */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="card-spark relative z-10 -mt-10 overflow-hidden p-5 shadow-plan"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Logo variant="mark" className="h-5 w-5" /> SparkBot
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" /> ao vivo
                </span>
              </div>

              {/* feed de ações reais da IA */}
              <div className="space-y-2">
                {feedItems.map((f, i) => (
                  <motion.div
                    key={f.label}
                    initial={reduce ? false : { opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                      <f.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-cream/90">{f.label}</span>
                    <span className="shrink-0 font-mono text-[10px] text-muted">{f.time}</span>
                  </motion.div>
                ))}
              </div>

              {/* KPIs do dia */}
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3 text-center">
                {[
                  { n: 9, l: "respostas" },
                  { n: 4, l: "agendadas" },
                  { n: 12, l: "em follow-up" },
                ].map((k) => (
                  <div key={k.l}>
                    <div className="font-display text-lg font-bold text-accent">
                      <CountUp value={k.n} />
                    </div>
                    <div className="text-[10px] text-muted">{k.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* cards de resultado flutuando */}
            {floatCards.map((c, i) => (
              <motion.div
                key={c.label}
                className={`absolute ${c.pos} z-30 hidden sm:block`}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.7 + i * 0.15 },
                  scale: { duration: 0.5, delay: 0.7 + i * 0.15 },
                  y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs shadow-soft">
                  <c.icon className="h-3.5 w-3.5 text-accent" />
                  <span className="whitespace-nowrap text-cream/90">{c.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
