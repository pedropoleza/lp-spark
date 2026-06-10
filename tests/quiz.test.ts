import { describe, it, expect } from "vitest";
import { recomendarPlano } from "@/lib/quiz";

describe("recomendarPlano", () => {
  it("recomenda Starter com pontuação baixa e sem recrutamento", () => {
    // p1=1 (começando), p2=1 (<6 meses), p3=0 (não recruta) => total 2
    expect(recomendarPlano(1, 1, 0)).toBe("starter");
  });

  it("recomenda Growth quando há intenção de recrutamento (p3=2)", () => {
    expect(recomendarPlano(1, 1, 2)).toBe("growth");
  });

  it("recomenda Growth com 1-5 recrutados e total < 9", () => {
    expect(recomendarPlano(1, 1, 4)).toBe("growth");
  });

  it("recomenda Agency com 1-5 recrutados quando total >= 9", () => {
    expect(recomendarPlano(3, 4, 4)).toBe("agency");
  });

  it("força Agency quando há 6+ recrutados (p3=6)", () => {
    expect(recomendarPlano(1, 1, 6)).toBe("agency");
  });

  it("recomenda Growth para faixa intermediária sem recrutamento", () => {
    // total 6, p3=0 => growth (5..7)
    expect(recomendarPlano(3, 3, 0)).toBe("growth");
  });

  it("recomenda Agency para total alto sem recrutamento", () => {
    expect(recomendarPlano(4, 4, 0)).toBe("agency");
  });
});
