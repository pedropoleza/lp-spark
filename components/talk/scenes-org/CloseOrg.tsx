"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import { CalendarClock, ArrowRight, Check } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { CLOSE_ORG } from "@/content/talk/copy-org";

export function CloseOrg() {
  const { mode, agency, ctaUrl } = useTalk();
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (mode !== "zoom") return;
    QRCode.toDataURL(ctaUrl, { width: 480, margin: 2, color: { dark: "#0B0B0F", light: "#FFFFFF" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, [mode, ctaUrl]);

  return (
    <TalkSceneFrame label="O próximo passo">
      <h2 className="text-center font-display font-bold leading-[1.06]" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}>
        Pare de ser o <span className="gradient-text">gargalo</span> do seu próprio negócio.
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mx-auto mt-5 max-w-xl text-center text-lg text-muted"
      >
        {CLOSE_ORG.sub}
      </motion.p>

      <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Base organizada</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Migração feita por nós</span>
        <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-accent" /> Condição exclusiva do time</span>
      </div>

      {mode === "zoom" ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="QR para agendar a demo" className="h-44 w-44" />
            ) : (
              <div className="h-44 w-44 animate-pulse rounded bg-black/10" />
            )}
          </div>
          <p className="flex items-center gap-1.5 text-sm text-cream">
            <CalendarClock className="h-4 w-4 text-accent" /> {CLOSE_ORG.caption}
          </p>
          <p className="text-xs text-muted/70">Time da {agency} · 20 minutos, sem compromisso.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-3">
          <a href={ctaUrl} target="_blank" rel="noreferrer" className="btn-primary px-8 py-4 text-base">
            Agendar minha demo <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-xs text-muted/70">20 minutos. A gente organiza sua base junto.</p>
        </div>
      )}
    </TalkSceneFrame>
  );
}
