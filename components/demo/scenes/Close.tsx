"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { ShieldCheck, ArrowRight, Check, Smartphone } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";
import { useSpark } from "@/components/spark-context";
import { PLAN_CONTENT } from "@/content/pt-br";
import { PAYMENT_LINKS } from "@/lib/plans";
import { ROI, fmtUSD } from "@/content/demo/data";

export function Close() {
  const { activePlan, mode, pricing, agency } = useDemo();
  const { openCheckout } = useSpark();
  const p = PLAN_CONTENT.find((x) => x.id === activePlan) ?? PLAN_CONTENT[1];
  const over = pricing?.[activePlan];
  const price = over?.price ?? p.price;
  const original = over?.originalPrice;
  const paymentLink = over?.paymentLink ?? PAYMENT_LINKS[activePlan];
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (mode !== "zoom") return;
    QRCode.toDataURL(paymentLink, { width: 480, margin: 2, color: { dark: "#0B0B0F", light: "#FFFFFF" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [mode, paymentLink]);

  const recoveredValue = ROI.lostLeadsPerMonth * ROI.recoveryRate * ROI.commissionPerClient;
  const clientsToPayback = Math.max(1, Math.ceil(price / ROI.commissionPerClient));

  return (
    <SceneFrame label="O próximo passo">
      <h2 className="text-center font-display font-bold leading-[1.06]" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
        O próximo passo óbvio é <span className="gradient-text">começar.</span>
      </h2>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3">
        <div className="rounded-card-lg border border-lime/25 bg-lime/[0.06] p-5 text-center">
          <p className="font-display text-2xl font-bold tabular-nums text-lime">~{fmtUSD(recoveredValue)}/mês</p>
          <p className="mt-1 text-xs text-muted">recuperando só {Math.round(ROI.recoveryRate * 100)}% dos leads que hoje esfriam</p>
        </div>
        <div className="rounded-card-lg border border-white/10 bg-white/[0.03] p-5 text-center">
          <p className="font-display text-2xl font-bold tabular-nums text-cream">
            {original && <span className="mr-1.5 text-base font-semibold text-muted line-through">US$ {original}</span>}
            US$ {price}/mês
          </p>
          <p className="mt-1 text-xs text-muted">{clientsToPayback === 1 ? "1 cliente novo já paga o plano" : `${clientsToPayback} clientes pagam o plano`}</p>
        </div>
      </motion.div>

      <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Cancele quando quiser</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> A gente configura pra você</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Suporte humano em PT</span>
      </div>

      <div className="mx-auto mt-5 max-w-xl rounded-card-lg border border-accent/20 bg-accent/[0.05] p-4 text-center">
        <p className="text-sm text-cream">
          <span className="font-semibold text-accent">Taxa de ativação US$ 80 isenta</span> pra quem veio do evento.
        </p>
        <p className="mt-1 text-[12px] text-muted">
          Indique outros agentes e ganhe desconto recorrente. Da 5ª indicação em diante, o Spark pode sair de graça.
        </p>
      </div>

      {mode === "zoom" ? (
        <div className="mt-7 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt={`QR pagamento ${p.name}`} className="h-44 w-44" />
            ) : (
              <div className="h-44 w-44 animate-pulse rounded bg-black/10" />
            )}
          </div>
          <p className="flex items-center gap-1.5 text-sm text-cream">
            <Smartphone className="h-4 w-4 text-accent" /> Aponte a câmera do celular e finalize o {p.name}.
          </p>
          <p className="text-xs text-muted/70">Sem fidelidade. Cancele quando quiser.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3">
          <button onClick={() => openCheckout(activePlan)} className="btn-primary px-8 py-4 text-base">
            Assinar o {p.name} agora <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-xs text-muted/70">Cancele quando quiser. A gente configura tudo pra você.</p>
        </div>
      )}
    </SceneFrame>
  );
}
