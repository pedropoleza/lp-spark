"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { Smartphone, ArrowRight, Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { lossPerYear, fmtUSD, CALC } from "@/content/talk/copy";

export function Close() {
  const { mode, agency, ctaUrl, leadsPerMonth, commission, followOf10 } = useTalk();
  const recoverable = Math.round(lossPerYear(leadsPerMonth, commission, followOf10) * CALC.recoveryRate);
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (mode !== "zoom") return;
    QRCode.toDataURL(ctaUrl, { width: 480, margin: 2, color: { dark: "#0B0B0F", light: "#FFFFFF" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [mode, ctaUrl]);

  return (
    <TalkSceneFrame label="O próximo passo">
      <h2 className="text-center font-display font-bold leading-[1.06]" style={{ fontSize: "clamp(2rem, 5.2vw, 3.4rem)" }}>
        O seu próximo cheque <span className="gradient-text">já está na sua lista.</span>
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-5 max-w-xl text-center text-lg text-muted"
      >
        Lembra dos <span className="font-semibold text-lime">{fmtUSD(recoverable)}/ano</span> que dá pra
        recuperar? Falta só a esteira que liga por você.
      </motion.p>

      <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Nenhum lead esquecido</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> No WhatsApp que você já usa</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Suporte humano em PT</span>
      </div>

      {mode === "zoom" ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="QR para começar" className="h-44 w-44" />
            ) : (
              <div className="h-44 w-44 animate-pulse rounded bg-black/10" />
            )}
          </div>
          <p className="flex items-center gap-1.5 text-sm text-cream">
            <Smartphone className="h-4 w-4 text-accent" /> Aponte a câmera e comece hoje.
          </p>
          <p className="text-xs text-muted/70">Time da {agency} · fale comigo depois pra configurarmos juntos.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3">
          <a href={ctaUrl} target="_blank" rel="noreferrer" className="btn-primary px-8 py-4 text-base">
            Quero começar <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-xs text-muted/70">A gente configura tudo com você.</p>
        </div>
      )}
    </TalkSceneFrame>
  );
}
