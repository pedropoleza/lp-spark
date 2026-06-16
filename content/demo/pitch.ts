/** Conteúdo de persuasão da Fase 3: jornada (escada), confiança/segurança, prova social. */
import type { PlanId } from "@/lib/plans";

export const LADDER: { plan: PlanId; stage: string; title: string; desc: string }[] = [
  { plan: "starter", stage: "Pré-Jaqueta", title: "Começando", desc: "Organize os leads, padronize o follow-up e feche seus primeiros clientes." },
  { plan: "growth", stage: "VP", title: "Estabelecido", desc: "Cresça com previsibilidade, retenha clientes e comece a recrutar." },
  { plan: "agency", stage: "Black Jacket", title: "Líder de equipe", desc: "Rode sua agência inteira (recrutamento, field training e KPIs) num lugar só." },
];

export const SECURITY: { icon: "lock" | "shield" | "download" | "headset"; title: string; body: string }[] = [
  { icon: "lock", title: "Criptografia de ponta a ponta", body: "Seus dados protegidos em trânsito e em repouso." },
  { icon: "shield", title: "Conformidade e infraestrutura enterprise", body: "Padrões internacionais de privacidade, backups e controle de acesso. [confirmar certificações]" },
  { icon: "download", title: "Seus dados são seus", body: "Exporte tudo quando quiser. Zero aprisionamento." },
  { icon: "headset", title: "Suporte humano em PT", body: "4 anos de operação e gente de verdade do seu lado." },
];

/** Depoimentos — EXEMPLOS. O fundador substitui pelos reais antes de publicar. */
export const TESTIMONIALS: { name: string; role: string; avatar: string; quote: string }[] = [
  { name: "Rodrigo Albuquerque", role: "Agente · Orlando, FL", avatar: "t1", quote: "Parei de perder lead por demora. O follow-up roda sozinho e eu só apareço pra fechar." },
  { name: "Patrícia Gomes", role: "Consultora financeira · Miami, FL", avatar: "t2", quote: "O SparkBot virou meu braço direito no WhatsApp. Agenda cheia sem eu ficar no celular o dia todo." },
  { name: "Diego Martins", role: "Líder de equipe · Boston, MA", avatar: "t3", quote: "Finalmente enxergo quem está em qual estágio do recrutamento. Minha agência roda de verdade." },
];

export const SOCIAL_STATS: { value: string; label: string; todo?: boolean }[] = [
  { value: "4 anos", label: "de operação" },
  { value: "250", label: "agentes ativos" },
  { value: "____", label: "leads gerenciados", todo: true },
];

/** Onboarding: 3 passos universais, feitos na mesma reunião. */
export const ONBOARDING_STEPS: { title: string; body: string }[] = [
  { title: "Conexão técnica", body: "Alguém entra no seu Zoom e conecta WhatsApp, CRM, calendário e Five Rings. Você não mexe em nada sozinho." },
  { title: "Explicação da plataforma", body: "Tour rápido focado na sua necessidade: como usar as ferramentas no seu dia a dia." },
  { title: "Acompanhamento", body: "Suporte contínuo e check-ups periódicos da sua conta." },
];

/** O acompanhamento muda por plano (nível de suporte). */
export const ONBOARDING_SUPPORT: Record<PlanId, string> = {
  starter: "Suporte por WhatsApp e check-ups da sua conta.",
  growth: "Suporte prioritário e revisões periódicas com o time.",
  agency: "Onboarding 1:1 com o fundador e suporte 24/7.",
};
