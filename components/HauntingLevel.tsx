import { Ghost } from "lucide-react";

export function HauntingLevel({
  level,
  label,
}: {
  level: number;
  label?: string;
}) {
  const clamped = Math.min(5, Math.max(1, level));
  return (
    <div className="flex items-center gap-2" aria-label={`${label ?? "Haunting"} ${clamped}/5`}>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Ghost
            key={i}
            className={`h-4 w-4 ${i < clamped ? "text-violet-400 fill-violet-400/25" : "text-white/15"}`}
          />
        ))}
      </div>
      {label && <span className="text-sm text-white/60">{clamped}/5</span>}
    </div>
  );
}
