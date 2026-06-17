"use client";

import { motion } from "framer-motion";
import { TalkSceneFrame } from "../bits";
import { useTalk } from "../talk-context";
import { FOUNDER, PRESENTER } from "@/content/talk/copy";

/* eslint-disable @next/next/no-img-element */

export function Founder() {
  const { presenterPhoto } = useTalk();

  return (
    <TalkSceneFrame wide label={FOUNDER.eyebrow}>
      <div className="grid items-center gap-10 md:grid-cols-[auto,1fr]">
        {/* retrato */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-accent/20 blur-xl" />
            <div className="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full border border-accent/30 bg-white/[0.04] sm:h-44 sm:w-44">
              {presenterPhoto ? (
                <img src={presenterPhoto} alt={PRESENTER.name} className="h-full w-full object-cover" draggable={false} />
              ) : (
                <span className="font-display text-5xl font-bold text-accent/80">{PRESENTER.initials}</span>
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-cream">{PRESENTER.name}</p>
            <p className="text-sm text-accent">{PRESENTER.role}</p>
          </div>
        </motion.div>

        {/* história */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-[1.18]"
          >
            “{FOUNDER.lead}”
          </motion.p>

          <ul className="mt-6 space-y-3.5">
            {FOUNDER.beats.map((b, i) => (
              <motion.li
                key={b.strong}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.25 }}
                className="flex gap-3"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-[15px] leading-snug text-muted">
                  <span className="font-semibold text-cream">{b.strong}</span> {b.rest}
                </p>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-6 border-l-2 border-accent pl-4 text-lg font-semibold text-cream"
          >
            {FOUNDER.punch}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="mt-4 text-sm text-muted"
          >
            {FOUNDER.hook}
          </motion.p>
        </div>
      </div>
    </TalkSceneFrame>
  );
}
