"use client";
import { UtensilsCrossed } from 'lucide-react';
import { cn } from "@/lib/utils";

const dishes = [
  { name: "Pizza Margherita", count: 142, trend: "+12%" },
  { name: "Carbonara Special", count: 98, trend: "+5%" },
  { name: "Burger Tasteboard", count: 85, trend: "-2%" },
  { name: "Tiramisù Artigianale", count: 74, trend: "+20%" }
];

export const PopularDishesGrid = () => (
  <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-[2rem] p-8 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-brand-red rounded-xl text-white shadow-lg shadow-red-200">
        <UtensilsCrossed size={20} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Piatti più ordinati</h2>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dishes.map((item, i) => (
        <div key={i} className="bg-white/60 p-5 rounded-[1.5rem] border border-white/40 flex justify-between items-center hover:bg-white transition-all cursor-pointer shadow-sm group">
          <div>
            <p className="font-bold text-slate-800 group-hover:text-brand-red transition-colors">{item.name}</p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">{item.count} ordini</p>
          </div>
          <span className={cn(
            "text-xs font-black px-2.5 py-1 rounded-lg shadow-inner",
            item.trend.startsWith('+') ? 'bg-green-100/50 text-green-600' : 'bg-red-100/50 text-brand-red'
          )}>
            {item.trend}
          </span>
        </div>
      ))}
    </div>
  </div>
);
