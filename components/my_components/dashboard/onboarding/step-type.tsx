"use client";
import { Utensils, Coffee, Beer, Pizza } from "lucide-react";

export function StepType() {
  const types = [
    { label: "Ristorante", icon: Utensils },
    { label: "Bar / Caffè", icon: Coffee },
    { label: "Pub", icon: Beer },
    { label: "Pizzeria", icon: Pizza },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Che tipo di locale gestisci?</h2>
        <p className="text-slate-500">Questo ci aiuterà a configurare il tuo menu iniziale.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {types.map((type) => (
          <button
            key={type.label}
            className="flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 border-slate-50 hover:border-red-600 hover:bg-red-50/50 transition-all group"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-red-600 shadow-sm">
              <type.icon size={24} />
            </div>
            <span className="font-bold text-slate-700">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
