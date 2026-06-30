"use client";

import { ALLERGENS } from "@/lib/allergens";
import { cn } from "@/lib/utils";

interface AllergenPickerProps {
  selected: string[];
  onChange: (ids: string[]) => void;
}

export function AllergenPicker({ selected, onChange }: AllergenPickerProps) {
  function toggle(id: string) {
    onChange(
      selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
        Allergeni
      </label>
      <div className="flex flex-wrap gap-2">
        {ALLERGENS.map((a) => {
          const active = selected.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              title={a.label}
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold transition-all",
                active
                  ? [a.bg, a.text, a.border, "shadow-sm scale-105"]
                  : "bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600"
              )}
            >
              <span>{a.emoji}</span>
              <span>{a.label}</span>
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="text-[10px] text-slate-400 font-medium">
          {selected.length} allergene{selected.length > 1 ? "i" : ""} selezionato
          {selected.length > 1 ? "i" : ""}
        </p>
      )}
    </div>
  );
}
