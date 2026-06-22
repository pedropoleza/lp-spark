"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, LogIn, ArrowRight, ArrowLeft, PartyPopper, Mail } from "lucide-react";
import { isValidPlan, type PlanId } from "@/lib/plans";
import { ONBOARDING_CALENDARS, SUPPORT_WHATSAPP, APP_LOGIN_URL, WELCOME, planSummary } from "@/content/checkout";

export function WelcomeWizard() {
  const [plan, setPlan] = useState<PlanId>("growth");
  const [step, setStep] = useState(0);

  useEffect(() => {
    // se o GHL redirecionou DENTRO do iframe do checkout, escapa pra tela cheia
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
      return;
    }
    const sp = new URLSearchParams(window.location.search);
    const pl = sp.get("plan");
    if (pl && isValidPlan(pl)) setPlan(pl);
  }, []);

  const p = planSummary(plan);

  return (
    <div className="flex min-h-dvh flex-col bg-ink text-cream">
      <header className="flex items-center justify-center px-5 py-4">
        <span className="label-mono">Spark Leads · Boas-vindas</span>
      </header>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-10">
        {/* progresso */}
        <div className="mb-5 flex items-center justify-center gap-2 text-xs text-muted">
          <span className={step === 0 ? "font-semibold text-accent" : ""}>1 · Agendar</span>
          <span className="h-px w-6 bg-white/15" />
          <span className={step === 1 ? "font-semibold text-accent" : ""}>2 · Próximos passos</span>
        </div>

        {step === 0 ? (
          <motion.div key="s1" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col">
            <div className="text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-lime/15 text-lime">
                <PartyPopper className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.6rem, 5vw, 2.2rem)" }}>
                {WELCOME.title}
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Plano <span className="font-semibold text-cream">{p.name}</span>. {WELCOME.sub}
              </p>
            </div>

            {/* agenda de onboarding (inline) */}
            <div className="mt-5 flex-1 overflow-hidden rounded-card-lg border border-white/10 bg-white">
              <iframe
                src={ONBOARDING_CALENDARS[plan]}
                title="Agendar onboarding"
                className="h-[60vh] min-h-[420px] w-full"
                allow="payment"
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <button onClick={() => setStep(1)} className="btn-primary w-full justify-center py-3.5">
                Já agendei, continuar <ArrowRight className="h-4 w-4" />
              </button>
              <a href={APP_LOGIN_URL} target="_blank" rel="noreferrer" className="text-xs text-muted underline-offset-4 hover:text-cream hover:underline">
                {WELCOME.selfServeNote}
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div key="s2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-1 flex-col">
            <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.5rem, 4.6vw, 2rem)" }}>
              O que vem agora
            </h2>

            <ul className="mt-6 space-y-3">
              {WELCOME.next.map((n, i) => (
                <motion.li
                  key={n.t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.12 }}
                  className="flex gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{n.t}</p>
                    <p className="text-sm text-muted">{n.d}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 flex items-start gap-3 rounded-card-lg border border-accent/25 bg-accent/[0.05] px-4 py-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm text-cream/90">{WELCOME.instructions}</p>
            </div>

            {/* atalhos */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-card-lg border border-white/10 bg-white/[0.02] py-3.5 text-sm font-semibold text-cream transition hover:border-accent/40">
                <MessageCircle className="h-4 w-4 text-accent" /> Falar no WhatsApp
              </a>
              <a href={APP_LOGIN_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-card-lg border border-white/10 bg-white/[0.02] py-3.5 text-sm font-semibold text-cream transition hover:border-accent/40">
                <LogIn className="h-4 w-4 text-accent" /> Acessar minha conta
              </a>
            </div>

            <button onClick={() => setStep(0)} className="mx-auto mt-6 flex items-center gap-1.5 text-xs text-muted hover:text-cream">
              <ArrowLeft className="h-3.5 w-3.5" /> Voltar para agendar
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
