/**
 * Dados mock da Spark Live Demo — fonte ÚNICA que alimenta todas as telas.
 * Quando o SparkBot age, ele muta este estado (no DemoProvider) e as telas
 * reagem na frente do prospect. Dados realistas de um agente BR de seguros.
 */
import type { PlanId } from "@/lib/plans";

export type Tone = "lime" | "electric" | "spark" | "amber" | "glow";

export type Stage = { id: string; label: string; tone: Tone };

export const STAGES: Stage[] = [
  { id: "novo", label: "Novo Lead", tone: "lime" },
  { id: "contato", label: "Em contato", tone: "electric" },
  { id: "followup", label: "Follow-up", tone: "spark" },
  { id: "apresentacao", label: "Apresentação", tone: "amber" },
  { id: "cliente", label: "Cliente", tone: "glow" },
];

export type Opp = {
  id: string;
  name: string;
  /** prêmio anual estimado (US$) */
  value: number;
  stageId: string;
  tag: string;
  ageDays: number;
  /** chave do avatar gerado (public/demo/avatars/<key>.png) — cai em monograma se faltar */
  avatar?: string;
};

export const INITIAL_OPPS: Opp[] = [
  { id: "o1", name: "Ana Souza", value: 3600, stageId: "contato", tag: "Lead Quente", ageDays: 1, avatar: "ana" },
  { id: "o2", name: "João Bittencourt", value: 5400, stageId: "apresentacao", tag: "Indicação", ageDays: 2, avatar: "joao" },
  { id: "o3", name: "Pedro Lima", value: 2880, stageId: "followup", tag: "Follow-up", ageDays: 5, avatar: "pedro" },
  { id: "o4", name: "Carla Mendes", value: 4200, stageId: "novo", tag: "Lead Quente", ageDays: 0, avatar: "carla" },
  { id: "o5", name: "Marcos Tavares", value: 1980, stageId: "novo", tag: "Frio", ageDays: 0, avatar: "marcos" },
  { id: "o6", name: "Lúcia Ferraz", value: 3120, stageId: "contato", tag: "Indicação", ageDays: 3, avatar: "lucia" },
  { id: "o7", name: "Rafael Nunes", value: 6000, stageId: "apresentacao", tag: "Lead Quente", ageDays: 4 },
  { id: "o8", name: "Família Oliveira", value: 7200, stageId: "cliente", tag: "Cliente", ageDays: 12 },
  { id: "o9", name: "Beatriz Rocha", value: 2400, stageId: "cliente", tag: "Cliente", ageDays: 20 },
];

export type AgendaEvent = { id: string; title: string; when: string; kind: "discovery" | "followup" | "review" };

export const INITIAL_AGENDA: AgendaEvent[] = [
  { id: "a1", title: "João Bittencourt", when: "Hoje · 10:00", kind: "discovery" },
  { id: "a2", title: "Revisão anual da Família Oliveira", when: "Hoje · 16:00", kind: "review" },
];

export const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ————————————————————————————————————————————————————————————
 * Roteiros do SparkBot. Cada passo anima; passos `action` mutam o store
 * (a tela de fundo reage). Isto é o momento "wow": a IA opera o CRM.
 * ———————————————————————————————————————————————————————————— */
export type BotStep =
  | { role: "user"; kind: "text" | "audio" | "file"; text: string; meta?: string }
  | { role: "bot"; kind: "typing"; ms?: number }
  | { role: "bot"; kind: "text"; text: string }
  | { role: "bot"; kind: "action"; action: BotAction; text: string };

export type BotAction =
  | { type: "agenda.add"; event: AgendaEvent }
  | { type: "opp.move"; id: string; toStage: string }
  | { type: "opp.add"; opp: Opp };

export type BotScript = { id: string; chip: string; steps: BotStep[] };

export const BOT_SCRIPTS: BotScript[] = [
  {
    id: "agendar",
    chip: "Marca a Ana quinta 14h e manda lembrete",
    steps: [
      { role: "user", kind: "text", text: "marca a Ana Souza quinta às 14h e manda lembrete" },
      { role: "bot", kind: "typing", ms: 1100 },
      {
        role: "bot",
        kind: "action",
        action: { type: "agenda.add", event: { id: "ev-ana", title: "Discovery Call com Ana Souza", when: "Qui · 14:00", kind: "discovery" } },
        text: "✅ Agendado: Ana Souza, quinta 14h (Discovery Call). Mandei a confirmação e programei um lembrete 1h antes. Quer também na véspera?",
      },
      { role: "user", kind: "text", text: "👍" },
      { role: "bot", kind: "typing", ms: 700 },
      { role: "bot", kind: "text", text: "Feito. Tá tudo na sua agenda, é só aparecer." },
    ],
  },
  {
    id: "subscricao",
    chip: "🎤 Cliente diabético tipo 2, qual rate no FlexLife?",
    steps: [
      { role: "user", kind: "audio", text: "cliente diabético tipo 2 controlado, 52 anos, qual produto e tabela na National Life?", meta: "0:08" },
      { role: "bot", kind: "typing", ms: 1300 },
      {
        role: "bot",
        kind: "text",
        text: "Pra esse perfil, o FlexLife (IUL) costuma sair em Standard / Standard Plus dependendo da A1C. Quer que eu já abra a oportunidade e agende a apresentação?",
      },
      { role: "user", kind: "text", text: "sim, abre a oportunidade" },
      { role: "bot", kind: "typing", ms: 900 },
      {
        role: "bot",
        kind: "action",
        action: { type: "opp.add", opp: { id: "o-flex", name: "Sérgio Atalla", value: 4800, stageId: "contato", tag: "Lead Quente", ageDays: 0 } },
        text: "✅ Oportunidade criada (Sérgio Atalla · FlexLife IUL · ~US$ 4.800/ano) em “Em contato”. Te aviso quando ele responder.",
      },
    ],
  },
  {
    id: "briefing",
    chip: "Bom dia, o que tenho hoje?",
    steps: [
      { role: "user", kind: "text", text: "bom dia, o que eu tenho hoje?" },
      { role: "bot", kind: "typing", ms: 1200 },
      {
        role: "bot",
        kind: "text",
        text: "Bom dia, Marcos ☀️ Hoje: 10h João Bittencourt, 16h revisão da Família Oliveira. Uma coisa: o Pedro Lima tá parado há 5 dias na etapa de Follow-up. Quer que eu reative com uma mensagem?",
      },
      { role: "user", kind: "text", text: "pode reativar" },
      { role: "bot", kind: "typing", ms: 950 },
      {
        role: "bot",
        kind: "action",
        action: { type: "opp.move", id: "o3", toStage: "apresentacao" },
        text: "✅ Mandei a mensagem certa pro momento dele e o Pedro respondeu, movi pra Apresentação e bloqueei um horário sugerido. 😉",
      },
    ],
  },
];

/* Premissas da calculadora de ROI no fechamento (o fundador pode ajustar). */
export const ROI = {
  /** valor médio de comissão por cliente fechado (US$) — placeholder editável */
  commissionPerClient: 600,
  /** leads/mês que o agente típico deixa esfriar por follow-up tardio */
  lostLeadsPerMonth: 4,
  /** taxa de recuperação realista com follow-up automático */
  recoveryRate: 0.3,
};

export const PLAN_LADDER: { plan: PlanId; rung: string }[] = [
  { plan: "starter", rung: "Começando" },
  { plan: "growth", rung: "Estabelecido" },
  { plan: "agency", rung: "Líder de equipe" },
];
