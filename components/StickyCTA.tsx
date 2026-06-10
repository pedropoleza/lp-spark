"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSpark } from "./spark-context";

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
          <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3 shadow-plan">
            <div>
              <p className="text-sm font-semibold">Encontre seu plano ideal</p>
              <a href="#planos" className="text-[11px] text-muted underline-offset-2 hover:underline">
                Ver planos
              </a>
            </div>
            <button onClick={openQuiz} className="btn-primary !px-4 !py-2 text-xs">
              Fazer quiz
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
