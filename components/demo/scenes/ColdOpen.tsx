"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { SceneFrame } from "../SceneFrame";
import { useDemo } from "../demo-context";

const bubbles = [
  "Bom dia, Marcos ☀️ Já organizei o seu dia.",
  "Hoje: 10h João Bittencourt · 16h revisão da Família Oliveira.",
  "Uma coisa: o Pedro Lima tá parado há 5 dias. Quer que eu reative agora?",
];

export function ColdOpen() {
  const { next, mode } = useDemo();
  return (
    <SceneFrame hint="Use as setas ← → para navegar">
      <div className="grid items-center gap-10 md:grid-cols-2">
        {/* telefone */}
        <motion.div
          initial={{ opacity: 0, y: 26, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-[290px] rounded-[2.2rem] border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-2.5 shadow-plan"
        >
          <div className="overflow-hidden rounded-[1.7rem] bg-ink">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/15 text-accent">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-cream">SparkBot</p>
                <p className="flex items-center gap-1 text-[10px] text-muted">
                  <i className="h-1.5 w-1.5 rounded-full bg-lime" /> agora
                </p>
              </div>
            </div>
            <div className="space-y-2 px-3 py-4">
              {bubbles.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-[88%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.05] px-3 py-2 text-[12.5px] leading-snug text-cream"
                >
                  {b}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.9, duration: 0.4 }}
                className="ml-auto max-w-[60%] rounded-2xl rounded-br-sm bg-accent px-3 py-2 text-right text-[12.5px] text-ink"
              >
                pode reativar 👍
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* texto */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="label-mono"
          >
            08:02 · segunda-feira
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-3 font-display font-bold leading-[1.04]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)" }}
          >
            São 8h. Seu assistente <span className="gradient-text">já trabalhou.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            className="mt-4 max-w-md text-lg text-muted"
          >
            Antes de você abrir o computador, o Spark já organizou sua agenda e reativou um lead que
            ia esfriar. <span className="text-cream">Isso é o fim da demo — vou te mostrar como chega aqui.</span>
          </motion.p>

          {mode === "solo" && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={next}
              className="btn-primary mt-7"
            >
              Quero ver como funciona
            </motion.button>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}
