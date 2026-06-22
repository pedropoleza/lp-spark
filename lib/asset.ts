/**
 * Prefixa caminhos de /public com o basePath do app.
 *
 * Necessário porque o site roda sob basePath (/brazilionaires) e referências
 * manuais a assets (ex.: "/bot/x.webp", "/brand/y.webp") NÃO recebem o prefixo
 * automaticamente — sem isto, dão 404. Use em todo src/poster de asset de public.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  if (!path || !path.startsWith("/")) return path;
  if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) return path; // já prefixado
  return `${BASE_PATH}${path}`;
}
