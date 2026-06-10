import { z } from "zod";

/**
 * Validação de telefone internacional (E.164 simplificado):
 * - deve começar com "+"
 * - deve conter código do país + número
 * - entre 8 e 15 dígitos após remover espaços e símbolos
 */
export function isValidInternationalPhone(raw: string): boolean {
  if (!raw.startsWith("+")) return false;
  const digits = raw.replace(/[^0-9]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo (mínimo 3 caracteres)."),
  email: z.string().trim().email("Informe um email válido."),
  phone: z
    .string()
    .trim()
    .refine(isValidInternationalPhone, {
      message: "Use o formato internacional, exemplo: +5511999998888",
    }),
  businessName: z
    .string()
    .trim()
    .min(2, "Informe o nome do seu negócio (mínimo 2 caracteres)."),
  country: z.enum(["Brasil", "EUA", "Outro"]).default("Brasil"),
  state: z.string().trim().optional().default(""),
  city: z.string().trim().optional().default(""),
  postalCode: z.string().trim().optional().default(""),
});

export type CheckoutFormValues = z.input<typeof checkoutFormSchema>;

/** Schema da requisição da API (inclui plano e quiz score opcional). */
export const createSessionSchema = checkoutFormSchema.extend({
  plan: z.enum(["starter", "growth", "agency"]),
  quizScore: z.union([z.string(), z.number()]).optional(),
});

export const BR_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const;

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;
