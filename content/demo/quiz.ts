/**
 * Quiz diagnóstico da demo — 4 perguntas.
 * Reaproveita as 3 perguntas pontuadas + recomendarPlano da landing (lib/quiz)
 * e adiciona a 4ª ("maior dor"), que é o gancho do diagnóstico (cena 4).
 */
import { QUIZ_QUESTIONS, recomendarPlano, type QuizQuestion } from "@/lib/quiz";

export type PainKey = "followup" | "retencao" | "equipe" | "visao";

export type PainOption = { key: PainKey; label: string };

export const PAIN_QUESTION: { id: string; question: string; options: PainOption[] } = {
  id: "dor",
  question: "E hoje, qual é a sua maior dor?",
  options: [
    { key: "followup", label: "Perco cliente porque demoro pra responder ou esqueço o follow-up" },
    { key: "retencao", label: "Cresci e não dou conta de retenção, recrutamento e clientes novos ao mesmo tempo" },
    { key: "equipe", label: "Tenho equipe, mas não sei quem está em qual estágio" },
    { key: "visao", label: "Não enxergo meu funil — não sei onde o dinheiro trava" },
  ],
};

/** As 3 perguntas pontuadas (reusadas da landing) + a 4ª pergunta de dor. */
export const SCORED_QUESTIONS: QuizQuestion[] = QUIZ_QUESTIONS;

export { recomendarPlano };

/** Diagnóstico por dor (PAS + aversão à perda). O número de perda vem do ROI. */
export const PAIN_DIAGNOSIS: Record<PainKey, { headline: string; body: string }> = {
  followup: {
    headline: "Você está deixando dinheiro na mesa — todo mês.",
    body: "Lead que não é respondido rápido esfria. Cada follow-up esquecido é uma comissão que vai pro concorrente. O problema não é falta de lead — é não ter um sistema que responde e cobra por você.",
  },
  retencao: {
    headline: "Crescer sem sistema vira caos — e caos custa caro.",
    body: "Quando a carteira cresce, retenção, recrutamento e clientes novos competem pela sua atenção. Sem automação de pós-venda e score, você perde renovação e indicação — a parte mais lucrativa do negócio.",
  },
  equipe: {
    headline: "Sem visão da equipe, você lidera no escuro.",
    body: "Não saber quem está em qual estágio do recrutamento trava o crescimento da agência. Você gasta energia cobrando manualmente em vez de escalar — e bons recrutas esfriam no caminho.",
  },
  visao: {
    headline: "O que você não enxerga, você não controla.",
    body: "Sem um funil visual, o dinheiro trava em etapas invisíveis. Você não sabe onde perde, não prioriza o lead certo e decide no achismo — enquanto oportunidades quentes esfriam.",
  },
};
