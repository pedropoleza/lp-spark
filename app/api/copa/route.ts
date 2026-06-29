import { NextResponse } from "next/server";
import { copaSubmissionSchema, teamById } from "@/content/copa";

/**
 * POST /api/copa — recebe um palpite do Bolão da Copa.
 *
 * Entrega: encaminha o palpite (JSON) pro webhook em COPA_WEBHOOK_URL — pode ser
 * um inbound webhook do GHL, Zapier, Make, n8n, Google Apps Script etc. Assim os
 * palpites caem direto onde você quiser (planilha, CRM...). Se a variável não
 * estiver setada, a API ainda responde OK (a experiência nunca quebra) e loga o
 * palpite no servidor.
 *
 * [setar no Vercel] COPA_WEBHOOK_URL = https://...  (Production + Preview)
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = copaSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
      { status: 400 },
    );
  }
  const d = parsed.data;

  // payload enriquecido com nomes legíveis (facilita ler na planilha/CRM)
  const record = {
    ...d,
    championName: teamById(d.champion)?.name ?? d.champion,
    runnerUpName: teamById(d.runnerUp)?.name ?? d.runnerUp,
    thirdName: teamById(d.third)?.name ?? d.third,
    finalScore: `${d.scoreChampion}x${d.scoreRunnerUp}`,
    submittedAt: new Date().toISOString(),
    source: "copa-bolao",
  };

  const webhook = process.env.COPA_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error("[copa] webhook respondeu", res.status);
        return NextResponse.json({ error: "Falha ao registrar." }, { status: 502 });
      }
    } catch (err) {
      console.error("[copa] erro ao chamar webhook", err);
      return NextResponse.json({ error: "Falha ao registrar." }, { status: 502 });
    }
  } else {
    // sem webhook configurado: não perde o palpite, fica no log do servidor
    console.warn("[copa] COPA_WEBHOOK_URL não configurado. Palpite:", JSON.stringify(record));
  }

  return NextResponse.json({ ok: true });
}
