"use client";
import { Utensils, Coffee, Beer, Pizza } from "lucide-react";
import { cn } from "@/lib/utils";

// DEFINIZIONE DELLE PROPS
interface StepTypeProps {
  type: string;
  updateFields: (fields: { type: string }) => void;
}

export function StepType({ type, updateFields }: StepTypeProps) {
  const types = [
    { label: "Ristorante", icon: Utensils },
    { label: "Bar / Caffè", icon: Coffee },
    { label: "Pub", icon: Beer },
    { label: "Pizzeria", icon: Pizza },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Che tipo di locale gestisci?</h2>
        <p className="text-slate-500">Questo ci aiuterà a configurare il tuo menu iniziale.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {types.map((item) => {
          const isSelected = type === item.label;
          
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => updateFields({ type: item.label })}
              className={cn(
                "flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-[2rem] border-2 transition-all group",
                isSelected 
                  ? "border-red-600 bg-red-50/50 shadow-md scale-[1.02]" 
                  : "border-slate-50 hover:border-red-200 hover:bg-slate-50"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors",
                isSelected ? "bg-red-600 text-white" : "bg-white text-slate-400 group-hover:text-red-600"
              )}>
                <item.icon size={24} />
              </div>
              <span className={cn(
                "font-bold transition-colors",
                isSelected ? "text-red-600" : "text-slate-700"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
