/**
 * Grande Liga Spark da Copa do Mundo de Clubes — campanha temporária de palpites.
 *
 * Parte separada do site (rota /copa). Tema festivo, fora do guia visual normal.
 * Tudo aqui é editável num lugar só: times, pontuação, prêmios e textos.
 */
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* TIMES — ⚠️ CONFIRA O CHAVEAMENTO ATUAL                              */
/* Lista dos 16 times das oitavas da Copa do Mundo de Clubes 2025.    */
/* Se algum estiver errado/faltando, é só editar este array.          */
/* ------------------------------------------------------------------ */
export type Team = {
  id: string;
  name: string;
  country: string;
  flag: string; // emoji de bandeira do país
  color: string; // cor primária do clube (estado selecionado)
};

export const TEAMS: Team[] = [
  { id: "palmeiras", name: "Palmeiras", country: "Brasil", flag: "🇧🇷", color: "#0E7A4B" },
  { id: "flamengo", name: "Flamengo", country: "Brasil", flag: "🇧🇷", color: "#C52613" },
  { id: "fluminense", name: "Fluminense", country: "Brasil", flag: "🇧🇷", color: "#7A0A28" },
  { id: "botafogo", name: "Botafogo", country: "Brasil", flag: "🇧🇷", color: "#111111" },
  { id: "real-madrid", name: "Real Madrid", country: "Espanha", flag: "🇪🇸", color: "#FEBE10" },
  { id: "man-city", name: "Manchester City", country: "Inglaterra", flag: "🇬🇧", color: "#6CABDD" },
  { id: "chelsea", name: "Chelsea", country: "Inglaterra", flag: "🇬🇧", color: "#034694" },
  { id: "bayern", name: "Bayern de Munique", country: "Alemanha", flag: "🇩🇪", color: "#DC052D" },
  { id: "dortmund", name: "Borussia Dortmund", country: "Alemanha", flag: "🇩🇪", color: "#FDE100" },
  { id: "psg", name: "Paris Saint-Germain", country: "França", flag: "🇫🇷", color: "#004170" },
  { id: "benfica", name: "Benfica", country: "Portugal", flag: "🇵🇹", color: "#E10600" },
  { id: "inter", name: "Inter de Milão", country: "Itália", flag: "🇮🇹", color: "#0B1560" },
  { id: "juventus", name: "Juventus", country: "Itália", flag: "🇮🇹", color: "#111111" },
  { id: "inter-miami", name: "Inter Miami", country: "EUA", flag: "🇺🇸", color: "#F7B5CD" },
  { id: "monterrey", name: "Monterrey", country: "México", flag: "🇲🇽", color: "#16317A" },
  { id: "al-hilal", name: "Al Hilal", country: "Arábia Saudita", flag: "🇸🇦", color: "#0050A0" },
];

export const teamById = (id: string | null | undefined) => TEAMS.find((t) => t.id === id);

/* ------------------------------------------------------------------ */
/* PONTUAÇÃO — por dificuldade (quanto mais difícil, mais pontos)      */
/* ------------------------------------------------------------------ */
export const SCORING = [
  { key: "champion", label: "Acertar o campeão", points: 10, emoji: "🏆" },
  { key: "finalists", label: "Acertar os dois finalistas", points: 15, emoji: "🥈" },
  { key: "third", label: "Acertar o terceiro lugar", points: 10, emoji: "🥉" },
  { key: "score", label: "Acertar o placar exato da final", points: 20, emoji: "🎯" },
] as const;

export const PRIZES = [
  { place: "1º", medal: "🥇", prize: "50% OFF na próxima mensalidade", glow: "#FFD23F" },
  { place: "2º", medal: "🥈", prize: "30% OFF na próxima mensalidade", glow: "#D8DEE6" },
  { place: "3º", medal: "🥉", prize: "20% OFF na próxima mensalidade", glow: "#E59A52" },
];

export const TIEBREAK =
  "Em caso de empate, vence quem acertar o placar da final. Se continuar empatado, ganha quem enviou o palpite primeiro.";

/* ------------------------------------------------------------------ */
/* TEXTOS                                                              */
/* ------------------------------------------------------------------ */
export const COPA_COPY = {
  league: "Grande Liga Spark",
  tournament: "Copa do Mundo de Clubes",
  hook: "Como a Spark é brasileira, não podíamos deixar a Copa passar em branco. Faça seus palpites e concorra a descontos na mensalidade!",
  cta: "Fazer meus palpites",
  formIntro: "Primeiro seus dados, depois é só cravar os palpites. Leva menos de 1 minuto.",
  successTitle: "Palpite registrado!",
  successSub: "Boa sorte! Agora é torcer pros seus times. Os ganhadores são anunciados após a final.",
};

/* ------------------------------------------------------------------ */
/* SCHEMA de submissão (compartilhado client + API)                   */
/* ------------------------------------------------------------------ */
export const copaSubmissionSchema = z
  .object({
    name: z.string().trim().min(2, "Informe seu nome"),
    email: z.string().trim().email("E-mail inválido"),
    phone: z.string().trim().min(8, "Informe seu WhatsApp"),
    champion: z.string().min(1, "Escolha o campeão"),
    runnerUp: z.string().min(1, "Escolha o vice-campeão"),
    third: z.string().min(1, "Escolha o terceiro lugar"),
    scoreChampion: z.number().int().min(0).max(30),
    scoreRunnerUp: z.number().int().min(0).max(30),
  })
  .refine((d) => new Set([d.champion, d.runnerUp, d.third]).size === 3, {
    message: "Campeão, vice e terceiro precisam ser times diferentes",
    path: ["third"],
  });

export type CopaSubmission = z.infer<typeof copaSubmissionSchema>;
