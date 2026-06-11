"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSpark } from "./spark-context";
import { Logo } from "./ui/Logo";

/** Barra fixa inferior no mobile, aparece após scroll e some no footer. */
export function StickyCTA() {
  const { openQuiz } = useSpark();
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const footer = document.querySelector("footer");
      const nearFooter = footer
        ? footer.getBoundingClientRect().top < window.innerHeight + 80
        : false;
      setShow(y > 600 && !nearFooter);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
        >
          <div className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-2 shadow-plan">
            <Logo variant="mark" className="h-8 w-8 shrink-0" />
            <a href="#planos" className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Encontre seu plano ideal</p>
              <p className="text-[11px] text-muted">Ver planos →</p>
            </a>
            <button onClick={openQuiz} className="btn-primary !px-4 !py-2 text-xs">
              Fazer quiz
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
