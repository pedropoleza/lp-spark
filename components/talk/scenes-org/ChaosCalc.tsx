"use client";

import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { TalkSceneFrame, CountUp } from "../bits";
import { useTalk } from "../talk-context";
import { CALC_ORG, hoursPerYear, costPerYear, fmtUSD } from "@/content/talk/copy-org";

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

export function ChaosCalc() {
  const { chaosHours, setChaosHours, hourlyValue, setHourlyValue } = useTalk();
  const hrs = hoursPerYear(chaosHours);
  const cost = costPerYear(chaosHours, hourlyValue);

  return (
    <TalkSceneFrame wide label="O custo do caos · use os seus números">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* controles */}
        <div className="space-y-6 rounded-card-lg border border-white/10 bg-white/[0.02] p-6">
          <Slider
            label="Horas por semana perdidas procurando / reorganizando"
            value={chaosHours}
            min={CALC_ORG.min.hoursPerWeek}
            max={CALC_ORG.max.hoursPerWeek}
            step={1}
            onChange={setChaosHours}
            display={`${chaosHours}h`}
          />
          <Slider
            label="Quanto vale a sua hora"
            value={hourlyValue}
            min={CALC_ORG.min.hourlyValue}
            max={CALC_ORG.max.hourlyValue}
            step={10}
            onChange={setHourlyValue}
            display={fmtUSD(hourlyValue)}
          />
        </div>

        {/* resultado */}
        <div className="text-center">
          <p className="label-mono">A desorganização te custa, por ano</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
              <Clock className="h-6 w-6" />
            </span>
            <CountUp
              value={hrs}
              format={(n) => `${n.toLocaleString("en-US")}h`}
              className="font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-none text-amber-300"
            />
          </div>
          <p className="mt-2 text-sm text-muted">
            ≈ <CountUp value={cost} format={fmtUSD} className="font-semibold text-cream" /> do seu tempo —
            mais os negócios que escorrem sem você ver.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-7 flex max-w-sm items-center gap-3 rounded-card-lg border border-lime/30 bg-lime/[0.06] p-4 text-left"
          >
            <Sparkles className="h-5 w-5 shrink-0 text-lime" />
            <p className="text-sm text-cream/90">
              Isso são <span className="font-bold text-lime">semanas inteiras</span> por ano que você poderia estar
              vendendo — não caçando informação.
            </p>
          </motion.div>

          <p className="mt-4 text-xs text-muted/70">Estimativa ilustrativa. Ajuste com a realidade da sala.</p>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
