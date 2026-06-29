"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** dispara uma nova rajada toda vez que esse valor muda */
  fire: number;
  /** rajada contínua e suave (ex.: tela de sucesso) */
  continuous?: boolean;
};

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  shape: 0 | 1; // 0 retângulo, 1 círculo
  life: number;
};

const COLORS = ["#FFD23F", "#00A4CD", "#0E7A4B", "#E10600", "#FFFFFF", "#F7B5CD", "#FDE100"];

export function Confetti({ fire, continuous = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (n: number, fromTop = false) => {
      const w = window.innerWidth;
      for (let i = 0; i < n; i++) {
        piecesRef.current.push({
          x: fromTop ? Math.random() * w : w / 2 + (Math.random() - 0.5) * 220,
          y: fromTop ? -20 : window.innerHeight * 0.32,
          vx: (Math.random() - 0.5) * (fromTop ? 3 : 12),
          vy: fromTop ? 2 + Math.random() * 3 : -7 - Math.random() * 9,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          size: 6 + Math.random() * 7,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: Math.random() > 0.5 ? 1 : 0,
          life: 1,
        });
      }
    };

    spawn(160);
    let lastDrip = 0;

    const tick = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (continuous && t - lastDrip > 220) {
        spawn(6, true);
        lastDrip = t;
      }
      const arr = piecesRef.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i];
        p.vy += 0.22; // gravidade
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y > window.innerHeight + 40) {
          arr.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 1) {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
        }
        ctx.restore();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      piecesRef.current = [];
    };
    // re-monta/rajada quando `fire` muda
  }, [fire, continuous]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
