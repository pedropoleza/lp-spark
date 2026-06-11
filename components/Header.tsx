"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { content } from "@/content/pt-br";
import { Logo } from "./ui/Logo";
import { useSpark } from "./spark-context";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Header() {
  const { openQuiz } = useSpark();
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
    setDrawer(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "glass border-b border-white/10" : "border-b border-transparent",
      )}
    >
      <div className="container-spark flex h-16 items-center justify-between">
        <a href="#top" aria-label="Spark Leads" className="flex items-center gap-2.5">
          <Logo variant="mark" className="h-8 w-8" />
          <Logo variant="wordmark" onDark className="hidden h-5 sm:block" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {content.nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button onClick={openQuiz} className="btn-secondary !py-2">
            {content.nav.ctaSecondary}
          </button>
          <button
            onClick={() => {
              trackEvent("hero_cta_clicked", { from: "header" });
              goPlans();
            }}
            className="btn-primary !py-2"
          >
            {content.nav.ctaPrimary}
          </button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 md:hidden"
          aria-label="Abrir menu"
          onClick={() => setDrawer(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Drawer mobile */}
      {drawer && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={() => setDrawer(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col gap-6 border-l border-white/10 bg-graphite p-6">
            <div className="flex items-center justify-between">
              <Logo variant="wordmark" onDark className="h-5" />
              <button
                aria-label="Fechar menu"
                onClick={() => setDrawer(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {content.nav.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setDrawer(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted transition hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <button
                onClick={() => {
                  setDrawer(false);
                  openQuiz();
                }}
                className="btn-secondary w-full"
              >
                {content.nav.ctaSecondary}
              </button>
              <button onClick={goPlans} className="btn-primary w-full">
                {content.nav.ctaPrimary}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
