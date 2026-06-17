"use client";

import { motion } from "framer-motion";
import { Unplug } from "lucide-react";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { SPREADSHEET_BREAKS } from "@/content/talk/copy-org";

export function SpreadsheetBreaks() {
  const { agency } = useTalk();
  const bridge = SPREADSHEET_BREAKS.bridge.replace("[agência]", agency);

  return (
    <TalkSceneFrame label="A virada">
      <h2 className="text-center font-display font-bold leading-[1.12]" style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.7rem)" }}>
        Mas a planilha <span className="gradient-text">não te lembra.</span> Nem fala no WhatsApp.
      </h2>

      <ul className="mx-auto mt-8 max-w-xl space-y-3">
        {SPREADSHEET_BREAKS.limits.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.18 }}
            className="flex gap-3 text-[15px] leading-snug text-muted"
          >
            <Unplug className="mt-0.5 h-4 w-4 shrink-0 text-rose-400/70" />
            <span>{l}</span>
          </motion.li>
        ))}
      </ul>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-7 max-w-xl border-l-2 border-accent pl-4 text-lg text-cream"
      >
        {bridge}
      </motion.p>
    </TalkSceneFrame>
  );
}
