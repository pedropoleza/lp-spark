"use client";

import { useState } from "react";
import { MessageCircle, MessageSquare, Mail, Phone, Send, Instagram, PhoneCall } from "lucide-react";
import { CONVERSATIONS } from "@/content/demo/screens";
import { Avatar } from "../Avatar";
import { cn } from "@/lib/utils";

const CH = {
  whatsapp: { icon: MessageCircle, c: "text-lime" },
  sms: { icon: MessageSquare, c: "text-electric" },
  email: { icon: Mail, c: "text-muted" },
  instagram: { icon: Instagram, c: "text-accent" },
  call: { icon: PhoneCall, c: "text-amber-400" },
};

export function Conversations() {
  const [sel, setSel] = useState(CONVERSATIONS[0].id);
  const conv = CONVERSATIONS.find((c) => c.id === sel)!;

  return (
    <div className="grid h-full grid-cols-[260px_1fr_220px] overflow-hidden rounded-xl border border-white/10">
      {/* lista */}
      <div className="overflow-y-auto border-r border-white/10 bg-white/[0.02]">
        {CONVERSATIONS.map((c) => {
          const Ch = CH[c.channel].icon;
          return (
            <button
              key={c.id}
              onClick={() => setSel(c.id)}
              className={cn("flex w-full items-start gap-2.5 border-b border-white/5 px-3 py-3 text-left transition", c.id === sel ? "bg-accent/10" : "hover:bg-white/5")}
            >
              <Avatar name={c.name} src={c.avatar} size={36} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] font-semibold text-cream">{c.name}</span>
                  <span className="shrink-0 text-[10px] text-muted">{c.time}</span>
                </div>
                <p className="truncate text-[11px] text-muted">{c.preview}</p>
              </div>
              <Ch className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", CH[c.channel].c)} />
            </button>
          );
        })}
      </div>

      {/* thread */}
      <div className="flex min-w-0 flex-col bg-ink/40">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <Avatar name={conv.name} src={conv.avatar} size={32} />
          <span className="text-sm font-semibold text-cream">{conv.name}</span>
          <Phone className="ml-auto h-4 w-4 text-muted" />
        </div>
        <div className="flex-1 space-y-2.5 overflow-y-auto px-4 py-4">
          {conv.messages.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px]", m.from === "me" ? "rounded-br-sm bg-accent text-ink" : "rounded-bl-sm border border-white/10 bg-white/[0.04] text-cream")}>
                {m.text}
                <span className={cn("mt-1 block text-[9px]", m.from === "me" ? "text-ink/60" : "text-muted")}>{m.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-3 py-3">
          <div className="flex-1 truncate rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted">Responder…</div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-ink"><Send className="h-4 w-4" /></span>
        </div>
      </div>

      {/* contato */}
      <div className="hidden overflow-y-auto border-l border-white/10 bg-white/[0.02] p-4 lg:block">
        <Avatar name={conv.name} src={conv.avatar} size={56} className="mb-3" />
        <p className="text-sm font-semibold text-cream">{conv.name}</p>
        <p className="mb-3 text-[11px] capitalize text-muted">{conv.channel}</p>
        <span className="inline-flex rounded-md bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">Lead Quente</span>
      </div>
    </div>
  );
}
