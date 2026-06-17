"use client";

import { motion } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { cn } from "@/lib/utils";

const TOUCHES = [1, 2, 3, 4, 5, 6, 7];

export function Gap() {
  return (
    <TalkSceneFrame label="A lacuna">
      <h2 className="text-center font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(1.8rem, 4.6vw, 3rem)" }}>
        Existe um vão entre onde você <span className="text-amber-300">para</span> e onde a venda{" "}
        <span className="gradient-text">acontece.</span>
      </h2>

      <div className="mx-auto mt-12 max-w-2xl">
        {/* régua de toques */}
        <div className="flex items-end justify-between gap-2">
          {TOUCHES.map((t, i) => {
            const stopZone = t <= 2;
            const moneyZone = t >= 5;
            const h = 30 + i * 16; // sobe da esquerda pra direita (conversão acumulada)
            return (
              <div key={t} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: h, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "w-full rounded-t-md",
                    stopZone ? "bg-amber-400/30" : moneyZone ? "bg-lime/70" : "bg-white/10",
                  )}
                  style={{ height: h }}
                />
                <span className={cn("text-xs tabular-nums", moneyZone ? "text-lime" : stopZone ? "text-amber-300" : "text-muted")}>{t}º</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="rounded-card-lg border border-amber-400/25 bg-amber-400/[0.05] p-4 text-center"
          >
            <p className="font-display text-sm font-bold text-amber-300">Onde a maioria para</p>
            <p className="mt-1 text-xs text-muted">Toques 1 e 2. Cansa, esquece, segue pro próximo lead.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="rounded-card-lg border border-lime/30 bg-lime/[0.06] p-4 text-center"
          >
            <p className="font-display text-sm font-bold text-lime">A zona do dinheiro</p>
            <p className="mt-1 text-xs text-muted">Do 5º toque em diante. Quase ninguém chega — e é aqui que se fecha.</p>
          </motion.div>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
