/** Mock das telas adicionais do CRM (Fase 2). Dados realistas de um agente BR. */

export type ChatMsg = { from: "lead" | "me"; text: string; time: string };
export type Conversation = {
  id: string;
  name: string;
  avatar?: string;
  channel: "whatsapp" | "sms" | "email";
  preview: string;
  time: string;
  unread?: number;
  messages: ChatMsg[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1", name: "Ana Souza", avatar: "ana", channel: "whatsapp", preview: "Perfeito, quinta às 14h então!", time: "09:12", unread: 2,
    messages: [
      { from: "me", text: "Oi Ana! Consegui um horário pra te explicar as opções de seguro de vida. Quinta 14h funciona?", time: "09:05" },
      { from: "lead", text: "Oi! Funciona sim 🙌", time: "09:10" },
      { from: "lead", text: "Perfeito, quinta às 14h então!", time: "09:12" },
    ],
  },
  {
    id: "c2", name: "João Bittencourt", avatar: "joao", channel: "whatsapp", preview: "Pode mandar a proposta por aqui mesmo", time: "Ontem",
    messages: [
      { from: "lead", text: "Gostei da apresentação. Pode mandar a proposta por aqui mesmo", time: "Ontem" },
      { from: "me", text: "Claro! Já te mando o resumo do FlexLife com os valores 👇", time: "Ontem" },
    ],
  },
  {
    id: "c3", name: "Carla Mendes", avatar: "carla", channel: "sms", preview: "Vi seu contato pelo evento, queria saber mais", time: "Ter",
    messages: [{ from: "lead", text: "Oi, vi seu contato pelo evento, queria saber mais sobre o plano pra família", time: "Ter" }],
  },
  {
    id: "c4", name: "Pedro Lima", avatar: "pedro", channel: "whatsapp", preview: "Desculpa a demora! Bora marcar sim", time: "08:31",
    messages: [
      { from: "me", text: "Pedro, lembra que a gente tinha falado de revisar sua cobertura? Tenho um horário essa semana.", time: "08:20" },
      { from: "lead", text: "Desculpa a demora! Bora marcar sim", time: "08:31" },
    ],
  },
];

export type Contact = {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  email: string;
  business: string;
  created: string;
  lastActivity: string;
  tags: string[];
  leadScore: number;
  source: string;
  objection: string;
  status: string;
  timeline: { kind: "msg" | "call" | "meeting" | "note"; text: string; time: string }[];
};

export const CONTACTS: Contact[] = [
  {
    id: "ct1", name: "Ana Souza", avatar: "ana", phone: "+1 (407) 555-0142", email: "ana.souza@email.com", business: "Souza Cleaning LLC",
    created: "12 jun", lastActivity: "hoje", tags: ["Lead Quente", "WhatsApp"], leadScore: 82, source: "Indicação: Família Oliveira",
    objection: "Quer entender custo x cobertura", status: "Apresentação agendada",
    timeline: [
      { kind: "msg", text: "Confirmou Discovery Call (quinta 14h)", time: "hoje 09:12" },
      { kind: "note", text: "Indicada pela Família Oliveira, já é cliente", time: "ontem" },
      { kind: "msg", text: "Primeiro contato via WhatsApp", time: "12 jun" },
    ],
  },
  {
    id: "ct2", name: "Pedro Lima", avatar: "pedro", phone: "+1 (407) 555-0199", email: "pedro.lima@email.com", business: "Lima Auto Repair",
    created: "02 jun", lastActivity: "hoje", tags: ["Follow-up"], leadScore: 64, source: "Tráfego pago: Facebook",
    objection: "Achou que ia esquecer / sumiu", status: "Reativado pelo SparkBot",
    timeline: [
      { kind: "msg", text: "Respondeu o follow-up automático", time: "hoje 08:31" },
      { kind: "note", text: "Estava parado há 5 dias. SparkBot reativou", time: "hoje 08:20" },
      { kind: "call", text: "Ligação não atendida", time: "06 jun" },
    ],
  },
  {
    id: "ct3", name: "Família Oliveira", phone: "+1 (321) 555-0117", email: "oliveira@email.com", business: "Pessoa física",
    created: "20 mai", lastActivity: "hoje", tags: ["Cliente"], leadScore: 95, source: "Cliente ativo",
    objection: "Nenhuma", status: "Revisão anual hoje 16h",
    timeline: [
      { kind: "meeting", text: "Revisão anual agendada", time: "hoje 16:00" },
      { kind: "note", text: "Apólice ativa · indicou a Ana Souza", time: "10 jun" },
    ],
  },
];

export const WORKFLOW_FOLDERS: { folder: string; items: { name: string; status: "active" | "draft"; enrolled: number; active: number }[] }[] = [
  { folder: "Captação", items: [
    { name: "Boas-vindas · novo lead", status: "active", enrolled: 128, active: 14 },
    { name: "Resposta rápida WhatsApp", status: "active", enrolled: 96, active: 9 },
  ]},
  { folder: "Follow-up & Reativação", items: [
    { name: "Follow-up · 5 toques", status: "active", enrolled: 212, active: 31 },
    { name: "Reativar lead parado", status: "active", enrolled: 74, active: 5 },
  ]},
  { folder: "Pós-Venda", items: [
    { name: "Aniversário de apólice", status: "active", enrolled: 340, active: 22 },
    { name: "Revisão anual", status: "active", enrolled: 156, active: 8 },
  ]},
  { folder: "Recrutamento", items: [{ name: "Onboarding de recruta", status: "draft", enrolled: 0, active: 0 }] },
];

/** Builder visual do workflow "Reativar lead parado". */
export const BUILDER = {
  trigger: "Lead parado há 5 dias no Follow-up",
  nodes: [
    { kind: "action", label: "Enviar WhatsApp personalizado" },
    { kind: "delay", label: "Esperar 1 dia" },
    { kind: "branch", label: "Se não respondeu" },
    { kind: "action", label: "Enviar lembrete + horário sugerido" },
    { kind: "move", label: "Mover pra Apresentação se responder" },
  ] as { kind: "action" | "delay" | "branch" | "move"; label: string }[],
};
