/** Capacidades por plano (gating do showcase) + textos explicativos dos módulos. */
import type { PlanId } from "@/lib/plans";

export type Feature = "sparkbot" | "leadScore" | "recrutamento" | "calls" | "trafego" | "multiUser";

/** O que cada plano INCLUI. (Starter sem SparkBot; Growth com Lead Score mas sem recrutamento.) */
export const PLAN_HAS: Record<PlanId, Record<Feature, boolean>> = {
  starter: { sparkbot: false, leadScore: false, recrutamento: false, calls: false, trafego: false, multiUser: false },
  growth: { sparkbot: true, leadScore: true, recrutamento: false, calls: true, trafego: false, multiUser: false },
  agency: { sparkbot: true, leadScore: true, recrutamento: true, calls: true, trafego: true, multiUser: true },
};

export const PLAN_NAME: Record<PlanId, string> = { starter: "Starter", growth: "Growth", agency: "Agency" };

/** Primeiro plano que desbloqueia cada recurso (rótulo "disponível no X"). */
export const FEATURE_MINPLAN: Record<Feature, PlanId> = {
  sparkbot: "growth",
  leadScore: "growth",
  recrutamento: "agency",
  calls: "growth",
  trafego: "agency",
  multiUser: "agency",
};

/** Painel "O que isto faz" por tela (chave = ScreenId do AppShell). */
export const MODULE_INFO: Record<string, { title: string; points: string[] }> = {
  ai: {
    title: "SparkBot, o assistente de IA",
    points: [
      "Fala em português: texto, áudio, foto ou PDF",
      "Agenda, cria contato, move no funil e manda mensagem pro cliente",
      "Importa listas (CSV) e consulta a base das seguradoras",
      "Proativo: te dá o briefing do dia e cobra lead parado",
      "Sem limite de mensagens",
    ],
  },
  funil: {
    title: "Oportunidades (funil de vendas)",
    points: [
      "Cada card é uma oportunidade: um lead com potencial de fechar",
      "Tem valor estimado, etapa e tempo parado",
      "Arraste entre etapas e o total recalcula na hora",
      "Você enxerga exatamente onde o dinheiro trava",
    ],
  },
  contacts: {
    title: "Contatos",
    points: [
      "Ficha com notas, agendamentos, documentos e tarefas",
      "Lead Score prioriza quem está quente",
      "Linha do tempo com cada conversa e interação",
    ],
  },
  calendars: {
    title: "Agenda",
    points: [
      "Link compartilhável: o lead escolhe o horário livre",
      "Entra direto na sua agenda, sem troca de mensagem",
      "Confirmação e lembretes automáticos",
    ],
  },
  conversations: {
    title: "Conversas",
    points: ["WhatsApp, SMS e email num lugar só", "Histórico completo por contato", "Responda sem trocar de aplicativo"],
  },
  automation: {
    title: "Automações",
    points: ["Follow-up e pós-venda no automático", "Builder visual ou pronto por template", "Aniversário de apólice, renovação e reativação"],
  },
  dashboard: {
    title: "Dashboard",
    points: ["Números do funil em tempo real", "Leads, reuniões e taxa de conversão", "Filtra por período"],
  },
};
