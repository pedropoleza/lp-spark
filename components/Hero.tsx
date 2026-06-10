"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Activity, CheckCircle2, Flame, GitBranch } from "lucide-react";
import { content } from "@/content/pt-br";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { Container } from "./ui/primitives";

const cardIcons = [Activity, CheckCircle2, Sparkles, Flame, GitBranch];

export function Hero() {
  const { openQuiz } = useSpark();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPanel = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);

  const goPlans = () =>
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div id="top" ref={ref} className="relative overflow-hidden pt-16 sm:pt-24">
      {/* halos de fundo */}
      <div className="halo left-[-10%] top-[-10%] h-[28rem] w-[28rem] bg-spark/30" />
      <div className="halo right-[-5%] top-[20%] h-[26rem] w-[26rem] bg-electric/25" />
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />

      <Container className="relative z-10 grid items-center gap-12 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <motion.div style={{ y: yText }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="label-mono inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-spark" />
              {content.hero.label}
            </span>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 font-display font-bold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)" }}
          >
            Escolha o plano certo para{" "}
            <span className="gradient-text">transformar leads em clientes.</span>
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
            <button
              onClick={() => {
                trackEvent("hero_cta_clicked", { cta: "compare" });
                document.getElementById("comparar")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary"
            >
              {content.hero.ctaSecondary}
            </button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {content.hero.stats.map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted">
                <CheckCircle2 className="h-4 w-4 text-lime" />
                {s}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Painel 3D / Spark Growth OS */}
        <motion.div style={{ y: yPanel }} className="relative" onClick={goPlans}>
          <div className="relative mx-auto max-w-md [perspective:1200px]">
            <motion.div
              initial={reduce ? false : { opacity: 0, rotateY: 14, rotateX: 8 }}
              animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="card-spark relative overflow-hidden p-5 shadow-plan"
              style={{ transform: "rotateX(6deg) rotateY(-8deg)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="label-mono">SPARK GROWTH OS</span>
                <span className="flex gap-1">
                  <i className="h-2 w-2 rounded-full bg-spark/60" />
                  <i className="h-2 w-2 rounded-full bg-electric/60" />
                  <i className="h-2 w-2 rounded-full bg-lime/60" />
                </span>
              </div>

              {/* mini-pipeline */}
              <div className="grid grid-cols-3 gap-2">
                {["Conhecer", "Convidar", "Encontrar"].map((stage, i) => (
                  <div key={stage} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="label-mono mb-2 !text-[9px]">{stage}</div>
                    <div className="space-y-1.5">
                      {Array.from({ length: 3 - i > 0 ? 3 - i : 1 }).map((_, j) => (
                        <div key={j} className="h-6 rounded-md bg-white/[0.05]" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* score bar */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted">Lead Engagement Score</span>
                  <span className="font-semibold text-spark">Hot</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-electric via-spark to-lime"
                  />
                </div>
              </div>
            </motion.div>

            {/* cards flutuantes */}
            {content.hero.floatingCards.slice(0, 4).map((label, i) => {
              const Icon = cardIcons[i % cardIcons.length];
              const positions = [
                "left-[-12%] top-[8%]",
                "right-[-14%] top-[30%]",
                "left-[-8%] bottom-[18%]",
                "right-[-10%] bottom-[6%]",
              ];
              return (
                <motion.div
                  key={label}
                  className={`absolute ${positions[i]} hidden sm:block`}
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
                    scale: { duration: 0.5, delay: 0.6 + i * 0.15 },
                    y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-xs shadow-soft">
                    <Icon className="h-3.5 w-3.5 text-spark" />
                    <span className="whitespace-nowrap text-cream/90">{label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
