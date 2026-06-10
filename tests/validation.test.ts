import { describe, it, expect } from "vitest";
import {
  checkoutFormSchema,
  createSessionSchema,
  isValidInternationalPhone,
} from "@/lib/validation";
import { isValidPlan, PLANS } from "@/lib/plans";

describe("isValidInternationalPhone", () => {
  it("aceita E.164 válidos", () => {
    expect(isValidInternationalPhone("+5511999998888")).toBe(true);
    expect(isValidInternationalPhone("+15085551234")).toBe(true);
  });
  it("rejeita sem + ou fora do tamanho", () => {
    expect(isValidInternationalPhone("5511999998888")).toBe(false);
    expect(isValidInternationalPhone("+123")).toBe(false);
    expect(isValidInternationalPhone("+1234567890123456")).toBe(false);
  });
});

const validForm = {
  fullName: "Maria Souza",
  email: "maria@exemplo.com",
  phone: "+5511999998888",
  businessName: "Souza Seguros",
};

describe("checkoutFormSchema", () => {
  it("não valida sem email válido", () => {
    const r = checkoutFormSchema.safeParse({ ...validForm, email: "invalido" });
    expect(r.success).toBe(false);
  });

  it("não valida sem telefone válido", () => {
    const r = checkoutFormSchema.safeParse({ ...validForm, phone: "11999998888" });
    expect(r.success).toBe(false);
  });

  it("não valida nome curto", () => {
    const r = checkoutFormSchema.safeParse({ ...validForm, fullName: "Ma" });
    expect(r.success).toBe(false);
  });

  it("valida formulário completo e default Brasil", () => {
    const r = checkoutFormSchema.safeParse(validForm);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.country).toBe("Brasil");
  });
});

describe("createSessionSchema", () => {
  it("rejeita plano inválido", () => {
    const r = createSessionSchema.safeParse({ ...validForm, plan: "enterprise" });
    expect(r.success).toBe(false);
  });
  it("aceita plano válido com quizScore", () => {
    const r = createSessionSchema.safeParse({ ...validForm, plan: "growth", quizScore: 8 });
    expect(r.success).toBe(true);
  });
});

describe("isValidPlan", () => {
  it("valida ids conhecidos", () => {
    expect(isValidPlan("starter")).toBe(true);
    expect(isValidPlan("growth")).toBe(true);
    expect(isValidPlan("agency")).toBe(true);
    expect(isValidPlan("enterprise")).toBe(false);
  });
});

describe("PLANS — Product ID x Price ID", () => {
  it("mantém Product IDs corretos e priceId distinto do productId", () => {
    expect(PLANS.starter.productId).toBe("prod_UXzOUwJ7hVRqNI");
    expect(PLANS.growth.productId).toBe("prod_UXzTvmFOXqbhPW");
    expect(PLANS.agency.productId).toBe("prod_UXzVvD1ci47Aup");
    // priceId nunca deve ser igual ao productId (não usar Product ID em line_items)
    for (const p of Object.values(PLANS)) {
      expect(p.priceId).not.toBe(p.productId);
    }
  });
});
