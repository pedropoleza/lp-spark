/**
 * Demo BO$$ (Natália Freguglia) — apresentação ÚNICA, Zoom 1:1, conduzida pelo
 * Pedro. Não é replicável: é uma vez, bem feita. Tese: não é trocar de CRM, é
 * montar a estrutura da BO$$. Fecha em migração piloto.
 *
 * Tudo hardcoded com a marca "BO$$" de propósito (deck personalizado).
 * PENDENTE: confirmar histórico de conversa na migração (MIGRATION.items).
 */

export const BOSS = {
  agency: "BO$$",
  contact: "Natália",
  currentCrm: "Como",
} as const;

/* 1. Abertura */
export const COVER_BOSS = {
  eyebrow: "Feito sob medida para a",
  title: "A estrutura da BO$$.",
  sub: "Natália, os próximos 20 minutos não são uma demo genérica. São uma estrutura desenhada para uma agência do seu tamanho.",
};

/* 2. O momento da BO$$ */
export const MOMENT_BOSS = {
  eyebrow: "Onde a BO$$ está hoje",
  lead: "Uma das maiores agências da Five Rings.",
  points: [
    "Hoje a sua operação roda no Como.",
    "E, sendo honesto, o CRM está subutilizado.",
  ],
  punch: "Não é falta de capacidade sua. É que a estrutura nunca foi montada para uma agência do seu tamanho.",
};

/* 3. O que vamos ver */
export const AGENDA_BOSS: { n: string; t: string }[] = [
  { n: "01", t: "Tudo que você já tem, e mais" },
  { n: "02", t: "Sair do Como sem perder nada" },
  { n: "03", t: "Sua estrutura replicada pros agentes" },
  { n: "04", t: "Integração com o portal Five Rings" },
  { n: "05", t: "Segurança e independência" },
];

/* 4. Paridade + além. plus=true marca o que vai ALÉM do Como. */
export const PARITY_BOSS: { name: string; plus: boolean }[] = [
  { name: "Funil de vendas", plus: false },
  { name: "Conversas: WhatsApp, IG, SMS, ligação", plus: false },
  { name: "Contatos e tags", plus: false },
  { name: "Automações", plus: false },
  { name: "Calendário nativo", plus: true },
  { name: "Gestão de agência", plus: true },
  { name: "SparkBot (IA no WhatsApp)", plus: true },
  { name: "Integração Five Rings", plus: true },
];

/* 6. Migração. confirmed=false aparece com selo "a confirmar". */
export const MIGRATION_BOSS = {
  from: "Como",
  to: "Spark",
  items: [
    { label: "Contatos", confirmed: true },
    { label: "Tags", confirmed: true },
    { label: "Oportunidades", confirmed: true },
    { label: "Histórico de conversa", confirmed: false },
  ],
  proof: "Não é promessa: acabamos de fazer essa migração para a Jussara. Veio tudo.",
};

/* 7. De usuária a arquiteta */
export const ARCHITECT_BOSS = {
  eyebrow: "O que muda o jogo",
  title: "Você não vai só usar um CRM.",
  lead: "Vai desenhar a estrutura que os seus agentes rodam.",
  punch: "Você entende o sistema uma vez, e vira a arquiteta da operação da BO$$.",
};

/* 8. Snapshots por plano (ápice) */
export const SNAPSHOTS_BOSS = {
  eyebrow: "Snapshots por plano",
  title: "Customize uma vez. Replique pra todos.",
  plans: [
    { name: "Starter", desc: "O essencial pro agente começar, já com a cara da BO$$." },
    { name: "Growth", desc: "Mais canais e automações, pro agente que está escalando." },
    { name: "Agency", desc: "A operação completa, pra liderança e times." },
  ],
  punch: "Cada plano vira um pacote pronto, com a identidade da BO$$, que você entrega pro agente com um clique.",
};

/* 9. Integração Five Rings */
export const FIVERINGS_BOSS = {
  eyebrow: "O diferencial que ninguém te dá",
  title: "Integração nativa com o portal da Five Rings.",
  steps: [
    { t: "Importa", d: "Puxa os dados do portal da Five Rings direto pro Spark." },
    { t: "Automatiza", d: "Roda automações de controle de agência em cima desses dados." },
    { t: "Personaliza", d: "Já temos um modelo pronto, mas tudo é ajustável pro jeito da BO$$." },
  ],
};

/* 10. Segurança & independência */
export const SECURITY_BOSS = {
  eyebrow: "Segurança & independência",
  title: "Os seus dados são seus. Ponto.",
  items: [
    { t: "Criptografia", d: "Dados protegidos em trânsito e em repouso." },
    { t: "Exporta quando quiser", d: "Sem ficar refém da ferramenta." },
    { t: "Suporte humano em português", d: "Gente de verdade, não robô." },
    { t: "Acesso por função", d: "Cada agente vê só o que deve ver." },
  ],
  independence:
    "E um ponto importante: somos uma operação independente, prestadora de serviço pra Five Rings. Não somos agentes e não temos vínculo com nenhum agente, justamente pra não ter conflito de interesse.",
};

/* 11. Recap */
export const RECAP_BOSS = {
  title: "Isso não é trocar de CRM. É montar a estrutura da BO$$.",
  pillars: [
    "Paridade e mais",
    "Migração sem perda",
    "Snapshots pros agentes",
    "Integração Five Rings",
    "Segurança",
  ],
};

/* 12. Fechamento (migração piloto) */
export const CLOSE_BOSS = {
  eyebrow: "Próximo passo",
  title: "Vamos começar pela migração piloto.",
  lead: "Eu trago a sua estrutura do Como pro Spark, junto com você.",
  points: [
    "Você vê funcionando com os seus dados reais.",
    "Sem risco: decide com base no real, não no slide.",
  ],
  cta: "Topa começar por isso?",
};
