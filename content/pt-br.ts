import type { PlanId } from "@/lib/plans";

/**
 * Conteúdo centralizado em pt-BR.
 * Para internacionalização futura, duplicar este arquivo como
 * `content/en-us.ts` mantendo a mesma estrutura.
 */

export const content = {
  announcement: {
    text: "Novo: planos Spark Leads agora com SparkBot, dashboards e automações prontas para agentes de seguros.",
    cta: "Descobrir meu plano →",
  },

  nav: {
    brand: "Spark Leads",
    links: [
      { label: "Planos", href: "#planos" },
      { label: "SparkBot", href: "#sparkbot" },
      { label: "Comparar", href: "#comparar" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaSecondary: "Descobrir meu plano",
    ctaPrimary: "Ver planos",
  },

  hero: {
    label: "SPARK LEADS PLANS",
    headline: "Escolha o plano certo para transformar leads em clientes.",
    sub: "CRM, automações, templates bilíngues, dashboards e SparkBot em uma operação pronta para agentes de seguros que querem vender mais, recrutar melhor e perder menos oportunidades.",
    ctaPrimary: "Descobrir meu plano ideal",
    ctaSecondary: "Comparar planos",
    floatingCards: [
      "Lead respondeu agora",
      "Follow-up automático enviado",
      "Agendamento confirmado",
      "Lead Score: Hot",
      "Pipeline: Conhecer → Convidar → Encontrar",
    ],
    stats: [
      "18+ templates no Starter",
      "Até 1500 mensagens SparkBot",
      "Pipelines prontos",
      "Checkout seguro via Stripe",
    ],
  },

  socialProof: {
    title:
      "Criado para agentes que precisam de velocidade, follow-up e previsibilidade.",
    items: [
      "CRM pronto para uso",
      "Templates bilíngues",
      "Automação de follow-up",
      "Dashboards de operação",
    ],
  },

  problem: {
    title: "O problema não é falta de lead. É falta de sistema.",
    text: "Quando o follow-up depende da memória, o lead esfria. Quando a equipe cresce sem pipeline, o recrutamento vira caos. A Spark Leads organiza sua operação para cada contato, conversa e oportunidade ter um próximo passo claro.",
    cards: [
      {
        title: "Leads esquecidos",
        text: "Você recebe contatos, mas perde timing no follow-up.",
      },
      {
        title: "Recrutamento sem visibilidade",
        text: "Você não sabe quem está estudando, quem avançou e quem precisa de acompanhamento.",
      },
      {
        title: "Operação manual demais",
        text: "Mensagens, agendamentos, lembretes e revisão anual ficam espalhados.",
      },
    ],
  },

  howItWorks: {
    title: "Do plano ao CRM pronto: um fluxo simples.",
    steps: [
      {
        title: "Escolha seu plano",
        text: "Starter, Growth ou Agency.",
      },
      {
        title: "Responda o quiz, se quiser",
        text: "A página recomenda o plano ideal com base no momento do agente.",
      },
      {
        title: "Preencha seus dados",
        text: "Nome, email, telefone e negócio.",
      },
      {
        title: "Pague com segurança no Stripe",
        text: "Após o pagamento, o provisionamento é iniciado. Fique de olho no e-mail para receber as instruções.",
      },
    ],
  },

  faq: [
    {
      q: "Posso cancelar quando quiser?",
      a: "Sim. Não há fidelidade — você cancela quando quiser, direto pela sua assinatura.",
    },
    {
      q: "O pagamento é seguro?",
      a: "Sim. O pagamento acontece no Stripe Checkout, ambiente hospedado e criptografado pela Stripe.",
    },
    {
      q: "Preciso configurar tudo sozinho?",
      a: "Não. A ideia é entregar uma estrutura pronta conforme o plano escolhido, com pipeline, templates e automações organizadas.",
    },
    {
      q: "Qual plano devo escolher?",
      a: "Use o quiz. Ele recomenda com base na sua carteira, tempo de carreira e momento de recrutamento.",
    },
    {
      q: "O Starter serve para quem está começando?",
      a: "Sim. Ele é feito para o agente solo que precisa organizar leads e follow-up e criar rotina comercial.",
    },
    {
      q: "O Growth é para quem está recrutando?",
      a: "Sim. Ele adiciona Lead Score, retenção, revisão anual e um funil básico de recrutamento.",
    },
    {
      q: "O Agency é para quem tem equipe?",
      a: "Sim. Ele é voltado para líderes com recrutados ativos e necessidade de gestão de equipe.",
    },
  ],

  finalCta: {
    title: "Pare de perder oportunidades por falta de sistema.",
    text: "Escolha o plano certo e coloque sua operação comercial em movimento com CRM, automações, IA e dashboards prontos para crescer.",
    ctaPrimary: "Descobrir meu plano ideal",
    ctaSecondary: "Ver planos",
  },

  thankYou: {
    title: "Pagamento confirmado. Estamos preparando sua Spark Leads.",
    text: "Recebemos sua assinatura e o processo de configuração foi iniciado. Fique de olho no seu e-mail: você receberá as instruções de acesso assim que tudo estiver pronto.",
    cards: [
      "1. Pagamento confirmado",
      "2. Conta em preparação",
      "3. Instruções enviadas por e-mail",
    ],
    backHome: "Voltar para a página inicial",
    spamNote:
      "Se não encontrar o e-mail, confira também spam, promoções ou lixo eletrônico.",
    whatsapp: "https://wa.me/15551234567",
  },
} as const;

/** Descrição detalhada dos planos (usada em cards, comparativo e SEO). */
export type PlanContent = {
  id: PlanId;
  name: string;
  price: number;
  tagline: string;
  audience: string;
  badge?: string;
  features: string[];
  pain: string;
  cta: string;
  badges: string[];
  accent: "spark" | "electric" | "glow";
};

export const PLAN_CONTENT: PlanContent[] = [
  {
    id: "starter",
    name: "Starter",
    price: 79,
    tagline: "Tudo que você precisa pra fechar mais clientes.",
    audience:
      "Agente solo no início de carreira, construindo carteira e precisando responder melhor os leads.",
    accent: "electric",
    features: [
      "CRM completo com pipeline de vendas pré-configurado",
      "18 templates bilíngues PT/EN prontos",
      "9 workflows automáticos",
      "Calendário com link de agendamento",
      "SparkBot com 200 mensagens/mês",
      "Dashboard com funil de captação",
      "Suporte por WhatsApp",
    ],
    pain: "Tenho leads chegando, mas não dou conta de fazer follow-up. Perco cliente porque demoro pra responder.",
    cta: "Começar com Starter",
    badges: ["Para começar", "CRM + Follow-up", "200 mensagens IA"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 119,
    badge: "Mais recomendado",
    tagline: "Cresça sua produção e comece a recrutar.",
    audience:
      "Agente estabelecido, com carteira ativa e começando a recrutar parceiros.",
    accent: "spark",
    features: [
      "Tudo do Starter, mais:",
      "Lead Engagement Score com regras automáticas",
      "Revisão anual + follow-up de 12 meses",
      "5 templates extras de retenção e upsell",
      "Workflows de upgrade de produto",
      "Funil de recrutamento básico",
      "SparkBot com 500 mensagens/mês",
      "Dashboard com KPIs de retenção e recrutamento",
      "Suporte prioritário",
    ],
    pain: "Meu negócio cresceu, agora tenho que cuidar de retenção, recrutar parceiros e ainda atender clientes novos.",
    cta: "Crescer com Growth",
    badges: ["Mais recomendado", "Lead Score", "Retenção + recrutamento", "500 mensagens IA"],
  },
  {
    id: "agency",
    name: "Agency",
    price: 249,
    tagline: "Gerencie sua equipe inteira como uma agência.",
    audience:
      "Líder de equipe ou sub-agência com recrutados ativos e necessidade de controle operacional.",
    accent: "glow",
    features: [
      "Tudo do Growth, mais:",
      "Pipeline de recrutamento com 4 stages",
      "Proposed Agent → Pré-Jaqueta → VPs → Black Jacket",
      "44 templates de equipe",
      "7 workflows de gestão de equipe",
      "Field Training com webhook customizado",
      "3 calendários extras",
      "Reunião semanal configurável",
      "Agency Dashboard com KPIs de equipe",
      "SparkBot com 1500 mensagens/mês",
      "Onboarding personalizado de 1h",
      "Suporte 24/7",
    ],
    pain: "Tenho equipe, mas não sei quem está em qual estágio. Quero rodar isso como uma agência de verdade.",
    cta: "Rodar minha agência",
    badges: ["Para líderes", "Equipe + Field Training", "Agency Dashboard", "1500 mensagens IA"],
  },
];

export function getPlanContent(id: PlanId): PlanContent {
  return PLAN_CONTENT.find((p) => p.id === id)!;
}

/** Linhas do comparativo detalhado. */
export type CompareRow = {
  label: string;
  starter: string | boolean;
  growth: string | boolean;
  agency: string | boolean;
};

export const COMPARE_ROWS: CompareRow[] = [
  { label: "CRM com pipeline de vendas", starter: true, growth: true, agency: true },
  { label: "Templates PT/EN", starter: "18", growth: "23", agency: "44+" },
  { label: "Workflows automáticos", starter: "9", growth: "12+", agency: "19+" },
  { label: "Calendário de agendamento", starter: true, growth: true, agency: true },
  { label: "SparkBot mensagens/mês", starter: "200", growth: "500", agency: "1500" },
  { label: "Dashboard de captação", starter: true, growth: true, agency: true },
  { label: "Lead Engagement Score", starter: false, growth: true, agency: true },
  { label: "Revisão anual automatizada", starter: false, growth: true, agency: true },
  { label: "Funil de recrutamento", starter: false, growth: "Básico (3 stages)", agency: "Completo (4 stages)" },
  { label: "Templates de equipe", starter: false, growth: false, agency: "44" },
  { label: "Field Training", starter: false, growth: false, agency: true },
  { label: "Calendários extras", starter: false, growth: false, agency: "3" },
  { label: "Agency Dashboard", starter: false, growth: false, agency: true },
  { label: "Onboarding personalizado", starter: false, growth: false, agency: "1h" },
  { label: "Suporte", starter: "WhatsApp", growth: "Prioritário", agency: "24/7" },
];
