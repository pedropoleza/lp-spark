"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Layers,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Ban,
  Mail,
  Cog,
  Lock,
} from "lucide-react";
import { content, PLAN_CONTENT } from "@/content/pt-br";
import type { PlanId } from "@/lib/plans";
import { useSpark } from "../spark-context";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { Container, Section, SectionHeading, Reveal, Label } from "../ui/primitives";
import { BackgroundLoop } from "../ui/BackgroundLoop";
import { loopAvailable } from "@/lib/loops";
import { cn } from "@/lib/utils";

const problemIcons = [Clock, AlertTriangle, Layers];

/** Seção 16 — social proof inicial. */
export function SocialProof() {
  return (
    <Section className="!py-14">
      <Container>
        <Reveal className="text-center">
          <p className="mx-auto max-w-2xl text-lg font-medium text-cream/90">
            {content.socialProof.title}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {content.socialProof.items.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 4 — problema. */
export function Problem() {
  return (
    <Section
      theme="gray"
      ambient
      reaction={{
        clip: "/bot/bot-serious",
        caption: "Esse caos eu conheço bem. Bora transformar em sistema.",
        side: "right",
      }}
    >
      <Container>
        <SectionHeading
          align="center"
          label="O PROBLEMA"
          title={
            <>
              O problema não é falta de lead.{" "}
              <span className="gradient-text">É falta de sistema.</span>
            </>
          }
          description={content.problem.text}
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {content.problem.cards.map((card, i) => {
            const Icon = problemIcons[i];
            return (
              <Reveal key={card.title} delay={i * 0.1} className="card-spark p-6">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-spark/10 text-spark">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted">{card.text}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 5 — como funciona (timeline). */
export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <Container>
        <SectionHeading
          align="center"
          label="COMO FUNCIONA"
          title={content.howItWorks.title}
          className="mb-14"
        />
        <div className="relative grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
          {content.howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="relative text-center md:text-left">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-spark/40 bg-ink font-display text-lg font-bold text-spark md:mx-0">
                {i + 1}
              </div>
              <h3 className="font-display font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 17 — antes e depois. */
export function BeforeAfter() {
  const before = [
    "Leads espalhados",
    "Follow-up manual",
    "Recrutamento sem pipeline",
    "Reuniões desorganizadas",
    "Falta de visão do funil",
  ];
  const after = [
    "Pipeline claro",
    "Mensagens automáticas",
    "Recrutamento por etapas",
    "Calendários organizados",
    "Dashboard com KPIs",
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="ANTES E DEPOIS"
          title={
            <>
              Antes, sua operação dependia de memória.{" "}
              <span className="gradient-text">Agora, ela roda em sistema.</span>
            </>
          }
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-card-lg border border-white/10 bg-white/[0.015] p-6 opacity-80">
            <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-muted">
              <XCircle className="h-5 w-5" /> Sem Spark Leads
            </h3>
            <ul className="flex flex-col gap-3">
              {before.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted/50" />
                  <span className="blur-[0.3px]">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-card-lg border border-lime/20 bg-gradient-to-br from-lime/[0.05] to-electric/[0.04] p-6"
          >
            <div className="halo right-0 top-0 h-40 w-40 bg-lime/20" />
            <h3 className="relative mb-5 flex items-center gap-2 font-display text-lg font-bold">
              <CheckCircle2 className="h-5 w-5 text-lime" /> Com Spark Leads
            </h3>
            <ul className="relative flex flex-col gap-3">
              {after.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-cream"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-lime" />
                  {a}
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Seção 21 — escolha por momento de negócio. */
export function ChooseByMoment() {
  const router = useRouter();
  const cards: { title: string; plan: PlanId; focus: string }[] = [
    { title: "Estou começando", plan: "starter", focus: "Responder leads e criar rotina comercial." },
    { title: "Já tenho carteira", plan: "growth", focus: "Retenção, score e crescimento." },
    { title: "Tenho ou estou formando equipe", plan: "agency", focus: "Recrutamento, gestão e liderança." },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="ESCOLHA CONSULTIVA"
          title={
            <>
              Não escolha só pelo preço.{" "}
              <span className="gradient-text">Escolha pelo momento da sua operação.</span>
            </>
          }
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((c, i) => {
            const plan = PLAN_CONTENT.find((p) => p.id === c.plan)!;
            return (
              <Reveal key={c.title} delay={i * 0.1} className="card-spark flex flex-col p-6">
                <Label>{c.title}</Label>
                <h3 className="mt-3 font-display text-xl font-bold">
                  Melhor plano: {plan.name}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted">Foco: {c.focus}</p>
                <button
                  onClick={() => router.push(`/checkout/${c.plan}`)}
                  className="btn-secondary mt-5 w-full !py-2 text-xs"
                >
                  Ver plano recomendado <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 22 — benefícios por perfil (abas). */
export function ProfileTabs() {
  const tabs = [
    {
      name: "Agente solo",
      pain: "Você precisa responder rápido, organizar contatos e parar de esquecer follow-ups.",
      features: ["CRM com pipeline pronto", "18 templates bilíngues", "SparkBot 200 msg/mês"],
      plan: "starter" as PlanId,
    },
    {
      name: "Agente em crescimento",
      pain: "Sua carteira cresceu e agora retenção e recrutamento entram no jogo.",
      features: ["Lead Engagement Score", "Revisão anual + follow-up 12 meses", "Funil de recrutamento básico"],
      plan: "growth" as PlanId,
    },
    {
      name: "Líder de equipe",
      pain: "Você precisa saber quem está em qual etapa e acompanhar a evolução do time.",
      features: ["Pipeline de recrutamento 4 stages", "Agency Dashboard", "Field Training"],
      plan: "agency" as PlanId,
    },
    {
      name: "Sub-agência",
      pain: "Você roda uma operação inteira e precisa de controle e previsibilidade.",
      features: ["44 templates de equipe", "SparkBot 1500 msg/mês", "Onboarding personalizado"],
      plan: "agency" as PlanId,
    },
  ];
  const [active, setActive] = useState(0);
  const router = useRouter();
  const tab = tabs[active];
  const plan = PLAN_CONTENT.find((p) => p.id === tab.plan)!;

  return (
    <Section>
      <Container>
        <SectionHeading align="center" label="POR PERFIL" title="A Spark se adapta ao seu perfil." className="mb-10" />
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                active === i
                  ? "border-spark/50 bg-spark/10 text-spark"
                  : "border-white/10 bg-white/[0.03] text-muted hover:text-cream",
              )}
            >
              {t.name}
            </button>
          ))}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-spark mx-auto max-w-3xl p-6 sm:p-8"
        >
          <p className="text-lg text-cream/90">{tab.pain}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {tab.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime" /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-sm text-muted">
              Plano recomendado: <span className="font-semibold text-cream">{plan.name}</span>
            </span>
            <button onClick={() => router.push(`/checkout/${tab.plan}`)} className="btn-primary !py-2 text-xs">
              {plan.cta}
            </button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

/** Seção 23 — o que acontece após o pagamento. */
export function AfterPayment() {
  const steps = [
    { icon: CreditCard, text: "Pagamento confirmado pelo Stripe" },
    { icon: ArrowRight, text: "Dados enviados para provisionamento" },
    { icon: Cog, text: "Conta Spark Leads preparada" },
    { icon: Mail, text: "Credenciais e instruções enviadas por e-mail" },
    { icon: CheckCircle2, text: "Você acessa e começa a configurar sua operação" },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="TRANSPARÊNCIA"
          title="Depois do pagamento, você sabe exatamente o que acontece."
          description="O checkout é simples, seguro e hospedado pelo Stripe. Após a confirmação, acompanhe seu e-mail para receber as próximas instruções."
          className="mb-12"
        />
        <div className="mx-auto max-w-2xl">
          {steps.map((s, i) => (
            <Reveal key={s.text} delay={i * 0.08} className="flex items-center gap-4 py-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-spark">
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-sm text-cream/90">
                <span className="mr-2 font-mono text-xs text-muted">{i + 1}.</span>
                {s.text}
              </span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 24 — objeções. */
export function Objections() {
  const items = [
    { q: "“Ainda estou começando.”", a: "Por isso o Starter existe: para organizar sua base antes do volume crescer." },
    { q: "“Não sou bom com tecnologia.”", a: "A proposta é entregar uma estrutura pronta, com pipeline, templates e automações organizadas." },
    { q: "“Já uso planilha.”", a: "Planilha registra informação. A Spark move oportunidades com próximos passos e automações." },
    { q: "“Tenho medo de pagar e não usar.”", a: "Clareza, simplicidade e foco prático — sem fidelidade. Você cancela quando quiser." },
    { q: "“Minha equipe ainda é pequena.”", a: "O Growth pode ser o passo intermediário antes de migrar para Agency." },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading align="center" label="OBJEÇÕES" title="Talvez você esteja pensando..." className="mb-12" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.06} className="card-spark p-6">
              <p className="font-display font-semibold text-cream">{item.q}</p>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 25 — Planilha vs Spark Leads. */
export function SpreadsheetVsSpark() {
  const sheet = [
    "Atualização manual",
    "Sem automações",
    "Sem lembretes inteligentes",
    "Sem pipeline vivo",
    "Difícil acompanhar equipe",
  ];
  const spark = [
    "Pipeline operacional",
    "Follow-ups automáticos",
    "Templates prontos",
    "Dashboards claros",
    "Recrutamento organizado",
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="PLANILHA × SPARK"
          title={
            <>
              Planilha mostra dados.{" "}
              <span className="gradient-text">A Spark movimenta sua operação.</span>
            </>
          }
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card-lg border border-white/10 bg-white/[0.015] p-6">
            <h3 className="mb-5 font-display text-lg font-bold text-muted">Planilha</h3>
            <ul className="flex flex-col gap-3">
              {sheet.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm text-muted">
                  <Ban className="h-4 w-4 text-muted/50" /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-card-lg border border-spark/20 bg-gradient-to-br from-spark/[0.06] to-electric/[0.04] p-6">
            <div className="halo right-0 top-0 h-40 w-40 bg-spark/20" />
            <h3 className="relative mb-5 font-display text-lg font-bold">Spark Leads</h3>
            <ul className="relative flex flex-col gap-3">
              {spark.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-cream"
                >
                  <CheckCircle2 className="h-4 w-4 text-lime" /> {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Seção 12 — segurança e checkout. */
export function Security() {
  const cards = [
    { icon: ShieldCheck, label: "Stripe Checkout" },
    { icon: Ban, label: "Sem fidelidade" },
    { icon: CreditCard, label: "Cancele quando quiser" },
    { icon: Lock, label: "Dados enviados com segurança" },
    { icon: Cog, label: "Provisionamento automatizado" },
  ];
  return (
    <Section
      theme="light"
      ambient
      reaction={{
        clip: "/bot/bot-curious",
        caption: "Pagamento é no Stripe — seguro e hospedado. Pode confiar.",
        side: "left",
      }}
    >
      <Container>
        <SectionHeading
          align="center"
          label="SEGURANÇA"
          title="Pagamento seguro. Operação simples."
          description="A Spark Leads usa Stripe Checkout para processar pagamentos com segurança. Depois da confirmação, o provisionamento da conta é iniciado e as instruções chegam por e-mail."
          className="mb-12"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className="card-spark flex flex-col items-center gap-3 p-5 text-center">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-lime/10 text-lime">
                <c.icon className="h-5 w-5" />
              </div>
              <span className="text-sm text-cream/90">{c.label}</span>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 14 — CTA final. */
export function FinalCta() {
  const { openQuiz } = useSpark();
  return (
    <Section
      theme="light"
      ambient
      reaction={{
        clip: "/bot/bot-full",
        caption: "Tá tudo pronto. Bora colocar sua operação no ar?",
        side: "right",
      }}
    >
      <Container>
        <Reveal className="relative overflow-hidden rounded-card-lg border border-accent/20 bg-gradient-to-br from-accent/[0.12] via-cream to-accent/[0.06] p-10 text-center shadow-soft sm:p-16">
          {loopAvailable("cta-glow") && (
            <BackgroundLoop src="/loops/cta-glow" opacity={35} blend="screen" />
          )}
          <div className="halo left-1/4 top-0 h-64 w-64 bg-accent/25" />
          <div className="halo right-1/4 bottom-0 h-64 w-64 bg-accent/15" />
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
              {content.finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{content.finalCta.text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => {
                  trackEvent("hero_cta_clicked", { from: "final-cta" });
                  openQuiz();
                }}
                className="btn-primary"
              >
                {content.finalCta.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#planos" className="btn-secondary">
                {content.finalCta.ctaSecondary}
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
