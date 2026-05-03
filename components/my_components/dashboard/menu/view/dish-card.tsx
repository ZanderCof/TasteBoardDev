"use client";
import { Badge } from "@/components/ui/badge";

interface Dish {
  name: string;
  price: number;
  description: string;
  allergens: string[];
  image?: string;
}

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-3xl border border-slate-50 shadow-sm active:scale-[0.98] transition-all">
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-slate-900 leading-tight">{dish.name}</h3>
          <span className="text-red-600 font-black italic">€{dish.price}</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {dish.description}
        </p>
        <div className="flex flex-wrap gap-1 pt-1">
          {dish.allergens.map((a: string) => (
            <span key={a} className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {a}
            </span>
          ))}
        </div>
      </div>
      {dish.image && (
        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
          <img src={dish.image} className="w-full h-full object-cover" alt={dish.name} />
        </div>
      )}
    </div>
  );
}
