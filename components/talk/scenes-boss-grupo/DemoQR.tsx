"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, MessageCircle } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { GRUPO } from "@/content/talk/copy-boss-grupo";
import QRCode from "qrcode";

/* eslint-disable @next/next/no-img-element */

export function DemoQR() {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(GRUPO.demoUrl, { width: 480, margin: 2, color: { dark: "#0B0B0F", light: "#FFFFFF" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  return (
    <TalkSceneFrame label="Ainda com dúvida?">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.4vw, 2.8rem)" }}>
        Quer ver de perto <span className="gradient-text">com os seus números?</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted">
        Agenda uma demo de 20 minutos. A gente monta junto, sem compromisso.
      </p>

      <div className="mt-7 flex flex-col items-center gap-3">
        <div className="rounded-2xl bg-white p-3">
          {qr ? (
            <img src={qr} alt="QR para agendar demo" className="h-44 w-44" />
          ) : (
            <div className="h-44 w-44 animate-pulse rounded bg-black/10" />
          )}
        </div>
        <p className="flex items-center gap-1.5 text-sm text-cream">
          <CalendarClock className="h-4 w-4 text-accent" /> Aponte a câmera e escolha um horário.
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted/70">
          <MessageCircle className="h-3.5 w-3.5" /> Ou chama a gente no WhatsApp depois da call.
        </p>
      </div>
    </TalkSceneFrame>
  );
}
