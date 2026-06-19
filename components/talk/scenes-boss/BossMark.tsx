/** Wordmark estilizado da BO$$ (cifrões em destaque). Trocar por logo real se vier. */
export function BossMark({ className }: { className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className ?? ""}`}>
      BO<span className="text-accent">$$</span>
    </span>
  );
}
