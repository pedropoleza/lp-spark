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
  currentCrm: "Kommo",
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
    "Hoje a sua operação roda no Kommo.",
    "E, sendo honesto, o CRM está subutilizado.",
  ],
  punch: "Não é falta de capacidade sua. É que a estrutura nunca foi montada para uma agência do seu tamanho.",
};

/* 3. O que vamos ver */
export const AGENDA_BOSS: { n: string; t: string }[] = [
  { n: "01", t: "Tudo que você já tem, e mais" },
  { n: "02", t: "Sair do Kommo sem perder nada" },
  { n: "03", t: "Sua estrutura replicada pros agentes" },
  { n: "04", t: "Integração com o portal Five Rings" },
  { n: "05", t: "Segurança e independência" },
];

/* 4. Paridade + além. plus=true marca o que vai ALÉM do Kommo. */
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

/* 6. Migração. state "ok" = vem 100%; "conditional" = depende do canal. */
export const MIGRATION_BOSS = {
  from: "Kommo",
  to: "Spark",
  items: [
    { label: "Contatos", state: "ok" as const },
    { label: "Tags", state: "ok" as const },
    { label: "Oportunidades", state: "ok" as const },
    { label: "Histórico de conversa", state: "conditional" as const, note: "depende do canal" },
  ],
  // Backdating no Spark é suportado; o limite é o Kommo (só lê canais que a
  // integração controla). Por isso histórico é condicional, não promessa cega.
  note: "Contatos, tags e oportunidades vêm 100%. Histórico de conversa a gente avalia pelo canal que você usa hoje.",
  proof: "Não é promessa: acabamos de fazer essa migração para a Jussara.",
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
  lead: "Eu trago a sua estrutura do Kommo pro Spark, junto com você.",
  points: [
    "Você vê funcionando com os seus dados reais.",
    "Sem risco: decide com base no real, não no slide.",
  ],
  cta: "Topa começar por isso?",
};
