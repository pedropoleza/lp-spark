"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  MessageSquare,
  Workflow,
  Bot,
  BarChart3,
  CalendarDays,
  GitBranch,
  GraduationCap,
  RefreshCw,
  Flame,
} from "lucide-react";
import { Container, Section, SectionHeading, Reveal, AnimatedBadge } from "../ui/primitives";
import { BotVideo } from "../ui/BotVideo";
import { cn } from "@/lib/utils";

/** Seção 10 — vista explodida do produto. */
export function ExplodedView() {
  const parts = [
    { icon: Database, title: "CRM", text: "Pipeline pronto para acompanhar oportunidades." },
    { icon: MessageSquare, title: "Templates", text: "Mensagens bilíngues para follow-up, retenção e equipe." },
    { icon: Workflow, title: "Workflows", text: "Automações que mantêm o lead em movimento." },
    { icon: Bot, title: "SparkBot", text: "IA para acelerar conversas e respostas." },
    { icon: BarChart3, title: "Dashboards", text: "Visão clara de captação, retenção e recrutamento." },
    { icon: CalendarDays, title: "Calendários", text: "Agendamento, mentoria, recrutamento e Field Training." },
  ];
  return (
    <Section id="produto">
      <Container>
        <SectionHeading
          align="center"
          label="SPARK OS"
          title="O que existe dentro da Spark Leads"
          className="mb-14"
        />
        <div className="relative">
          {/* núcleo central */}
          <div className="mb-10 flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative grid h-28 w-28 place-items-center rounded-full border border-spark/30 bg-gradient-to-br from-spark/15 to-electric/10"
            >
              <div className="halo inset-0 bg-spark/20" />
              <span className="relative font-display text-sm font-bold">Spark OS</span>
            </motion.div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {parts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="card-spark group flex gap-4 p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-spark transition group-hover:bg-spark/10">
                  <p.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Seção 18 — mapa da jornada do lead. */
export function LeadJourney() {
  const stages = [
    "Novo Lead",
    "Primeiro Contato",
    "Convite",
    "Reunião",
    "Follow-up",
    "Fechamento",
    "Retenção",
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="JORNADA DO LEAD"
          title="Cada lead precisa de um próximo passo."
          className="mb-12"
        />
        <div className="scrollbar-spark flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="min-w-[180px] flex-1 rounded-card border border-white/10 bg-card/60 p-4"
            >
              <div className="label-mono mb-2">Etapa {i + 1}</div>
              <h3 className="font-display font-bold">{stage}</h3>
              <p className="mt-2 text-xs text-muted">
                Automação: lembrete + mensagem sugerida no momento certo.
              </p>
              <div className="mt-3">
                <AnimatedBadge tone="electric">Pipeline ativo</AnimatedBadge>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 26 — templates bilíngues. */
export function Templates() {
  const msgs = [
    { tag: "Primeiro contato", text: "Oi Ana! Vi seu interesse em proteção familiar. Posso te mostrar 2 opções rápidas?" },
    { tag: "Follow-up (EN)", text: "Hi Ana, just checking in to see if you had a chance to review the options we discussed." },
    { tag: "Confirmação de reunião", text: "Confirmado! Nos falamos amanhã às 15h. Te envio o link 10 min antes. 🗓️" },
    { tag: "Reativação", text: "Faz um tempinho! Surgiu uma condição nova que pode te interessar. Quer ver?" },
    { tag: "Retenção", text: "Chegou a hora da sua revisão anual. Vamos garantir que sua cobertura ainda faz sentido?" },
    { tag: "Recrutamento", text: "Você tem perfil pra crescer com a gente. Topa uma conversa de 15 min sobre carreira?" },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="TEMPLATES PT/EN"
          title="Mensagens prontas para acelerar conversas em português e inglês."
          className="mb-12"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {msgs.map((m, i) => (
            <Reveal key={m.tag} delay={i * 0.05} className="card-spark p-4">
              <AnimatedBadge tone="spark" className="mb-3">
                {m.tag}
              </AnimatedBadge>
              <div className="rounded-2xl rounded-tl-sm bg-white/[0.05] p-3 text-sm text-cream/90">
                {m.text}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 27 — SparkBot (com o mascote em vídeo). */
export function SparkBotSection() {
  return (
    <Section id="sparkbot">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            label="SPARKBOT"
            title="SparkBot: IA para acelerar respostas, follow-ups e rotina comercial."
            description="Use o SparkBot para ganhar velocidade em conversas, estruturar mensagens e manter sua operação mais responsiva. Ele é um assistente operacional — não substitui você no fechamento."
          />
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { p: "Starter", v: "200 mensagens/mês" },
              { p: "Growth", v: "500 mensagens/mês" },
              { p: "Agency", v: "1500 mensagens/mês" },
            ].map((x) => (
              <div key={x.p} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
                <span className="font-semibold">{x.p}</span>
                <span className="ml-2 text-muted">{x.v}</span>
              </div>
            ))}
          </div>

          {/* mascote em corpo inteiro, emoldurado (clipe com fundo claro de estúdio) */}
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04]">
              <BotVideo src="/bot/bot-full" fit="cover" />
            </div>
            <p className="max-w-xs text-sm text-muted">
              Conheça o <span className="font-semibold text-cream">SparkBot</span> — seu copiloto
              comercial sempre de plantão.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="halo inset-x-10 top-0 h-48 bg-accent/25" />

          {/* avatar vivo (clipe com fundo preto → blend screen remove o fundo) */}
          <div className="relative z-10 mx-auto mb-[-2.5rem] h-40 w-40">
            <div className="absolute inset-3 rounded-full bg-accent/30 blur-2xl" />
            <BotVideo src="/bot/bot-smile" blend className="relative" />
          </div>

          <div className="card-spark relative z-0 p-5 pt-12">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="font-semibold">SparkBot</span>
              <span className="flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[11px] text-accent">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" /> online
              </span>
            </div>
            <div className="space-y-3">
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-accent/15 p-3 text-sm text-cream">
                Me ajuda a responder um lead que pediu desconto?
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.05] p-3 text-sm text-cream/90">
                Claro! Sugiro reforçar valor antes de preço: “Entendo! Antes de falar de valores, posso
                te mostrar o que está incluso? Assim você compara melhor.”
              </div>
              <div className="flex items-center gap-1.5 px-2">
                <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
                <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
                <span className="typing-dot h-2 w-2 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 28 — Lead Engagement Score. */
export function LeadScore() {
  const levels = [
    { label: "Cold", pct: 25, tone: "bg-electric" },
    { label: "Warm", pct: 50, tone: "bg-glow" },
    { label: "Hot", pct: 80, tone: "bg-spark" },
    { label: "Ready", pct: 95, tone: "bg-lime" },
  ];
  return (
    <Section>
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            label="LEAD ENGAGEMENT SCORE"
            title="Saiba quais leads estão mais quentes."
            description="O Lead Engagement Score ajuda a priorizar contatos com base em sinais de engajamento, para você não tratar todos os leads como se estivessem no mesmo momento."
          />
          <p className="mt-4 text-sm text-muted">
            <Flame className="mr-1 inline h-4 w-4 text-spark" /> Disponível no Growth e Agency.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="card-spark p-6">
          {levels.map((l, i) => (
            <div key={l.label} className="mb-4 last:mb-0">
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-muted">{l.label}</span>
                <span className="font-semibold">{l.pct}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${l.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1 }}
                  className={cn("h-full rounded-full", l.tone)}
                />
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 29 — retenção e revisão anual. */
export function Retention() {
  const flow = ["Cliente ativo", "Revisão anual", "Follow-up", "Upsell", "Retenção"];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="RETENÇÃO"
          title="Venda não termina no fechamento."
          description="Com revisão anual e follow-up automatizado, a Spark ajuda você a manter relacionamento ativo com sua carteira."
          className="mb-12"
        />
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {flow.map((f, i) => (
            <div key={f} className="flex items-center gap-2">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm">{f}</div>
              {i < flow.length - 1 && <RefreshCw className="h-3.5 w-3.5 text-muted" />}
            </div>
          ))}
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {["Follow-up de 12 meses", "Templates de retenção", "Workflows de upgrade", "Dashboard de KPIs"].map(
            (x) => (
              <div key={x} className="card-spark p-4 text-center text-sm text-muted">
                {x}
              </div>
            ),
          )}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 30 — recrutamento. */
export function Recruitment() {
  const agencyStages = [
    { name: "Proposed Agent", who: "Carlos M." },
    { name: "Pré-Jaqueta", who: "Bruna L." },
    { name: "VPs", who: "Diego R." },
    { name: "Black Jacket", who: "Tânia F." },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="RECRUTAMENTO"
          title="Recrutamento também precisa de pipeline."
          description="Acompanhe candidatos e parceiros com etapas claras, mensagens prontas e automações para não perder pessoas no caminho."
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="card-spark p-6">
            <div className="mb-4 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-electric" />
              <h3 className="font-display font-bold">Growth · Funil básico</h3>
              <AnimatedBadge tone="electric" className="ml-auto">3 stages</AnimatedBadge>
            </div>
            <div className="space-y-2">
              {["Contato inicial", "Em estudo", "Onboarding"].map((s) => (
                <div key={s} className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3 text-sm">
                  <span>{s}</span>
                  <span className="h-2 w-2 rounded-full bg-electric/60" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="card-spark p-6">
            <div className="mb-4 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-glow" />
              <h3 className="font-display font-bold">Agency · Pipeline completo</h3>
              <AnimatedBadge tone="glow" className="ml-auto">4 stages</AnimatedBadge>
            </div>
            <div className="space-y-2">
              {agencyStages.map((s) => (
                <div key={s.name} className="flex items-center justify-between rounded-lg bg-white/[0.03] p-3 text-sm">
                  <span>{s.name}</span>
                  <span className="text-xs text-muted">{s.who}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/** Seção 31 — Field Training. */
export function FieldTraining() {
  const items = [
    { label: "Treinamento de campo — Equipe Norte", status: "Scheduled", tone: "electric" as const },
    { label: "Acompanhamento de visita — Bruna", status: "Completed", tone: "lime" as const },
    { label: "Revisão de prática — Diego", status: "Follow-up needed", tone: "spark" as const },
  ];
  return (
    <Section>
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            label="FIELD TRAINING"
            title="Field Training sem caos manual."
            description="No plano Agency, a estrutura de equipe pode incluir workflows de Field Training e organização de acompanhamento para líderes que precisam escalar com mais previsibilidade."
          />
          <p className="mt-4 text-sm text-muted">
            <GraduationCap className="mr-1 inline h-4 w-4 text-glow" /> Disponível no Spark Agency.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="card-spark p-5">
          {items.map((it) => (
            <div
              key={it.label}
              className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] p-4 last:mb-0"
            >
              <span className="text-sm">{it.label}</span>
              <AnimatedBadge tone={it.tone}>{it.status}</AnimatedBadge>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 32 — calendários. */
export function Calendars() {
  const cals = [
    { name: "Agendamento", color: "bg-spark" },
    { name: "Recrutamento", color: "bg-electric" },
    { name: "Mentoria / equipe", color: "bg-glow" },
    { name: "Field Training", color: "bg-lime" },
  ];
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="CALENDÁRIOS"
          title="Agendamento, mentoria, entrevistas e treinamento no lugar certo."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cals.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} className="card-spark p-5">
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted" />
                <span className="text-sm font-semibold">{c.name}</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2 rounded-md bg-white/[0.03] p-2">
                    <span className={cn("h-2 w-2 rounded-full", c.color)} />
                    <div className="h-2 flex-1 rounded bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Seção 33 — dashboards. */
export function Dashboards() {
  return (
    <Section id="dashboards">
      <Container>
        <SectionHeading
          align="center"
          label="DASHBOARDS"
          title="Decida com visão, não com achismo."
          className="mb-12"
        />
        <Reveal className="card-spark p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-display font-bold">Funil de captação</span>
            <AnimatedBadge>Dados demonstrativos</AnimatedBadge>
          </div>
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* gráfico de barras */}
            <div className="flex h-48 items-end gap-3 rounded-card border border-white/10 bg-white/[0.02] p-4">
              {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.06 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-electric/40 to-spark"
                />
              ))}
            </div>
            {/* cards de métrica */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {[
                { k: "Conversão", v: "32%" },
                { k: "Leads quentes", v: "48" },
                { k: "Reuniões", v: "21" },
              ].map((m) => (
                <div key={m.k} className="rounded-card border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-muted">{m.k}</div>
                  <div className="font-display text-2xl font-bold">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Seção 11 — galeria / lookbook de interface. */
export function Gallery() {
  const items = [
    { title: "Pipeline de vendas", icon: GitBranch },
    { title: "Dashboard de KPIs", icon: BarChart3 },
    { title: "Sequência de follow-up", icon: Workflow },
    { title: "Calendário de reunião", icon: CalendarDays },
    { title: "Recrutamento", icon: Database },
    { title: "SparkBot", icon: Bot },
  ];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          label="LOOKBOOK"
          title="A interface da Spark, por dentro."
          description="Mockups construídos para dar a sensação de produto real — não imagens genéricas."
          className="mb-12"
        />
      </Container>
      <div
        ref={scrollRef}
        className="scrollbar-spark flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08 }}
            className="relative min-w-[300px] max-w-[340px] snap-start overflow-hidden rounded-card-lg border border-white/10 bg-card/60 p-5 sm:min-w-[420px] sm:max-w-[460px]"
          >
            <div className="halo right-0 top-0 h-32 w-32 bg-spark/15" />
            <div className="relative mb-4 flex items-center gap-2">
              <item.icon className="h-4 w-4 text-spark" />
              <span className="text-sm font-semibold">{item.title}</span>
            </div>
            <div className="relative space-y-2">
              <div className="h-24 rounded-lg bg-gradient-to-br from-white/[0.06] to-transparent" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded-lg bg-white/[0.04]" />
                <div className="h-12 rounded-lg bg-white/[0.04]" />
                <div className="h-12 rounded-lg bg-white/[0.04]" />
              </div>
              <div className="h-3 w-2/3 rounded bg-white/[0.05]" />
              <div className="h-3 w-1/2 rounded bg-white/[0.05]" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
