import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/* eslint-disable @next/next/no-img-element */

type Props = {
  /** "mark" = símbolo redondo; "wordmark" = logotipo Spark Leads. */
  variant?: "mark" | "wordmark";
  /** true quando aplicado sobre fundo escuro (escolhe o wordmark de script branco). */
  onDark?: boolean;
  className?: string;
};

/**
 * Logo da Spark, theme-aware.
 * - mark  → /brand/mark.png (símbolo redondo "K")
 * - wordmark → script branco (onDark) ou escuro (fundo claro)
 */
export function Logo({ variant = "wordmark", onDark = true, className }: Props) {
  if (variant === "mark") {
    return (
      <img
        src={asset("/brand/mark.webp")}
        alt="Spark Leads"
        width={512}
        height={513}
        className={cn("h-auto w-auto select-none", className)}
        draggable={false}
      />
    );
  }
  const src = asset(onDark ? "/brand/wordmark-light.webp" : "/brand/wordmark-dark.webp");
  return (
    <img
      src={src}
      alt="Spark Leads"
      width={1100}
      height={236}
      className={cn("h-auto w-auto select-none", className)}
      draggable={false}
    />
  );
}
