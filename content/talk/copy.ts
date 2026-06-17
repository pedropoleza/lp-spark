/**
 * Palestra "O dinheiro está no 5º contato" — conteúdo único.
 *
 * Público: a EQUIPE de agentes de uma agência (não o dono — o dono já tem Spark).
 * Objetivo: gerar valor real pro agente individual sobre follow-up, e fechar
 * com um pitch leve do Spark. Tudo aqui é editável pelo apresentador.
 *
 * Estatísticas de vendas são DIRECIONAIS e estão marcadas [confirmar fonte].
 * Substitua pelos números que você puder citar com segurança antes de apresentar.
 */

export const TALK = {
  /** Personalização padrão quando não vem ?agencia= / ?logo= na URL. */
  agencyFallback: "sua agência",

  /** Estatística do follow-up (enquete + lacuna). [confirmar fonte] */
  stats: {
    giveUpAfterFirst: 44, // % que desiste após 1 só follow-up
    giveUpBeforeFifth: 92, // % que desiste antes do 5º
    salesAfterFifth: 80, // % das vendas que acontecem do 5º contato em diante
  },
} as const;

/* ————————————————————————————————————————————————————————————
 * Calculadora (cena central). Modelo simples, defensável e claramente
 * ilustrativo. O apresentador ajusta os defaults ao vivo.
 * ———————————————————————————————————————————————————————————— */
export const CALC = {
  /** Defaults dos sliders (por agente). */
  leadsPerMonth: 30,
  commission: 500, // US$ por venda fechada
  followOf10: 2, // de cada 10 leads, quantos você segue até o 5º contato hoje
  /** Conversão assumida quando o lead É seguido até o fim. [ilustrativo] */
  closeRate: 0.1,
  /** Recuperação realista ao adotar uma cadência consistente. [ilustrativo] */
  recoveryRate: 0.6,
  // limites dos sliders
  min: { leadsPerMonth: 5, commission: 100, followOf10: 0 },
  max: { leadsPerMonth: 100, commission: 2000, followOf10: 10 },
};

/** Dinheiro deixado na mesa por ano (leads que você não segue até o fim). */
export function lossPerYear(leadsPerMonth: number, commission: number, followOf10: number) {
  const abandonedPerMonth = leadsPerMonth * (1 - followOf10 / 10);
  const lostSalesPerMonth = abandonedPerMonth * CALC.closeRate;
  return Math.round(lostSalesPerMonth * commission * 12);
}

export const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* ————————————————————————————————————————————————————————————
 * A cadência de 5 toques (cena "o como"). Genérica e limpa — qualquer
 * agente segue. Editável.
 * ———————————————————————————————————————————————————————————— */
export const CADENCE: { day: string; channel: string; intent: string }[] = [
  { day: "Dia 0", channel: "WhatsApp", intent: "Agradece o contato e confirma o interesse." },
  { day: "Dia 1", channel: "Ligação", intent: "Primeira conversa real. Entende a necessidade." },
  { day: "Dia 3", channel: "WhatsApp / áudio", intent: "Resgate leve: tira uma dúvida comum." },
  { day: "Dia 7", channel: "Ligação", intent: "Traz uma simulação ou prova social." },
  { day: "Dia 14", channel: "WhatsApp", intent: "Última chamada do mês: cria urgência saudável." },
];

/* Antes × Depois (ilustrativo). 100 leads cada. */
export const BEFORE_AFTER = {
  total: 100,
  memory: { closed: 8, label: "Na memória", sub: "post-it, WhatsApp, cabeça" },
  cadence: { closed: 19, label: "Com cadência", sub: "5 toques, sempre" },
};

/* Três motivos (pitch leve) — todos a nível do agente individual. */
export const REASONS: { title: string; body: string }[] = [
  {
    title: "Nenhum lead esquecido",
    body: "A esteira de follow-up dispara sozinha. O sistema lembra por você, no toque certo.",
  },
  {
    title: "Tudo num lugar só",
    body: "WhatsApp, Instagram, ligação e agenda. Pare de procurar a conversa em cinco apps.",
  },
  {
    title: "Responda em segundos, feche mais",
    body: "Mensagens prontas e o SparkBot no WhatsApp. Você fala, ele faz — e a venda anda.",
  },
];
