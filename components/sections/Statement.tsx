"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "../ui/primitives";
import { Logo } from "../ui/Logo";

/**
 * Momento bold de marca: faixa full-bleed teal com uma afirmação grande,
 * fechando a demo do SparkBot e empurrando para os planos.
 */
export function Statement() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-accent py-24 text-ink sm:py-32">
      {/* watermark da marca */}
      <Logo
        variant="mark"
        className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 opacity-[0.12] mix-blend-multiply"
      />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.06]" />

      <Container className="relative">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="font-mono text-xs uppercase tracking-[0.32em] text-ink/70"
        >
          O SparkBot já fez o trabalho
        </motion.p>

        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-4xl font-display font-bold leading-[0.95] tracking-tight text-ink/80"
          style={{ fontSize: "clamp(2.7rem, 7.5vw, 5.6rem)" }}
        >
          Menos planilha.{" "}
          <span className="text-ink underline decoration-ink/25 decoration-[6px] underline-offset-[8px]">
            Mais cliente fechado.
          </span>
        </motion.h2>

        <p className="mt-6 max-w-xl text-lg text-ink/80">
          Escolha o plano e o Spark coloca seu CRM, o follow-up automático e o SparkBot pra rodar —
          hoje.
        </p>

        <a
          href="#planos"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:gap-3.5"
        >
          Ver os planos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Container>
    </section>
  );
}
