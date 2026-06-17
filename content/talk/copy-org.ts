/**
 * Segunda palestra — "De agente a empresa: organização & eficiência operacional".
 *
 * Público: a EQUIPE de agentes de uma agência (individual). Tese: pare de tocar
 * seu negócio como side hustle (na cabeça/caderno/WhatsApp solto) e opere como
 * empresa. A base disso é organizar o relacionamento — um CRM (não precisa ser
 * potente como o Spark; mas precisa existir). Quem não se organiza com
 * tecnologia fica para trás. Fecha com pitch do Spark + DESCONTO + QR p/ demo.
 *
 * Estatísticas marcadas [confirmar fonte] são direcionais — confirme antes.
 */

import { fmtUSD } from "./copy";

export const TALK_ORG = {
  agencyFallback: "sua agência",

  /**
   * Dados de credibilidade. Use SÓ os sólidos e citáveis abaixo.
   * NÃO use "91% das empresas usam CRM" nem o ROI "$8.71 por US$1" (Nucleus,
   * 2014): são marketing/sem metodologia clara. Ficam de fora de propósito.
   */
  facts: {
    // SÓLIDO: vendedor passa menos de 30% do tempo de fato vendendo (resto =
    // admin, busca de info, retrabalho). Fonte: Salesforce, State of Sales (2023).
    sellingTimePct: 28,
    sellingTimeSource: "Salesforce, State of Sales (2023)",
    // SÓLIDO: ~1 em cada 4 leads de internet nunca recebe resposta.
    // Fonte: Harvard Business Review, "The Short Life of Online Sales Leads" (2011).
    leadsNoResponsePct: 23,
    leadsNoResponseSource: "HBR, 2011",
  },
} as const;

/* ————————————————————————————————————————————————————————————
 * Calculadora do caos (cena central / auge): horas e dinheiro que a
 * desorganização custa por ano. O apresentador ajusta ao vivo.
 * ———————————————————————————————————————————————————————————— */
export const CALC_ORG = {
  hoursPerWeek: 6, // horas/semana perdidas procurando info, reorganizando, retrabalho
  hourlyValue: 50, // quanto vale a sua hora (US$)
  min: { hoursPerWeek: 1, hourlyValue: 20 },
  max: { hoursPerWeek: 25, hourlyValue: 300 },
};

export const hoursPerYear = (hoursPerWeek: number) => Math.round(hoursPerWeek * 52);
export const costPerYear = (hoursPerWeek: number, hourlyValue: number) =>
  Math.round(hoursPerWeek * 52 * hourlyValue);

export { fmtUSD };

/* Gancho — side hustle x empresa. */
export const HOOK_ORG = {
  question: "Você tem um negócio, ou um emprego que te liga às 22h?",
  sub: "Se o seu sistema é a sua memória, você não tem uma empresa. Você é o gargalo dela.",
};

/* Amador × Profissional (status / identidade). */
export const AMATEUR_PRO: { amateur: string; pro: string }[] = [
  { amateur: "Guarda tudo na cabeça e no WhatsApp", pro: "Tem uma base: cada cliente num lugar só" },
  { amateur: "“Depois eu organizo isso”", pro: "O processo roda sozinho, todo dia" },
  { amateur: "Corre atrás do que esqueceu", pro: "O sistema diz qual é o próximo passo" },
  { amateur: "Cresce e afunda no próprio caos", pro: "Cresce e a estrutura aguenta" },
];

/* Um dia desorganizado (relatabilidade — o que escorre). tone igual ao da outra palestra. */
export const CHAOS_DAY: { time: string; text: string; tone: "busy" | "slip" | "cold" }[] = [
  { time: "09:00", text: "Cliente liga e você não lembra qual apólice ele tem. Procura em 3 lugares.", tone: "busy" },
  { time: "11:20", text: "Uma renovação venceu ontem. Ninguém avisou, nem você.", tone: "slip" },
  { time: "15:00", text: "Promete retorno “até amanhã” pra 4 pessoas. Anota em 4 lugares diferentes.", tone: "busy" },
  { time: "18:30", text: "Indicação quente de um cliente antigo. Some no meio das conversas.", tone: "slip" },
  { time: "23:10", text: "Você é o único que sabe como o negócio funciona. E não dá pra desligar.", tone: "cold" },
];
export const CHAOS_DAY_CLOSER =
  "O cliente não percebe o seu esforço. Ele percebe a sua organização, ou a falta dela.";

/* Quem não se organiza fica para trás (aversão à perda / FOMO / prova social). */
export const FALLING_BEHIND = {
  title: "O mercado está se profissionalizando. Com ou sem você.",
  points: [
    "O concorrente mais organizado é quem o seu cliente liga de volta.",
    "Não é o mais barato nem o mais simpático que ganha. É o que aparece na hora certa.",
    "Toda tecnologia entra primeiro pelos cedo-adotantes e depois vira maioria. A pergunta é: você quer estar cedo, ou entre os últimos a mudar?",
  ],
};

/* O que é um CRM, de verdade (desmistificar — reciprocidade/ensino). */
export const WHAT_IS_CRM = {
  title: "CRM não é software caro. É uma ideia simples.",
  lead: "CRM quer dizer “gestão do relacionamento com o cliente”. No fundo, são três perguntas que você sempre consegue responder:",
  pillars: [
    { q: "Quem?", body: "Quem é cada pessoa: contato, situação, o que importa pra ela." },
    { q: "O que rolou?", body: "O histórico: o que vocês já conversaram e combinaram." },
    { q: "E agora?", body: "O próximo passo, e quando. Nada fica solto." },
  ],
};

/* Você já tem um CRM (provavelmente ruim). */
export const ALREADY_CRM = {
  title: "Você já tem um CRM hoje.",
  sub: "Só que ele vaza.",
  items: ["a sua cabeça", "o seu WhatsApp", "um caderno", "post-its na tela", "a sua memória às 23h"],
  punch: "Tudo isso é um CRM, só que esquece, não lembra você e não escala. A pergunta não é SE você organiza. É se organiza de um jeito que segura o seu crescimento.",
};

/* Comece simples (valor de graça — você não precisa do Spark pra começar). */
export const START_SIMPLE = {
  title: "Você não precisa do Spark pra começar. Precisa começar.",
  lead: "Uma planilha organizada já é infinitamente melhor que a memória. Comece com 5 colunas:",
  columns: ["Nome", "Contato", "Situação", "Último contato", "Próximo passo + data"],
  note: "Sério: faça isso hoje, mesmo que numa planilha. A organização é o hábito. A ferramenta é só o nível.",
};

/* Mas a planilha quebra (ponte honesta + prova social). */
export const SPREADSHEET_BREAKS = {
  title: "Mas a planilha não te lembra. Nem fala no WhatsApp.",
  limits: [
    "Ela não te avisa do follow-up na hora certa.",
    "Não conversa com o WhatsApp nem com o seu calendário.",
    "Quando a base cresce, vira outro caos, só que organizado.",
  ],
  bridge: "Aí a organização precisa virar sistema de verdade. E olha: a [agência] já confia no Spark pra isso. Agora é a sua vez.",
};

/* Três motivos (pitch leve) — foco em organização/eficiência. */
export const REASONS_ORG: { title: string; body: string }[] = [
  { title: "Sua base organizada e viva", body: "Cada cliente num lugar só, com histórico. Acabou o “procura em três apps”." },
  { title: "O sistema te diz o próximo passo", body: "Renovação, follow-up, retorno prometido. Nada escapa, sem depender da sua memória." },
  { title: "Você vira empresa, não gargalo", body: "O processo roda sozinho. Você cresce e a estrutura aguenta junto." },
];

/* A oferta (desconto). [Pedro: ajuste os termos REAIS antes de apresentar.]
 * Âncora de preço (price): preencha com valores VERDADEIROS para o desconto
 * parecer maior (de/por). Deixe null se não quiser mostrar preço na tela.
 * Regra de ouro (pesquisa): toda promessa de escassez/desconto tem que ser real. */
export const OFFER = {
  badge: "Condição exclusiva para o time da",
  headline: "Comece organizado, com uma condição que é só de vocês.",
  /** Ex.: { from: "US$149/mês", to: "US$79/mês" }. null = não mostra preço. */
  price: null as { from: string; to: string } | null,
  perks: [
    "Desconto especial do time da agência", // [definir: ex. 20% OFF nos 3 primeiros meses]
    "Setup feito junto com você, sem dor de cabeça",
    "Migramos a sua base atual pra dentro do Spark",
  ],
  fine: "Condição válida para quem agendar a demo durante esta apresentação.",
};

/* Fechamento — QR para AGENDAR A DEMO. */
export const CLOSE_ORG = {
  headline: "Pare de ser o gargalo do seu próprio negócio.",
  sub: "Agende 20 minutos comigo. Eu te mostro a sua base organizada, e você decide.",
  caption: "Aponte a câmera e escolha um horário.",
};
