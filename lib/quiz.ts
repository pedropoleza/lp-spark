import type { PlanId } from "./plans";

export type QuizOption = {
  label: string;
  points: number;
  /** Força no mínimo o plano indicado, independente do total. */
  minPlan?: PlanId;
  /** Força exatamente este plano. */
  forcePlan?: PlanId;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "clientes",
    question: "Quantos clientes ativos você tem hoje?",
    options: [
      { label: "Tô começando agora, ainda não tenho cliente", points: 1 },
      { label: "Entre 1 e 30 clientes", points: 2 },
      { label: "Entre 30 e 100 clientes", points: 3 },
      { label: "Mais de 100 clientes", points: 4 },
    ],
  },
  {
    id: "tempo",
    question: "Há quanto tempo você atua como agente de seguros?",
    options: [
      { label: "Menos de 6 meses", points: 1 },
      { label: "6 meses a 2 anos", points: 2 },
      { label: "2 a 5 anos", points: 3 },
      { label: "Mais de 5 anos", points: 4 },
    ],
  },
  {
    id: "recrutamento",
    question: "Sobre recrutar parceiros pra sua equipe...",
    options: [
      { label: "Não tenho e não pretendo recrutar agora", points: 0 },
      { label: "Não tenho, mas penso em começar", points: 2, minPlan: "growth" },
      { label: "Já tenho 1 a 5 recrutados", points: 4, minPlan: "growth" },
      { label: "Tenho 6+ recrutados", points: 6, forcePlan: "agency" },
    ],
  },
];

/**
 * Lógica de recomendação de plano conforme especificação.
 * p1 = pontos da pergunta 1, p2 = pergunta 2, p3 = pergunta 3.
 */
export function recomendarPlano(p1: number, p2: number, p3: number): PlanId {
  const total = p1 + p2 + p3;

  if (p3 === 6) return "agency";

  if (p3 === 2 || p3 === 4) {
    return total >= 9 ? "agency" : "growth";
  }

  if (total <= 4) return "starter";
  if (total <= 7) return "growth";
  return "agency";
}

export const QUIZ_REASONS: Record<PlanId, string> = {
  starter:
    "Você está no começo da operação. O Starter organiza seus leads, padroniza o follow-up e cria a rotina comercial que faz você fechar mais — sem complexidade.",
  growth:
    "Sua carteira já está ativa e o foco agora é crescer com previsibilidade. O Growth adiciona Lead Score, retenção, revisão anual e um funil básico de recrutamento.",
  agency:
    "Você lidera (ou está formando) uma equipe. O Agency entrega pipeline de recrutamento completo, Field Training, Agency Dashboard e SparkBot com 1500 mensagens para rodar como uma agência de verdade.",
};
