"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Trophy,
  Medal,
  Target,
  ArrowRight,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  Sparkles,
  PartyPopper,
  Share2,
  Loader2,
} from "lucide-react";
import {
  TEAMS,
  teamById,
  SCORING,
  PRIZES,
  TIEBREAK,
  COPA_COPY,
  copaSubmissionSchema,
  type Team,
} from "@/content/copa";

import { Confetti } from "./Confetti";
import { FestiveBackdrop, Bunting } from "./FestiveBackdrop";

/** Número que recebe os palpites no WhatsApp (786-627-6787, formato EUA). */
const WHATSAPP_TO = "17866276787";

/** Formata o telefone no padrão americano: (786) 627-6787. */
function formatUSPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
const phoneDigits = (value: string) => value.replace(/\D/g, "");

type StepKey = "intro" | "dados" | "champion" | "vice" | "third" | "score" | "review" | "done";
const FLOW: StepKey[] = ["intro", "dados", "champion", "vice", "third", "score", "review", "done"];

const ease = [0.16, 1, 0.3, 1] as const;

export function CopaExperience() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<StepKey>("intro");
  const [fire, setFire] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [champion, setChampion] = useState<string | null>(null);
  const [vice, setVice] = useState<string | null>(null);
  const [third, setThird] = useState<string | null>(null);
  const [scoreC, setScoreC] = useState(1);
  const [scoreV, setScoreV] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState("");

  const idx = FLOW.indexOf(step);
  const progress = step === "done" ? 1 : idx / (FLOW.length - 2);
  const boom = () => setFire((n) => n + 1);

  function go(next: StepKey) {
    setError(null);
    setStep(next);
  }

  const dadosOk =
    name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && phoneDigits(phone).length === 10;

  /** Monta a mensagem do WhatsApp com todos os palpites preenchidos. */
  function buildWhatsAppUrl() {
    const c = teamById(champion);
    const v = teamById(vice);
    const t = teamById(third);
    const message = [
      `${COPA_COPY.league} ${COPA_COPY.tournament}`,
      `Palpite de ${name}`,
      ``,
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      ``,
      `Campeão: ${c?.flag ?? ""} ${c?.name ?? ""}`,
      `Vice-campeão: ${v?.flag ?? ""} ${v?.name ?? ""}`,
      `Terceiro lugar: ${t?.flag ?? ""} ${t?.name ?? ""}`,
      `Placar da final: ${c?.name ?? ""} ${scoreC} a ${scoreV} ${v?.name ?? ""}`,
    ].join("\n");
    return `https://wa.me/${WHATSAPP_TO}?text=${encodeURIComponent(message)}`;
  }

  function submit() {
    const payload = {
      name,
      email,
      phone,
      champion: champion ?? "",
      runnerUp: vice ?? "",
      third: third ?? "",
      scoreChampion: scoreC,
      scoreRunnerUp: scoreV,
    };
    const parsed = copaSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Confira os palpites.");
      return;
    }
    const url = buildWhatsAppUrl();
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    boom();
    go("done");
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden text-white">
      <FestiveBackdrop />
      <Bunting />
      <Confetti fire={fire} continuous={step === "done"} />

      {/* barra de progresso */}
      {step !== "intro" && step !== "done" && (
        <div className="fixed inset-x-0 top-[18px] z-30 mx-auto h-1 max-w-md rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-[#FFD23F]"
            animate={{ width: `${Math.round(progress * 100)}%` }}
            transition={{ ease, duration: 0.5 }}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-5 pb-12 pt-12 sm:px-6">
        <AnimatePresence mode="wait">
          {/* ---------------------------------------------------------- INTRO */}
          {step === "intro" && (
            <motion.section
              key="intro"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -20 }}
              transition={{ ease, duration: 0.5 }}
              className="flex flex-1 flex-col items-center text-center"
            >
              <motion.div
                animate={reduce ? undefined : { rotate: [0, -8, 8, 0], y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl"
              >
                ⚽
              </motion.div>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FFD23F]/40 bg-[#FFD23F]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#FFD23F]">
                <Sparkles className="h-3.5 w-3.5" /> {COPA_COPY.tournament}
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">
                {COPA_COPY.league} <span className="text-[#FFD23F]">do Bolão</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base text-white/80">{COPA_COPY.hook}</p>

              {/* pontuação */}
              <div className="mt-7 grid w-full grid-cols-2 gap-3">
                {SCORING.map((s) => (
                  <div
                    key={s.key}
                    className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-left backdrop-blur-sm"
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold leading-tight">{s.label}</span>
                      <span className="text-xs font-bold text-[#FFD23F]">+{s.points} pts</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* prêmios */}
              <div className="mt-4 w-full rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm">
                <p className="mb-3 text-sm font-semibold text-white/90">
                  Os 3 melhores levam desconto na mensalidade 🎁
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {PRIZES.map((p) => (
                    <div
                      key={p.place}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-center"
                      style={{ boxShadow: `inset 0 0 0 1px ${p.glow}22` }}
                    >
                      <div className="text-2xl">{p.medal}</div>
                      <div className="mt-1 text-xs font-bold" style={{ color: p.glow }}>
                        {p.prize}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  boom();
                  go("dados");
                }}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFD23F] px-7 py-4 text-lg font-extrabold text-[#072218] transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
              >
                {COPA_COPY.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 text-xs text-white/50">{TIEBREAK}</p>
            </motion.section>
          )}

          {/* ---------------------------------------------------------- DADOS */}
          {step === "dados" && (
            <StepShell
              key="dados"
              reduce={reduce}
              icon={<PartyPopper className="h-6 w-6 text-[#FFD23F]" />}
              title="Bora começar!"
              subtitle={COPA_COPY.formIntro}
            >
              <div className="space-y-3">
                <Field label="Seu nome">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome completo"
                    className="input-festive"
                    autoFocus
                  />
                </Field>
                <Field label="E-mail">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    inputMode="email"
                    placeholder="voce@email.com"
                    className="input-festive"
                  />
                </Field>
                <Field label="Telefone (EUA)">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(formatUSPhone(e.target.value))}
                    type="tel"
                    inputMode="tel"
                    placeholder="(786) 627-6787"
                    className="input-festive"
                  />
                </Field>
              </div>
              <NavRow
                onBack={() => go("intro")}
                onNext={() => go("champion")}
                nextLabel="Ir pros palpites"
                disabled={!dadosOk}
              />
            </StepShell>
          )}

          {/* ------------------------------------------------------- CAMPEÃO */}
          {step === "champion" && (
            <StepShell
              key="champion"
              reduce={reduce}
              icon={<Trophy className="h-6 w-6 text-[#FFD23F]" />}
              title="Quem é o campeão? 🏆"
              subtitle="A seleção que levanta a taça da Copa do Mundo."
            >
              <TeamGrid
                selected={champion}
                onPick={(id) => {
                  setChampion(id);
                  if (vice === id) setVice(null);
                  if (third === id) setThird(null);
                  boom();
                  setTimeout(() => go("vice"), reduce ? 0 : 260);
                }}
              />
              <NavRow onBack={() => go("dados")} hideNext />
            </StepShell>
          )}

          {/* ----------------------------------------------------------- VICE */}
          {step === "vice" && (
            <StepShell
              key="vice"
              reduce={reduce}
              icon={<Medal className="h-6 w-6 text-[#D8DEE6]" />}
              title="E o vice-campeão? 🥈"
              subtitle="A outra seleção que chega na final com o seu campeão."
            >
              <TeamGrid
                selected={vice}
                disabledIds={[champion]}
                onPick={(id) => {
                  setVice(id);
                  if (third === id) setThird(null);
                  setTimeout(() => go("third"), reduce ? 0 : 220);
                }}
              />
              <NavRow onBack={() => go("champion")} hideNext />
            </StepShell>
          )}

          {/* --------------------------------------------------------- TERCEIRO */}
          {step === "third" && (
            <StepShell
              key="third"
              reduce={reduce}
              icon={<Medal className="h-6 w-6 text-[#E59A52]" />}
              title="Terceiro lugar? 🥉"
              subtitle="Quem vence a disputa de 3º lugar."
            >
              <TeamGrid
                selected={third}
                disabledIds={[champion, vice]}
                onPick={(id) => {
                  setThird(id);
                  setTimeout(() => go("score"), reduce ? 0 : 220);
                }}
              />
              <NavRow onBack={() => go("vice")} hideNext />
            </StepShell>
          )}

          {/* ----------------------------------------------------------- PLACAR */}
          {step === "score" && (
            <StepShell
              key="score"
              reduce={reduce}
              icon={<Target className="h-6 w-6 text-[#FFD23F]" />}
              title="Placar exato da final 🎯"
              subtitle="O que mais vale pontos! Cravar o placar da decisão."
            >
              <ScoreBoard
                champion={teamById(champion)}
                vice={teamById(vice)}
                scoreC={scoreC}
                scoreV={scoreV}
                setScoreC={setScoreC}
                setScoreV={setScoreV}
              />
              <NavRow onBack={() => go("third")} onNext={() => go("review")} nextLabel="Revisar palpite" />
            </StepShell>
          )}

          {/* ----------------------------------------------------------- REVIEW */}
          {step === "review" && (
            <StepShell
              key="review"
              reduce={reduce}
              icon={<Check className="h-6 w-6 text-[#0E7A4B]" />}
              title="Confere se está tudo certo 👀"
              subtitle="Ao confirmar, abre o WhatsApp com o seu palpite pronto. É só apertar enviar."
            >
              <Podium champion={teamById(champion)} vice={teamById(vice)} third={teamById(third)} />
              <div className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-3 text-center">
                <Target className="h-4 w-4 text-[#FFD23F]" />
                <span className="text-sm font-semibold">
                  Final: {teamById(champion)?.name} {scoreC} <span className="text-white/50">x</span>{" "}
                  {scoreV} {teamById(vice)?.name}
                </span>
              </div>
              {error && (
                <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-center text-sm text-red-200">
                  {error}
                </p>
              )}
              <NavRow onBack={() => go("score")} onNext={submit} nextLabel="Enviar no WhatsApp 🎉" />
            </StepShell>
          )}

          {/* ------------------------------------------------------------- DONE */}
          {step === "done" && (
            <motion.section
              key="done"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease, duration: 0.5 }}
              className="flex flex-1 flex-col items-center justify-center text-center"
            >
              <motion.div
                animate={reduce ? undefined : { scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl"
              >
                🏆
              </motion.div>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight">
                {COPA_COPY.successTitle}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-white/80">{COPA_COPY.successSub}</p>

              <div className="mt-6 w-full max-w-sm rounded-2xl border border-white/15 bg-white/[0.06] p-4">
                <Podium
                  compact
                  champion={teamById(champion)}
                  vice={teamById(vice)}
                  third={teamById(third)}
                />
                <p className="mt-3 text-sm font-semibold text-[#FFD23F]">
                  Final: {teamById(champion)?.name} {scoreC} x {scoreV} {teamById(vice)?.name}
                </p>
              </div>

              <a
                href={waUrl || buildWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-[#072218] transition-transform hover:scale-105"
              >
                <Share2 className="h-4 w-4" /> Abrir o WhatsApp e enviar
              </a>
              <p className="mt-3 max-w-xs text-xs text-white/50">
                Se o WhatsApp não abriu sozinho, toque no botão acima. O seu palpite só conta depois
                que a mensagem for enviada.
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* estilos do tema festivo (escopo local) */}
      <style jsx global>{`
        .input-festive {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          padding: 0.85rem 1rem;
          font-size: 16px;
          color: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-festive::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }
        .input-festive:focus {
          border-color: #ffd23f;
          box-shadow: 0 0 0 3px rgba(255, 210, 63, 0.25);
        }
      `}</style>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Subcomponentes                                                     */
/* ------------------------------------------------------------------ */

function StepShell({
  reduce,
  icon,
  title,
  subtitle,
  children,
}: {
  reduce: boolean | null;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? undefined : { opacity: 0, x: -24 }}
      transition={{ ease, duration: 0.4 }}
      className="flex flex-1 flex-col"
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/[0.06]">
          {icon}
        </span>
        <h2 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <p className="mb-5 text-sm text-white/70">{subtitle}</p>
      {children}
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/60">
        {label}
      </span>
      {children}
    </label>
  );
}

function TeamGrid({
  selected,
  disabledIds = [],
  onPick,
}: {
  selected: string | null;
  disabledIds?: (string | null)[];
  onPick: (id: string) => void;
}) {
  const disabled = useMemo(() => new Set(disabledIds.filter(Boolean) as string[]), [disabledIds]);
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {TEAMS.map((t) => {
        const isOut = disabled.has(t.id);
        const isSel = selected === t.id;
        return (
          <motion.button
            key={t.id}
            type="button"
            disabled={isOut}
            onClick={() => onPick(t.id)}
            whileTap={isOut ? undefined : { scale: 0.95 }}
            className={`relative flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-colors ${
              isOut
                ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-35"
                : isSel
                  ? "border-[#FFD23F] bg-white/[0.12]"
                  : "border-white/12 bg-white/[0.06] hover:border-white/30"
            }`}
            style={isSel ? { boxShadow: `0 0 0 2px #FFD23F, 0 8px 26px -8px ${t.color}` } : undefined}
          >
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xl"
              style={{ background: `${t.color}26` }}
            >
              {t.flag}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold leading-tight">{t.name}</span>
              <span className="block truncate text-[11px] text-white/55">{t.country}</span>
            </span>
            {isSel && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#FFD23F] text-[#072218]">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function ScoreBoard({
  champion,
  vice,
  scoreC,
  scoreV,
  setScoreC,
  setScoreV,
}: {
  champion?: Team;
  vice?: Team;
  scoreC: number;
  scoreV: number;
  setScoreC: (n: number) => void;
  setScoreV: (n: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-5">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <ScoreSide team={champion} value={scoreC} set={setScoreC} crown />
        <span className="pb-6 font-display text-2xl font-black text-white/40">×</span>
        <ScoreSide team={vice} value={scoreV} set={setScoreV} />
      </div>
      <p className="mt-4 text-center text-xs text-white/50">
        Pode cravar empate. Quem decide nos pênaltis é o seu campeão. 😉
      </p>
    </div>
  );
}

function ScoreSide({
  team,
  value,
  set,
  crown,
}: {
  team?: Team;
  value: number;
  set: (n: number) => void;
  crown?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="grid h-14 w-14 place-items-center rounded-2xl text-3xl"
        style={{ background: `${team?.color ?? "#888"}26` }}
      >
        {team?.flag ?? "🏳️"}
      </span>
      <span className="mt-2 line-clamp-1 text-center text-xs font-bold">
        {crown && "👑 "}
        {team?.name ?? "?"}
      </span>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => set(Math.max(0, value - 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/[0.06] active:scale-90"
          aria-label="menos um gol"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center font-display text-3xl font-black tabular-nums">{value}</span>
        <button
          type="button"
          onClick={() => set(Math.min(30, value + 1))}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/[0.06] active:scale-90"
          aria-label="mais um gol"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Podium({
  champion,
  vice,
  third,
  compact,
}: {
  champion?: Team;
  vice?: Team;
  third?: Team;
  compact?: boolean;
}) {
  const rows = [
    { medal: "🥇", label: "Campeão", team: champion, color: "#FFD23F" },
    { medal: "🥈", label: "Vice-campeão", team: vice, color: "#D8DEE6" },
    { medal: "🥉", label: "Terceiro lugar", team: third, color: "#E59A52" },
  ];
  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-3 py-2.5"
        >
          <span className="text-2xl">{r.medal}</span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xl" style={{ background: `${r.team?.color ?? "#888"}26` }}>
            {r.team?.flag ?? "🏳️"}
          </span>
          <span className="min-w-0">
            {!compact && (
              <span className="block text-[11px] font-semibold uppercase tracking-wide" style={{ color: r.color }}>
                {r.label}
              </span>
            )}
            <span className="block truncate text-sm font-bold">{r.team?.name ?? "?"}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function NavRow({
  onBack,
  onNext,
  nextLabel = "Continuar",
  disabled,
  loading,
  hideNext,
}: {
  onBack: () => void;
  onNext?: () => void;
  nextLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  hideNext?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/5"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>
      {!hideNext && onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disabled || loading}
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FFD23F] px-6 py-3 text-base font-extrabold text-[#072218] transition-transform enabled:hover:scale-[1.02] enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {nextLabel}
          {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
        </button>
      )}
    </div>
  );
}
