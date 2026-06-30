interface PlanUsageBadgeProps {
  used: number;
  max: number;
  label: string;
}

export function PlanUsageBadge({ used, max, label }: PlanUsageBadgeProps) {
  const isFull = used >= max;
  const isAlmostFull = !isFull && used === max - 1;

  const color = isFull
    ? { dot: "bg-red-500", bar: "bg-red-500", text: "text-red-600", bg: "bg-red-50 border-red-200" }
    : isAlmostFull
    ? { dot: "bg-amber-400", bar: "bg-amber-400", text: "text-amber-600", bg: "bg-amber-50 border-amber-200" }
    : { dot: "bg-emerald-500", bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" };

  return (
    <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${color.bg}`}>
      {/* Dots */}
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i < used ? color.dot : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Separatore */}
      <span className="w-px h-4 bg-current opacity-20" />

      {/* Testo */}
      <div className="flex items-baseline gap-1">
        <span className={`text-base font-black ${color.text}`}>{used}</span>
        <span className="text-xs text-slate-400 font-medium">/ {max} {label}</span>
      </div>

      {isFull && (
        <span className={`text-[10px] font-black uppercase tracking-wider ${color.text}`}>
          Limite
        </span>
      )}
    </div>
  );
}
