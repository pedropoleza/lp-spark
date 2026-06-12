"use client";

import { CupomFinder } from "./CupomFinder";
import { SparkBackdrop } from "./ui/SparkBackdrop";
import { Grain } from "./ui/effects";

/** Wrapper client da rota /cupom (destino do QR) — lookup do cupom por empresa. */
export function CupomPage() {
  return (
    <>
      <SparkBackdrop />
      <Grain />
      <main className="relative z-10 grid min-h-dvh place-items-center">
        <CupomFinder />
      </main>
    </>
  );
}
