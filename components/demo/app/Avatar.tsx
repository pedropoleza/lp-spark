"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Avatar com foto gerada (webp) e fallback pra monograma se faltar/erro. */
export function Avatar({ name, src, size = 36, className }: { name: string; src?: string; size?: number; className?: string }) {
  const [err, setErr] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (src && !err) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${BP}/demo/avatars/${src}.webp`}
        alt={name}
        onError={() => setErr(true)}
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center rounded-full bg-accent/15 font-semibold text-accent", className)}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </span>
  );
}
