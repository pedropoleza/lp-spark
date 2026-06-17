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
  agencyFallback: "Dream Team",

  /**
   * Estatística do follow-up (enquete + lacuna).
   * ATENÇÃO: 44% / 80% / 92% são FOLCLORE de vendas (Brevet Group, sem
   * metodologia). Use como "o ditado das vendas diz", não como dado duro.
   * NÃO cite a versão "National Sales Executive Association, 5º-12º contato":
   * essa associação não existe — é estatística DESMENTIDA.
   * Âncora defensável de credibilidade: a regra dos 5 minutos (ver speedToLead).
   */
  stats: {
    giveUpAfterFirst: 44, // % que desiste após 1 só follow-up [folclore]
    giveUpBeforeFifth: 92, // % que desiste antes do 5º [folclore]
    salesAfterFifth: 80, // % das vendas do 5º contato em diante [folclore]
  },

  /**
   * Velocidade de resposta — a estatística CREDÍVEL da palestra.
   * Fonte: MIT Lead Response Management Study (Prof. James Oldroyd) /
   * Harvard Business Review, "The Short Life of Online Sales Leads" (2011).
   * Responder em ~5 min vs ~30 min → ~21x mais chance de QUALIFICAR o lead
   * (e ~100x mais chance de fazer contato). Pode citar de cabeça erguida.
   */
  speedToLead: {
    minutes: 5,
    multiplier: 21,
    source: "MIT Lead Response Study / HBR, 2011",
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
    body: "Mensagens prontas e o SparkBot no WhatsApp. Você fala, ele faz, e a venda anda.",
  },
];

/* ————————————————————————————————————————————————————————————
 * Apresentador (cena "Quem sou eu"). Personalizável por URL:
 * ?foto=URL para a foto. Nome/cargo editáveis aqui.
 * ———————————————————————————————————————————————————————————— */
export const PRESENTER = {
  name: "Pedro Poleza",
  role: "Fundador da Spark",
  /** Iniciais usadas quando não há foto (?foto=). */
  initials: "PP",
} as const;

/* História do fundador (arco origem → virada → propósito).
 * [Pedro: ajuste com a SUA história real — quanto mais verdadeiro e específico,
 * mais a sala se conecta. Os beats abaixo são um esqueleto editável.] */
export const FOUNDER = {
  eyebrow: "Antes de tudo, quem está falando com você",
  /** Frase de abertura que gera curiosidade (open loop). */
  lead: "Deixa eu te contar rápido de onde eu venho. E o que eu descobri vendo gente boa perder dinheiro bobo.",
  beats: [
    {
      strong: "Eu vivo dentro desse mundo de vendas e agências.",
      rest: "Convivi com agentes talentosos, carismáticos, que fechavam qualquer venda na conversa cara a cara.",
    },
    {
      strong: "E mesmo assim, todo santo mês, dinheiro escorria pelo ralo.",
      rest: "Não por falta de lead. Por um “depois eu ligo” que nunca virava ligação.",
    },
    {
      strong: "Foi aí que a ficha caiu.",
      rest: "O agente não precisa trabalhar mais. Precisa parar de esquecer o que já está na mão dele.",
    },
  ],
  /** Punch line: por que o Spark existe. */
  punch: "A Spark nasceu disso: pra nenhum agente perder de novo uma venda que já era dele.",
  /** Open loop para a próxima cena. */
  hook: "E eu vou te mostrar exatamente onde esse dinheiro some. Começa pelo seu dia.",
} as const;

/* "Um dia na sua vida" — cena de identificação (relatabilidade).
 * O agente tem que se ver aqui. tone: busy | slip | cold (cor do evento). */
export const AGENT_DAY: { time: string; text: string; tone: "busy" | "slip" | "cold" }[] = [
  { time: "08:12", text: "12 conversas no WhatsApp. Três pedindo retorno “ainda hoje”.", tone: "busy" },
  { time: "10:30", text: "Reunião. Um lead quente manda “ainda dá pra fechar?”. Você vê só depois.", tone: "slip" },
  { time: "14:00", text: "Lead novo da campanha. Você anota num post-it. O post-it some.", tone: "slip" },
  { time: "17:45", text: "Aquele “me liga semana que vem”? Já era. Faz duas semanas.", tone: "cold" },
  { time: "22:30", text: "Na cama, lembra de três pessoas que esqueceu de responder.", tone: "cold" },
];
export const AGENT_DAY_CLOSER =
  "Não é falta de esforço. É esforço demais, espalhado em lugar nenhum.";

/* O que dizer em cada toque (scripts prontos). A cadência é QUANDO; isto é O QUÊ.
 * A "mensagem de despedida" (break-up) é tática clássica e a que mais traz resposta. */
export const TOUCH_SCRIPTS: { tag: string; text: string }[] = [
  {
    tag: "Dia 0 · WhatsApp",
    text:
      "Oi [nome]! Aqui é o [você], da [agência]. Recebi seu contato sobre proteger a família. Bati aqui pra te explicar em 2 minutos, sem enrolação. Pode falar agora ou prefere mais tarde?",
  },
  {
    tag: "Dia 7 · Resgate",
    text:
      "[nome], lembrei de você. A maioria das famílias que atendo adia isso até acontecer algo, e aí fica caro. Te mando uma simulação rápida? Leva 1 minuto.",
  },
  {
    tag: "Dia 14 · Despedida",
    text:
      "[nome], não quero ser inconveniente, então esse é meu último toque por agora. Se fizer sentido lá na frente, é só me chamar. Deixo a porta aberta. 🤝",
  },
];
export const TOUCH_SCRIPTS_TIP =
  "A mensagem de despedida é a que mais traz resposta. As pessoas voltam quando você solta a corda.";

/* "A mina de ouro" — reativar leads frios (database reactivation).
 * O dinheiro mais barato do mercado: você já pagou por esses leads. */
export const GOLD_MINE = {
  eyebrow: "A mina de ouro que você já tem",
  title: "Seus leads “mortos” são o dinheiro mais barato do mercado.",
  points: [
    "Você já pagou por eles. Já falaram com você. Já demonstraram interesse uma vez.",
    "Um “não” de 6 meses atrás quase nunca é “não pra sempre”. É um “agora não”.",
  ],
  script: {
    tag: "Mensagem de reativação",
    text:
      "Oi [nome], faz um tempo que a gente não conversa! Passando só pra saber: como está a proteção da sua família hoje? Mudou alguma coisa, tipo casa, filho ou trabalho? Tenho novidades que podem te interessar.",
  },
  punch: "Captar lead novo custa caro. Reativar a sua base custa quase zero. Comece pelo que já é seu.",
} as const;
