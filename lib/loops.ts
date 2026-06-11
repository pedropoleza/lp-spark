/**
 * Registro de loops de fundo disponíveis em /public/loops.
 *
 * Marque um loop como `true` SÓ depois de rodar `npm run optimize:loops`
 * e confirmar que os arquivos .webm/.mp4/.jpg existem na pasta.
 * Enquanto estiver `false`, o <BackgroundLoop> não é renderizado (evita 404 em produção).
 */
export const LOOPS = {
  "hero-glow": false,
  "cta-glow": false,
} as const;

export type LoopKey = keyof typeof LOOPS;

export function loopAvailable(key: LoopKey): boolean {
  return LOOPS[key];
}
