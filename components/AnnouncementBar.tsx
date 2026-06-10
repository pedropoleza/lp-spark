"use client";

import { content } from "@/content/pt-br";
import { useSpark } from "./spark-context";

export function AnnouncementBar() {
  const { openQuiz } = useSpark();
  return (
    <button
      onClick={openQuiz}
      className="group relative hidden w-full items-center justify-center gap-2 overflow-hidden border-b border-white/10 px-4 py-2 text-center text-xs text-cream/90 transition sm:flex"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,122,26,0.14), rgba(47,107,255,0.14))",
      }}
    >
      <span className="text-muted">{content.announcement.text}</span>
      <span className="font-semibold text-spark transition group-hover:translate-x-0.5">
        {content.announcement.cta}
      </span>
    </button>
  );
}
