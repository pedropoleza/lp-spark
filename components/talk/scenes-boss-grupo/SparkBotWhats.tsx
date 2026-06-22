"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Video, Phone, MoreVertical, Plus, Camera, Mic, Sparkles, Sunrise, Clock, CheckCircle2, Moon } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { SPARKBOT_HERO, SPARKBOT_CHAT } from "@/content/talk/copy-boss-grupo";

const MOMENT_ICONS = [Sunrise, Clock, CheckCircle2, Moon];

/** Check duplo "lido" do WhatsApp. */
function ReadTicks() {
  return (
    <svg viewBox="0 0 18 12" className="h-3.5 w-3.5 text-[#53bdeb]" fill="none" aria-hidden>
      <path d="M1 6.5 4 9.5 10 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 9.5 12.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneMock() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [shown, typing]);

  useEffect(() => {
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const wait = (ms: number) => new Promise<void>((res) => (t = setTimeout(res, ms)));
    (async () => {
      await wait(450);
      for (let i = 0; i < SPARKBOT_CHAT.length && alive; i++) {
        const m = SPARKBOT_CHAT[i];
        if (m.from === "bot") {
          setTyping(true);
          await wait(780);
          if (!alive) return;
          setTyping(false);
        }
        setShown(i + 1);
        await wait(m.from === "bot" ? 1050 : 650);
      }
    })();
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-[300px] max-w-full rounded-[2.4rem] border-[6px] border-black bg-black shadow-plan"
    >
      {/* notch */}
      <div className="absolute left-1/2 top-0 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="flex h-[600px] flex-col overflow-hidden rounded-[2rem] bg-[#0b141a]">
        {/* header WhatsApp */}
        <div className="flex items-center gap-2.5 bg-[#1f2c34] px-3 py-2.5">
          <ArrowLeft className="h-5 w-5 text-[#aebac1]" />
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#00a884] text-white">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex-1 leading-tight">
            <p className="text-[15px] font-semibold text-[#e9edef]">SparkBot</p>
            <p className="text-[11px] text-[#8696a0]">{typing ? "digitando…" : "online"}</p>
          </div>
          <Video className="h-5 w-5 text-[#aebac1]" />
          <Phone className="h-[18px] w-[18px] text-[#aebac1]" />
          <MoreVertical className="h-5 w-5 text-[#aebac1]" />
        </div>

        {/* mensagens */}
        <div className="flex-1 space-y-1.5 overflow-y-auto bg-[#0b141a] px-3 py-3" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px)", backgroundSize: "18px 18px" }}>
          <div className="mx-auto my-1 w-fit rounded-md bg-[#1d282f] px-2 py-0.5 text-[10px] font-medium text-[#8696a0]">HOJE</div>
          {SPARKBOT_CHAT.slice(0, shown).map((m, i) => {
            const isBot = m.from === "bot";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${isBot ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`relative max-w-[82%] rounded-lg px-2.5 py-1.5 text-[13.5px] leading-snug text-[#e9edef] shadow-sm ${
                    isBot ? "rounded-tl-sm bg-[#1f2c34]" : "rounded-tr-sm bg-[#005c4b]"
                  }`}
                >
                  <span>{m.text}</span>
                  <span className="float-right ml-2 mt-1 flex items-center gap-1 text-[10px] text-[#8696a0]">
                    {m.time} {!isBot && <ReadTicks />}
                  </span>
                </div>
              </motion.div>
            );
          })}
          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg rounded-tl-sm bg-[#1f2c34] px-3 py-2.5">
                {[0, 1, 2].map((d) => (
                  <i key={d} className="typing-dot h-1.5 w-1.5 rounded-full bg-[#8696a0]" />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* barra de input */}
        <div className="flex items-center gap-2 bg-[#0b141a] px-2 py-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[#1f2c34] px-3 py-2">
            <Plus className="h-5 w-5 text-[#8696a0]" />
            <span className="flex-1 text-[13px] text-[#8696a0]">Mensagem</span>
            <Camera className="h-[18px] w-[18px] text-[#8696a0]" />
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#00a884] text-white">
            <Mic className="h-5 w-5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SparkBotWhats() {
  return (
    <TalkSceneFrame wide label={SPARKBOT_HERO.eyebrow}>
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.7rem, 4.4vw, 2.7rem)" }}>
        O SparkBot não espera. <span className="gradient-text">Ele te procura.</span>
      </h2>

      <div className="mx-auto mt-7 grid max-w-4xl items-center gap-8 md:grid-cols-2">
        {/* momentos do dia */}
        <div className="order-2 space-y-3 md:order-1">
          {SPARKBOT_HERO.moments.map((m, i) => {
            const Icon = MOMENT_ICONS[i] ?? Clock;
            return (
              <motion.div
                key={m.when}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
                className="flex gap-3 rounded-card-lg border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-cream">{m.when}</p>
                  <p className="text-[13px] leading-snug text-muted">{m.what}</p>
                </div>
              </motion.div>
            );
          })}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="border-l-2 border-accent pl-4 text-[15px] font-semibold text-cream"
          >
            {SPARKBOT_HERO.punch}
          </motion.p>
        </div>

        {/* o WhatsApp */}
        <div className="order-1 md:order-2">
          <PhoneMock />
        </div>
      </div>
    </TalkSceneFrame>
  );
}
