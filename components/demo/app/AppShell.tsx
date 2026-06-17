"use client";

import { useState } from "react";
import {
  Zap,
  Search,
  LayoutDashboard,
  MessagesSquare,
  Columns3,
  Users,
  Calendar,
  Workflow,
  Sparkles,
  Bell,
  ChevronDown,
  Info,
  X,
  type LucideIcon,
} from "lucide-react";
import { useDemo } from "../demo-context";
import { MODULE_INFO } from "@/content/demo/plans-features";
import { cn } from "@/lib/utils";

export type ScreenId = "dashboard" | "conversations" | "funil" | "contacts" | "calendars" | "automation" | "ai";

const NAV: { id: ScreenId; label: string; icon: LucideIcon; live?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, live: true },
  { id: "conversations", label: "Conversations", icon: MessagesSquare, live: true },
  { id: "funil", label: "Opportunities", icon: Columns3, live: true },
  { id: "contacts", label: "Contacts", icon: Users, live: true },
  { id: "calendars", label: "Calendars", icon: Calendar, live: true },
  { id: "automation", label: "Automation", icon: Workflow, live: true },
  { id: "ai", label: "AI Hub · SparkBot", icon: Sparkles, live: true },
];

const TITLES: Record<ScreenId, string> = {
  dashboard: "Visão geral",
  conversations: "Conversas",
  funil: "Funil de vendas",
  contacts: "Contatos",
  calendars: "Agendamentos",
  automation: "Automações",
  ai: "SparkBot",
};

/** Moldura fiel do app: sidebar + topbar. `live` = telas clicáveis nesta demo. */
export function AppShell({ active, onNavigate, children }: { active: ScreenId; onNavigate: (id: ScreenId) => void; children: React.ReactNode }) {
  const { store } = useDemo();
  const [info, setInfo] = useState(false);
  const mod = MODULE_INFO[active];
  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-plan">
      {/* sidebar */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-white/10 bg-white/[0.02] md:flex">
        <div className="flex items-center gap-2 px-4 py-4">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-ink">
            <Zap className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-bold text-cream">Spark Leads</span>
        </div>

        <button className="mx-3 mb-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left">
          <span className="min-w-0">
            <span className="block truncate text-[12px] font-semibold text-cream">Marcos Almeida</span>
            <span className="block text-[10px] text-muted">Orlando, FL</span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>

        <div className="mx-3 mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-ink/50 px-2.5 py-1.5 text-[11px] text-muted">
          <Search className="h-3.5 w-3.5" /> Buscar
          <span className="ml-auto rounded border border-white/10 px-1 font-mono text-[10px]">⌘K</span>
        </div>

        <nav className="flex-1 space-y-0.5 px-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.live && onNavigate(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition",
                  isActive ? "bg-accent/15 font-medium text-accent" : item.live ? "text-cream/80 hover:bg-white/5" : "cursor-default text-muted/50",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="px-4 py-3 text-[10px] text-muted/60">
          <p>Web · iPad · iPhone · WhatsApp</p>
          <p>Demo · dados ilustrativos</p>
        </div>
      </aside>

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3">
          <h3 className="text-sm font-semibold text-cream">{TITLES[active]}</h3>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setInfo((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition",
                info ? "border-accent bg-accent/15 text-accent" : "border-white/10 text-muted hover:text-cream",
              )}
            >
              <Info className="h-3.5 w-3.5" /> O que faz
            </button>
            <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Ask AI
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-muted">
              <Calendar className="h-3.5 w-3.5" /> Hoje
              <span className="rounded-full bg-accent/20 px-1.5 font-semibold text-accent">{store.agenda.length}</span>
            </span>
            <Bell className="h-4 w-4 text-muted" />
            <span className="grid h-7 w-7 place-items-center rounded-full bg-electric/20 text-[11px] font-semibold text-electric">MA</span>
          </div>
        </header>
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="h-full overflow-hidden p-4">{children}</div>
          {info && mod && (
            <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto border-l border-white/10 bg-card/95 p-4 backdrop-blur">
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-cream">{mod.title}</p>
                <button onClick={() => setInfo(false)} aria-label="Fechar" className="text-muted hover:text-cream">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="space-y-2.5">
                {mod.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[13px] leading-snug text-cream/85">
                    <i className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
