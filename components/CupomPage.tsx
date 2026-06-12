"use client";

import dynamic from "next/dynamic";
import { SparkProvider } from "./spark-context";
import { CupomFinder } from "./CupomFinder";
import { SparkBackdrop } from "./ui/SparkBackdrop";
import { Grain } from "./ui/effects";

// Checkout reaproveitado da landing — abre com o cupom já aplicado.
const CheckoutModal = dynamic(() => import("./CheckoutModal").then((m) => m.CheckoutModal), {
  ssr: false,
});

/** Wrapper client da rota /cupom (destino do QR). */
export function CupomPage() {
  return (
    <SparkProvider>
      <SparkBackdrop />
      <Grain />
      <main className="relative z-10 grid min-h-dvh place-items-center">
        <CupomFinder />
      </main>
      <CheckoutModal />
    </SparkProvider>
  );
}
