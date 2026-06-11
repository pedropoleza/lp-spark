"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { content } from "@/content/pt-br";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { Container, Section, SectionHeading } from "./ui/primitives";

export function FAQAccordion() {
  const { openQuiz } = useSpark();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      ambient
      reaction={{
        clip: "/bot/bot-voice",
        caption: "Ficou com dúvida? É só perguntar — eu respondo.",
        blend: true,
        side: "right",
      }}
    >
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading label="FAQ" title="Perguntas frequentes" />
          {/* Área de suporte */}
          <div className="mt-8 card-spark p-5">
            <h3 className="font-display text-lg font-bold">Precisa de ajuda para escolher?</h3>
            <p className="mt-2 text-sm text-muted">
              Se você ainda estiver em dúvida entre Growth e Agency, fale com a equipe e escolha com
              mais segurança.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={content.thankYou.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !py-2 text-xs"
              >
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
              <button onClick={openQuiz} className="btn-primary !py-2 text-xs">
                Fazer quiz
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {content.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-card border border-white/10 bg-card/40">
                <button
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    if (!isOpen) trackEvent("faq_opened", { question: item.q });
                  }}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
