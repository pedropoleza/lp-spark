"use client";

import { motion } from "framer-motion";
import { TrendingDown, Sparkles } from "lucide-react";
import { TalkSceneFrame, CountUp } from "../bits";
import { useTalk } from "../talk-context";
import { CALC, lossPerYear, fmtUSD } from "@/content/talk/copy";

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-display text-lg font-bold tabular-nums text-cream">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
      />
    </div>
  );
}

export function Calculator() {
  const { leadsPerMonth, setLeadsPerMonth, commission, setCommission, followOf10, setFollowOf10 } = useTalk();
  const loss = lossPerYear(leadsPerMonth, commission, followOf10);
  const recoverable = Math.round(loss * CALC.recoveryRate);

  return (
    <TalkSceneFrame wide label="O custo invisível · use os seus números">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* controles */}
        <div className="space-y-6 rounded-card-lg border border-white/10 bg-white/[0.02] p-6">
          <Slider
            label="Leads por mês"
            value={leadsPerMonth}
            min={CALC.min.leadsPerMonth}
            max={CALC.max.leadsPerMonth}
            step={1}
            onChange={setLeadsPerMonth}
            display={`${leadsPerMonth}`}
          />
          <Slider
            label="Comissão média por venda"
            value={commission}
            min={CALC.min.commission}
            max={CALC.max.commission}
            step={50}
            onChange={setCommission}
            display={fmtUSD(commission)}
          />
          <Slider
            label="De cada 10 leads, quantos você segue até o 5º contato?"
            value={followOf10}
            min={CALC.min.followOf10}
            max={CALC.max.followOf10}
            step={1}
            onChange={setFollowOf10}
            display={`${followOf10} / 10`}
          />
        </div>

        {/* resultado */}
        <div className="text-center">
          <p className="label-mono">Você está deixando na mesa, por ano</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
              <TrendingDown className="h-6 w-6" />
            </span>
            <CountUp
              value={loss}
              format={fmtUSD}
              className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-none text-amber-300"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-7 flex max-w-sm items-center gap-3 rounded-card-lg border border-lime/30 bg-lime/[0.06] p-4 text-left"
          >
            <Sparkles className="h-5 w-5 shrink-0 text-lime" />
            <p className="text-sm text-cream/90">
              Com uma cadência constante, dá pra recuperar perto de{" "}
              <span className="font-bold text-lime">{fmtUSD(recoverable)}/ano</span> disso.
            </p>
          </motion.div>

          <p className="mt-4 text-xs text-muted/70">
            Estimativa ilustrativa (conversão de ~{Math.round(CALC.closeRate * 100)}% com follow-up completo). Ajuste com a realidade da sala.
          </p>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
