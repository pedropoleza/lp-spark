"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { BossMark } from "../scenes-boss/BossMark";
import { GRUPO_PLANS, checkoutUrl, type GrupoPlan } from "@/content/talk/copy-boss-grupo";
import QRCode from "qrcode";

/* eslint-disable @next/next/no-img-element */

function PlanCard({ p, qr }: { p: GrupoPlan; qr: string }) {
  return (
    <div
      className={`relative flex flex-col rounded-card-lg border p-5 ${
        p.featured ? "border-accent/60 bg-accent/[0.07]" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      {p.featured && (
        <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
          <Star className="h-3 w-3" /> Mais escolhido
        </span>
      )}

      <p className="font-display text-xl font-bold text-cream">{p.name}</p>

      <div className="mt-1 flex items-end gap-2">
        <span className="text-base font-semibold text-muted line-through">US$ {p.original}</span>
        <span className="font-display text-4xl font-bold text-cream">US$ {p.price}</span>
        <span className="mb-1 text-xs text-muted">/mês</span>
      </div>

      <ul className="mt-3 flex-1 space-y-1.5">
        {p.features.slice(0, 3).map((f) => (
          <li key={f} className="flex gap-2 text-[12.5px] leading-snug text-cream/90">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* QR de checkout */}
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <div className="rounded-xl bg-white p-2">
          {qr ? (
            <img src={qr} alt={`Checkout ${p.name}`} className="h-28 w-28" />
          ) : (
            <div className="h-28 w-28 animate-pulse rounded bg-black/10" />
          )}
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
          {p.coupon}
        </span>
      </div>
    </div>
  );
}

export function PlansQR() {
  const [qrs, setQrs] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    Promise.all(
      GRUPO_PLANS.map((p) =>
        QRCode.toDataURL(checkoutUrl(p), { width: 360, margin: 1, color: { dark: "#0B0B0F", light: "#FFFFFF" } }).then(
          (d) => [p.id, d] as const,
        ),
      ),
    )
      .then((pairs) => {
        if (alive) setQrs(Object.fromEntries(pairs));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <TalkSceneFrame wide label="Condição exclusiva do time">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
        Escolha o seu plano. <span className="gradient-text">Aponte a câmera. Comece hoje.</span>
      </h2>
      <p className="mx-auto mt-2 text-center text-sm text-muted">
        Preço exclusivo pra quem está nesta chamada com a <BossMark className="text-cream" />. O cupom já vai aplicado.
      </p>

      <div className="mx-auto mt-7 grid max-w-4xl items-stretch gap-4 md:grid-cols-3">
        {GRUPO_PLANS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.15 }}
          >
            <PlanCard p={p} qr={qrs[p.id] ?? ""} />
          </motion.div>
        ))}
      </div>
    </TalkSceneFrame>
  );
}
