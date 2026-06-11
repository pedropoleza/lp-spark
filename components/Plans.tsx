"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, ArrowRight, HelpCircle, Sparkles } from "lucide-react";
import { PLAN_CONTENT, type PlanContent } from "@/content/pt-br";
import { QUIZ_REASONS } from "@/lib/quiz";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { Container, Section, SectionHeading, AnimatedBadge, Reveal } from "./ui/primitives";
import { CornerMarks } from "./ui/motion2d";
import { CountUp } from "./ui/effects";
import { DrawnCheck } from "./ui/vector";
import { BotVideo } from "./ui/BotVideo";
import { cn } from "@/lib/utils";

/**
 * Banner do SparkBot no topo da seção: ele "se apresenta" como membro do time
 * nos planos Growth/Agency. Card escuro (o blend do clipe funciona) dentro da
 * seção clara — usa tokens paper/accent para escapar dos overrides do theme-light.
 */
function BotTeamBanner() {
  const { openQuiz } = useSpark();
  return (
    <Reveal className="mx-auto mb-14 max-w-4xl">
      <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-card-lg bg-ink p-6 shadow-plan sm:flex-row sm:gap-7 sm:p-7">
        <div className="halo right-[-8%] top-[-50%] h-56 w-56 bg-accent/30" />
        <div className="halo left-[-10%] bottom-[-60%] h-48 w-48 bg-accent/15" />

        {/* mascote sem bordas (máscara radial) */}
        <div className="relative h-28 w-28 shrink-0 sm:h-36 sm:w-36">
          <div className="absolute inset-4 rounded-full bg-accent/30 blur-2xl" />
          <BotVideo
            src="/bot/bot-surprise"
            blend
            className="relative [mask-image:radial-gradient(closest-side,black_55%,transparent_78%)]"
          />
        </div>

        <div className="relative min-w-0 flex-1 text-center sm:text-left">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            SparkBot
          </span>
          <p className="mt-2 text-lg font-semibold leading-snug text-paper sm:text-xl">
            “No <span className="text-accent">Growth</span> e no{" "}
            <span className="text-accent">Agency</span>, eu entro pro seu time: respondo leads,
            faço follow-up e agendo reuniões por você.”
          </p>
          <p className="mt-2 text-sm text-paper/60">
            Não sabe qual é o seu? Responde 3 perguntas que eu te indico.
          </p>
        </div>

        <button
          onClick={() => {
            trackEvent("quiz_started", { from: "plans-bot-banner" });
            openQuiz();
          }}
          className="btn-primary relative shrink-0"
        >
          <Sparkles className="h-4 w-4" /> Fazer o teste
        </button>
      </div>
    </Reveal>
  );
}

function PlanCard({ plan, index }: { plan: PlanContent; index: number }) {
  const { openCheckout, openQuiz, quizResult } = useSpark();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Destaque SÓ depois do teste — nenhum plano nasce "recomendado".
  const recommended = quizResult?.plan === plan.id;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduce || window.innerWidth < 768) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 4, ry: px * 4 });
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      className="h-full transition-transform duration-300 hover:-translate-y-2"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        style={{ transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
        className={cn(
          "spotlight relative flex h-full flex-col rounded-card-lg glass-card p-6 transition-colors duration-300 will-change-transform hover:border-accent/45",
          recommended && "ring-2 ring-accent ring-offset-2 ring-offset-paper",
        )}
      >
        {/* hairline de acento que se desenha no topo */}
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 right-6 top-0 h-[3px] origin-left rounded-b bg-accent/70"
        />

        {recommended && (
          <>
            <CornerMarks className="absolute inset-3" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink shadow-soft">
                <Star className="h-3 w-3" /> Recomendado para você
              </span>
            </div>
          </>
        )}

        <div className="mb-4 pt-2">
          <h3 className="font-display text-xl font-bold">Spark Leads {plan.name}</h3>
          <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
        </div>

        <div className="mb-4 flex items-end gap-1">
          <span className="font-display text-4xl font-bold">
            US$ <CountUp value={plan.price} />
          </span>
          <span className="mb-1 text-sm text-muted">/mês</span>
        </div>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {plan.badges.map((b) => (
            <AnimatedBadge key={b} tone="spark">
              {b}
            </AnimatedBadge>
          ))}
        </div>

        <p className="mb-5 rounded-xl border border-cream/5 bg-cream/[0.02] p-3 text-xs italic text-muted">
          “{plan.pain}”
        </p>

        <ul className="mb-6 flex flex-1 flex-col gap-2.5">
          {plan.features.map((f) => {
            const isHeader = f.endsWith(":");
            return (
              <li
                key={f}
                className={cn(
                  "flex items-start gap-2 text-sm",
                  isHeader ? "font-semibold text-cream" : "text-muted",
                )}
              >
                {!isHeader && (
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <DrawnCheck className="h-3 w-3" />
                  </span>
                )}
                <span className={isHeader ? "pt-1" : ""}>{f}</span>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex flex-col gap-2.5">
          <button
            onClick={() => {
              trackEvent("plan_selected", { plan: plan.id });
              openCheckout(plan.id);
            }}
            className="btn-primary w-full"
          >
            Adquirir {plan.name} <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              trackEvent("quiz_started", { from: `plan-card-${plan.id}` });
              openQuiz();
            }}
            className="btn-ghost w-full"
          >
            <HelpCircle className="h-3.5 w-3.5" /> É o ideal pra mim?
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Plans() {
  const { quizResult } = useSpark();
  return (
    <Section id="planos" theme="light" ambient className="relative">
      <div className="halo left-1/2 top-0 h-[24rem] w-[40rem] -translate-x-1/2 bg-accent/10" />
      <Container className="relative z-10">
        <SectionHeading
          align="center"
          label="PLANOS SPARK LEADS"
          title={
            <>
              Três planos para cada momento da <span className="gradient-text">sua operação.</span>
            </>
          }
          description="Starter para começar, Growth para crescer e recrutar, Agency para rodar sua equipe como uma agência."
          className="mb-10"
        />

        <BotTeamBanner />

        {quizResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-12 max-w-2xl rounded-card border border-accent/30 bg-accent/[0.06] p-4 text-center text-sm text-cream"
          >
            <span className="font-semibold text-accent">Sua recomendação: </span>
            {QUIZ_REASONS[quizResult.plan]}
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLAN_CONTENT.map((p, i) => (
            <PlanCard key={p.id} plan={p} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#comparar"
            className="text-sm text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            Comparar todos os recursos →
          </a>
          <p className="mt-4 text-xs text-muted">
            🔒 Checkout seguro via Stripe • Cancele quando quiser • Sem fidelidade
          </p>
        </div>
      </Container>
    </Section>
  );
}
