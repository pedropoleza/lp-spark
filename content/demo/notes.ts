/**
 * Notas do apresentador (a "cola"). 2-3 bullets por cena: o que falar / o gancho.
 * Aparecem só no modo Zoom, com a tecla N. Chave = id da cena (SCENES).
 */
export const NOTES: Record<string, string[]> = {
  abertura: [
    "Abra pelo resultado: às 8h o bot já trabalhou",
    "Não explique ainda, gere curiosidade",
    "“Isso é o final. Vou te mostrar como chega aqui”",
  ],
  "quem-somos": [
    "4 anos, 250 agentes, feito pro agente Five Rings",
    "Frame: não vim vender, vim mostrar onde você perde dinheiro",
  ],
  quiz: ["Deixe ELE responder antes de você clicar", "Cada resposta é um pequeno “sim”"],
  diagnostico: ["Nomeie a dor + o número de perda", "Checkpoint: “faz sentido?” e espere a resposta"],
  plano: ["Empilhe o valor ANTES do preço", "Destaque 3-4 itens que batem com a dor dele"],
  showcase: [
    "SparkBot é o fio: tudo roda nele",
    "Mostre o funil (arraste 1 card) e a Five Rings",
    "Use o painel da direita como guia",
  ],
  jornada: ["Planos = momentos da carreira", "“Você está aqui e cresce sem recomeçar do zero”"],
  confianca: ["Derrube o medo: dados seguros e seus", "Suporte humano em PT, exporta quando quiser"],
  onboarding: ["A gente conecta tudo na mesma reunião", "Reforce: você não configura nada sozinho"],
  fechamento: [
    "Faça a conta do ROI junto com ele",
    "Peça a decisão e FIQUE EM SILÊNCIO",
    "Zoom: gere o QR · Solo: abre o checkout",
  ],
};
