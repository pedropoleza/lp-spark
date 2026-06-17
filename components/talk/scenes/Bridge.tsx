"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";

export function Bridge() {
  const { agency } = useTalk();
  return (
    <TalkSceneFrame label="A virada">
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-display font-bold leading-[1.1]"
        style={{ fontSize: "clamp(2rem, 5.2vw, 3.4rem)" }}
      >
        Disciplina é difícil.
        <br className="hidden sm:block" /> <span className="gradient-text">Por isso ela vira sistema.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mx-auto mt-6 max-w-xl text-center text-lg text-muted"
      >
        Ninguém mantém 5 toques, em dezenas de leads, todo mês, na memória. A cadência só funciona
        de verdade quando uma ferramenta carrega ela por você.
      </motion.p>

      {/* prova social: a agência deles já usa */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mx-auto mt-9 flex max-w-xl items-center gap-4 rounded-card-lg border border-accent/25 bg-accent/[0.06] p-5"
      >
        <CheckCircle2 className="h-7 w-7 shrink-0 text-accent" />
        <p className="text-cream">
          A <span className="font-semibold">{agency}</span> já confia no Spark.{" "}
          <span className="text-muted">Agora é a sua vez de usar de verdade.</span>
        </p>
      </motion.div>
    </TalkSceneFrame>
  );
}
