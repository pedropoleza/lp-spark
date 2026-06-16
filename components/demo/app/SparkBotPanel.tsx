"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Mic, Paperclip, Sparkles, Play } from "lucide-react";
import { useDemo } from "../demo-context";
import { BOT_SCRIPTS, type BotScript } from "@/content/demo/data";
import { cn } from "@/lib/utils";

type Msg = { id: number; role: "user" | "bot"; kind: "text" | "audio" | "file"; text: string; meta?: string };
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function SparkBotPanel() {
  const { dispatch } = useDemo();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, typing]);

  async function run(script: BotScript) {
    if (busy) return;
    setBusy(true);
    for (const step of script.steps) {
      if (step.role === "bot" && step.kind === "typing") {
        setTyping(true);
        await sleep(step.ms ?? 1000);
        setTyping(false);
        continue;
      }
      if (step.role === "bot" && step.kind === "action") dispatch(step.action);
      const m: Msg = {
        id: idRef.current++,
        role: step.role,
        kind: step.role === "user" ? step.kind : "text",
        text: step.text,
        meta: "meta" in step ? step.meta : undefined,
      };
      setMsgs((prev) => [...prev, m]);
      await sleep(step.role === "user" ? 280 : 560);
    }
    setBusy(false);
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card">
      {/* header */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/15 text-accent">
          <Bot className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-cream">
            SparkBot <Sparkles className="h-3.5 w-3.5 text-accent" />
          </p>
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <i className="h-1.5 w-1.5 rounded-full bg-lime" /> online · opera o Spark por você
          </p>
        </div>
      </div>

      {/* mensagens */}
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {msgs.length === 0 && (
          <p className="mx-auto max-w-[240px] pt-6 text-center text-xs text-muted">
            Diga em português o que precisa. Toque numa sugestão abaixo. 👇
          </p>
        )}
        {msgs.map((m) => (
          <Bubble key={m.id} m={m} />
        ))}
        {typing && (
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-3 py-2.5 w-fit">
            <Dot delay={0} /> <Dot delay={150} /> <Dot delay={300} />
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* chips */}
      <div className="flex flex-wrap gap-2 px-4 pb-2">
        {BOT_SCRIPTS.map((s) => (
          <button
            key={s.id}
            onClick={() => run(s)}
            disabled={busy}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[11px] font-medium transition",
              busy ? "cursor-not-allowed border-white/10 text-muted/50" : "border-accent/40 bg-accent/10 text-accent hover:bg-accent/20",
            )}
          >
            {s.chip}
          </button>
        ))}
      </div>

      {/* composer */}
      <div className="flex items-center gap-2 border-t border-white/10 bg-white/[0.03] px-3 py-3">
        <Paperclip className="h-4 w-4 shrink-0 text-muted" />
        <div className="flex-1 truncate rounded-full border border-white/10 bg-ink/40 px-3 py-2 text-xs text-muted">
          Escreva ou fale com o SparkBot…
        </div>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-ink">
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug",
          isUser ? "rounded-br-sm bg-accent text-ink" : "rounded-bl-sm border border-white/10 bg-white/[0.04] text-cream",
        )}
      >
        {m.kind === "audio" ? (
          <span className="flex items-center gap-2">
            <Play className="h-3.5 w-3.5" />
            <span className="flex items-end gap-0.5">
              {[6, 11, 7, 14, 9, 5, 12, 8].map((h, i) => (
                <i key={i} className="w-0.5 rounded-full bg-current opacity-70" style={{ height: h }} />
              ))}
            </span>
            <span className="text-[10px] opacity-70">{m.meta ?? "0:06"}</span>
          </span>
        ) : m.kind === "file" ? (
          <span className="flex items-center gap-2">
            <Paperclip className="h-3.5 w-3.5" /> {m.text}
          </span>
        ) : (
          m.text
        )}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" style={{ animationDelay: `${delay}ms` }} />;
}
