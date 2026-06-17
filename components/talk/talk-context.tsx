"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from "react";
import { CALC, TALK } from "@/content/talk/copy";

export type TalkMode = "zoom" | "solo";

type TalkCtx = {
  mode: TalkMode;
  setMode: (m: TalkMode) => void;
  total: number;
  scene: number;
  setScene: (i: number) => void;
  next: () => void;
  prev: () => void;
  blackout: boolean;
  toggleBlackout: () => void;
  // personalização (nome + logo da agência; link de CTA)
  agency: string;
  setAgency: (s: string) => void;
  logoUrl: string | null;
  presenterPhoto: string | null;
  ctaUrl: string;
  // estado da calculadora (compartilhado p/ o fechamento retomar o número)
  leadsPerMonth: number;
  setLeadsPerMonth: (n: number) => void;
  commission: number;
  setCommission: (n: number) => void;
  followOf10: number;
  setFollowOf10: (n: number) => void;
  resetTalk: () => void;
};

const Ctx = createContext<TalkCtx | null>(null);

const STORE_KEY = "spark-talk-agency";
const DEFAULT_CTA = "https://sparkleads.pro"; // [ajustar: link de cadastro/contato do agente]

export function TalkProvider({ total, children }: { total: number; children: ReactNode }) {
  const [mode, setMode] = useState<TalkMode>("zoom");
  const [scene, setSceneRaw] = useState(0);
  const [blackout, setBlackout] = useState(false);
  const [agency, setAgency] = useState<string>(TALK.agencyFallback);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [presenterPhoto, setPresenterPhoto] = useState<string | null>(null);
  const [ctaUrl, setCtaUrl] = useState(DEFAULT_CTA);

  const [leadsPerMonth, setLeadsPerMonth] = useState(CALC.leadsPerMonth);
  const [commission, setCommission] = useState(CALC.commission);
  const [followOf10, setFollowOf10] = useState(CALC.followOf10);

  // Personalização por URL: ?agencia=Nome&logo=URL&cta=URL  (com fallback no localStorage)
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const fromUrl = sp.get("agencia");
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem(STORE_KEY) : null;
    if (fromUrl) setAgency(fromUrl);
    else if (stored) setAgency(stored);
    const logo = sp.get("logo");
    if (logo) setLogoUrl(logo);
    const foto = sp.get("foto");
    if (foto) setPresenterPhoto(foto);
    const cta = sp.get("cta");
    if (cta) setCtaUrl(cta);
  }, []);

  const setAgencyPersist = useCallback((s: string) => {
    setAgency(s);
    try {
      localStorage.setItem(STORE_KEY, s);
    } catch {
      /* ignore */
    }
  }, []);

  const setScene = useCallback((i: number) => setSceneRaw(Math.max(0, Math.min(total - 1, i))), [total]);
  const next = useCallback(() => setSceneRaw((s) => Math.min(total - 1, s + 1)), [total]);
  const prev = useCallback(() => setSceneRaw((s) => Math.max(0, s - 1)), []);
  const toggleBlackout = useCallback(() => setBlackout((b) => !b), []);
  const resetTalk = useCallback(() => {
    setSceneRaw(0);
    setBlackout(false);
    setLeadsPerMonth(CALC.leadsPerMonth);
    setCommission(CALC.commission);
    setFollowOf10(CALC.followOf10);
  }, []);

  const value = useMemo<TalkCtx>(
    () => ({
      mode,
      setMode,
      total,
      scene,
      setScene,
      next,
      prev,
      blackout,
      toggleBlackout,
      agency,
      setAgency: setAgencyPersist,
      logoUrl,
      presenterPhoto,
      ctaUrl,
      leadsPerMonth,
      setLeadsPerMonth,
      commission,
      setCommission,
      followOf10,
      setFollowOf10,
      resetTalk,
    }),
    [mode, total, scene, setScene, next, prev, blackout, toggleBlackout, agency, setAgencyPersist, logoUrl, presenterPhoto, ctaUrl, leadsPerMonth, commission, followOf10, resetTalk],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTalk() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTalk deve estar dentro de <TalkProvider>");
  return ctx;
}
