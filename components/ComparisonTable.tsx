"use client";

import { useState } from "react";
import { Check, Minus, ChevronDown } from "lucide-react";
import { COMPARE_ROWS, PLAN_CONTENT } from "@/content/pt-br";
import { useSpark } from "./spark-context";
import { Container, Section, SectionHeading } from "./ui/primitives";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-lime" />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-muted/40" />;
  return <span className="text-sm text-cream">{value}</span>;
}

export function ComparisonTable() {
  const { openCheckout } = useSpark();
  const [openRow, setOpenRow] = useState<number | null>(0);

  return (
    <Section
      id="comparar"
      ambient
      reaction={{
        clip: "/bot/bot-smile",
        caption: "Comparei tudo pra você. Olha onde cada plano brilha.",
        blend: true,
        side: "left",
      }}
    >
      <Container>
        <SectionHeading
          align="center"
          label="COMPARATIVO DETALHADO"
          title={
            <>
              Compare os planos lado a lado.
            </>
          }
          description="Starter é ideal para começar. Growth é o melhor custo-benefício. Agency é a operação de equipe completa."
          className="mb-12"
        />

        {/* Desktop / tablet */}
        <div className="hidden overflow-hidden rounded-card-lg border border-white/10 md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-white/[0.03]">
                <th className="p-5 text-sm font-medium text-muted">Recursos</th>
                {PLAN_CONTENT.map((p) => (
                  <th key={p.id} className="p-5 text-center">
                    <div className="font-display text-lg font-bold">{p.name}</div>
                    <div className="text-xs font-normal text-muted">US$ {p.price}/mês</div>
                    {p.badge && (
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-spark">
                        {p.badge}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.label} className={cn("border-t border-white/[0.06]", i % 2 && "bg-white/[0.015]")}>
                  <td className="p-4 text-sm text-muted">{row.label}</td>
                  <td className="p-4 text-center">
                    <Cell value={row.starter} />
                  </td>
                  <td className="bg-spark/[0.04] p-4 text-center">
                    <Cell value={row.growth} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={row.agency} />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-white/10">
                <td className="p-4" />
                {PLAN_CONTENT.map((p) => (
                  <td key={p.id} className="p-4 text-center">
                    <button onClick={() => openCheckout(p.id)} className="btn-secondary !py-2 text-xs">
                      {p.cta}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: accordion por plano */}
        <div className="space-y-3 md:hidden">
          {PLAN_CONTENT.map((p, idx) => {
            const key = p.id as "starter" | "growth" | "agency";
            const isOpen = openRow === idx;
            return (
              <div key={p.id} className="overflow-hidden rounded-card border border-white/10">
                <button
                  onClick={() => setOpenRow(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4"
                  aria-expanded={isOpen}
                >
                  <div className="text-left">
                    <div className="font-display font-bold">{p.name}</div>
                    <div className="text-xs text-muted">US$ {p.price}/mês</div>
                  </div>
                  <ChevronDown className={cn("h-5 w-5 text-muted transition", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 p-4">
                    <ul className="space-y-2.5">
                      {COMPARE_ROWS.map((row) => (
                        <li key={row.label} className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-muted">{row.label}</span>
                          <span className="shrink-0">
                            <Cell value={row[key]} />
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => openCheckout(p.id)} className="btn-primary mt-4 w-full">
                      {p.cta}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
