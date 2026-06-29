/**
 * Grande Liga Spark da Copa do Mundo de Clubes — campanha temporária de palpites.
 *
 * Parte separada do site (rota /copa). Tema festivo, fora do guia visual normal.
 * Tudo aqui é editável num lugar só: times, pontuação, prêmios e textos.
 */
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* SELEÇÕES — ⚠️ CONFIRA CONFORME O MATA-MATA AVANÇA                   */
/* As 32 seleções classificadas para o mata-mata da Copa do Mundo 2026 */
/* (12 1ºs de grupo + 12 2ºs + 8 melhores 3ºs). Conforme os times      */
/* forem eliminados, é só remover daqui. O "country" mostra a          */
/* confederação/continente (subtítulo no card).                        */
/* ------------------------------------------------------------------ */
export type Team = {
  id: string;
  name: string;
  country: string; // confederação/continente (subtítulo)
  flag: string; // emoji da bandeira
  color: string; // cor da seleção (estado selecionado)
};

export const TEAMS: Team[] = [
  { id: "brasil", name: "Brasil", country: "América do Sul", flag: "🇧🇷", color: "#009C3B" },
  { id: "argentina", name: "Argentina", country: "América do Sul", flag: "🇦🇷", color: "#75AADB" },
  { id: "franca", name: "França", country: "Europa", flag: "🇫🇷", color: "#0055A4" },
  { id: "espanha", name: "Espanha", country: "Europa", flag: "🇪🇸", color: "#C60B1E" },
  { id: "inglaterra", name: "Inglaterra", country: "Europa", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", color: "#CF1020" },
  { id: "alemanha", name: "Alemanha", country: "Europa", flag: "🇩🇪", color: "#111111" },
  { id: "portugal", name: "Portugal", country: "Europa", flag: "🇵🇹", color: "#006600" },
  { id: "holanda", name: "Holanda", country: "Europa", flag: "🇳🇱", color: "#F36C21" },
  { id: "belgica", name: "Bélgica", country: "Europa", flag: "🇧🇪", color: "#E30613" },
  { id: "croacia", name: "Croácia", country: "Europa", flag: "🇭🇷", color: "#D10000" },
  { id: "suica", name: "Suíça", country: "Europa", flag: "🇨🇭", color: "#D52B1E" },
  { id: "noruega", name: "Noruega", country: "Europa", flag: "🇳🇴", color: "#BA0C2F" },
  { id: "austria", name: "Áustria", country: "Europa", flag: "🇦🇹", color: "#ED2939" },
  { id: "bosnia", name: "Bósnia e Herzegovina", country: "Europa", flag: "🇧🇦", color: "#002F6C" },
  { id: "suecia", name: "Suécia", country: "Europa", flag: "🇸🇪", color: "#FECC00" },
  { id: "colombia", name: "Colômbia", country: "América do Sul", flag: "🇨🇴", color: "#FCD116" },
  { id: "equador", name: "Equador", country: "América do Sul", flag: "🇪🇨", color: "#FFD100" },
  { id: "paraguai", name: "Paraguai", country: "América do Sul", flag: "🇵🇾", color: "#D52B1E" },
  { id: "mexico", name: "México", country: "Concacaf", flag: "🇲🇽", color: "#006847" },
  { id: "eua", name: "Estados Unidos", country: "Concacaf", flag: "🇺🇸", color: "#0A3161" },
  { id: "canada", name: "Canadá", country: "Concacaf", flag: "🇨🇦", color: "#FF0000" },
  { id: "marrocos", name: "Marrocos", country: "África", flag: "🇲🇦", color: "#C1272D" },
  { id: "senegal", name: "Senegal", country: "África", flag: "🇸🇳", color: "#00853F" },
  { id: "egito", name: "Egito", country: "África", flag: "🇪🇬", color: "#CE1126" },
  { id: "argelia", name: "Argélia", country: "África", flag: "🇩🇿", color: "#007A3D" },
  { id: "costa-marfim", name: "Costa do Marfim", country: "África", flag: "🇨🇮", color: "#FF8200" },
  { id: "gana", name: "Gana", country: "África", flag: "🇬🇭", color: "#006B3F" },
  { id: "cabo-verde", name: "Cabo Verde", country: "África", flag: "🇨🇻", color: "#003893" },
  { id: "africa-sul", name: "África do Sul", country: "África", flag: "🇿🇦", color: "#007A4D" },
  { id: "rd-congo", name: "R.D. Congo", country: "África", flag: "🇨🇩", color: "#00A2E8" },
  { id: "japao", name: "Japão", country: "Ásia", flag: "🇯🇵", color: "#BC002D" },
  { id: "australia", name: "Austrália", country: "Ásia", flag: "🇦🇺", color: "#FFCD00" },
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
  tournament: "Copa do Mundo 2026",
  hook: "Como a Spark é brasileira, não podíamos deixar a Copa do Mundo passar em branco. Crave seus palpites das seleções e concorra a descontos na mensalidade!",
  cta: "Fazer meus palpites",
  formIntro: "Primeiro seus dados, depois é só cravar os palpites. Leva menos de 1 minuto.",
  successTitle: "Palpite registrado!",
  successSub: "Boa sorte! Agora é torcer pela sua seleção. Os ganhadores são anunciados após a final.",
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
