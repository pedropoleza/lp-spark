"use client";

import { useRef, useState } from "react";
import { Check, Sparkles, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PLAN_CONTENT, type PlanContent } from "@/content/pt-br";
import { QUIZ_REASONS } from "@/lib/quiz";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { Container, Section, SectionHeading, AnimatedBadge } from "./ui/primitives";
import { cn } from "@/lib/utils";

const accentRing: Record<PlanContent["accent"], string> = {
  spark: "hover:border-spark/50 hover:shadow-glow",
  electric: "hover:border-electric/50 hover:shadow-glow-blue",
  glow: "hover:border-glow/50",
};
const accentBtn: Record<PlanContent["accent"], string> = {
  spark: "bg-spark text-ink hover:brightness-110 hover:shadow-glow",
  electric: "bg-electric text-white hover:brightness-110 hover:shadow-glow-blue",
  glow: "bg-glow text-white hover:brightness-110",
};

function PlanCard({ plan }: { plan: PlanContent }) {
  const { openCheckout, quizResult } = useSpark();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const recommended = quizResult?.plan === plan.id;
  const featured = plan.badge === "Mais recomendado";

  function onMove(e: React.MouseEvent) {
    if (reduce || window.innerWidth < 768) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 6, ry: px * 6 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className={cn(
        "group relative flex flex-col rounded-card-lg border bg-card/70 p-6 backdrop-blur-sm transition-all duration-300 will-change-transform",
        accentRing[plan.accent],
        featured ? "border-spark/40 lg:-mt-4 lg:mb-[-1rem] lg:scale-[1.03]" : "border-white/10",
        recommended && "ring-2 ring-lime ring-offset-2 ring-offset-ink",
      )}
    >
      {(featured || recommended) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold shadow-soft",
              recommended ? "bg-lime text-ink" : "bg-spark text-ink",
            )}
          >
            {recommended ? <Star className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
            {recommended ? "Recomendado para você" : plan.badge}
          </span>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-display text-xl font-bold">Spark Leads {plan.name}</h3>
        <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
      </div>

      <div className="mb-4 flex items-end gap-1">
        <span className="font-display text-4xl font-bold">US$ {plan.price}</span>
        <span className="mb-1 text-sm text-muted">/mês</span>
      </div>

      <div className="mb-5 flex flex-wrap gap-1.5">
        {plan.badges.map((b) => (
          <AnimatedBadge key={b} tone={plan.accent}>
            {b}
          </AnimatedBadge>
        ))}
      </div>

      <p className="mb-5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs italic text-muted">
        “{plan.pain}”
      </p>

      <ul className="mb-6 flex flex-1 flex-col gap-2.5">
        {plan.features.map((f, i) => {
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
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.03 * i }}
                  className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-lime/15"
                >
                  <Check className="h-3 w-3 text-lime" />
                </motion.span>
              )}
              <span className={isHeader ? "pt-1" : ""}>{f}</span>
            </li>
          );
        })}
      </ul>

      <button
        onClick={() => {
          trackEvent("plan_selected", { plan: plan.id });
          openCheckout(plan.id);
        }}
        className={cn(
          "mt-auto inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          accentBtn[plan.accent],
        )}
      >
        {plan.cta}
      </button>
    </motion.div>
  );
}

export function Plans() {
  const { quizResult } = useSpark();
  return (
    <Section id="planos" className="relative">
      <div className="halo left-1/2 top-0 h-[24rem] w-[40rem] -translate-x-1/2 bg-electric/15" />
      <Container className="relative z-10">
        <SectionHeading
          align="center"
          label="PLANOS SPARK LEADS"
          title={
            <>
              Três planos para cada momento da{" "}
              <span className="gradient-text">sua operação.</span>
            </>
          }
          description="Starter para começar, Growth para crescer e recrutar, Agency para rodar sua equipe como uma agência."
          className="mb-6"
        />

        {quizResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-12 max-w-2xl rounded-card border border-lime/30 bg-lime/[0.06] p-4 text-center text-sm text-cream"
          >
            <span className="font-semibold text-lime">Sua recomendação: </span>
            {QUIZ_REASONS[quizResult.plan]}
          </motion.div>
        )}

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
          {PLAN_CONTENT.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          🔒 Checkout seguro via Stripe • Cancele quando quiser • Sem fidelidade
        </p>
      </Container>
    </Section>
  );
}
