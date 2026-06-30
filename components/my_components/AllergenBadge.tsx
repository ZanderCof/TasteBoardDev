import { getAllergen } from "@/lib/allergens";
import { cn } from "@/lib/utils";

interface AllergenBadgeProps {
  allergenId: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function AllergenBadge({ allergenId, size = "md", showLabel = false }: AllergenBadgeProps) {
  const allergen = getAllergen(allergenId);
  if (!allergen) return null;

  return (
    <div
      title={allergen.label}
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-semibold shrink-0",
        allergen.bg,
        allergen.text,
        allergen.border,
        size === "sm"
          ? "w-6 h-6 text-[10px]"
          : "w-8 h-8 text-sm",
        showLabel && "gap-1.5 px-2.5 rounded-full w-auto h-auto py-0.5 text-xs"
      )}
    >
      <span>{allergen.emoji}</span>
      {showLabel && <span className="font-bold">{allergen.label}</span>}
    </div>
  );
}
