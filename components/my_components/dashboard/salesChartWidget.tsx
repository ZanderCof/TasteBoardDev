"use client";
import { TrendingUp } from 'lucide-react';

export const SalesChartWidget = () => (
  <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-8 shadow-2xl h-full">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 font-jakarta">
          Andamento Vendite <TrendingUp className="text-green-500" />
        </h2>
        <p className="text-slate-500 text-sm font-medium">Ricavi totali della settimana</p>
      </div>
      <select className="bg-white/40 border border-white/60 rounded-xl px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:ring-2 ring-brand-red/20 transition-all">
        <option>Ultimi 7 giorni</option>
        <option>Ultimo mese</option>
      </select>
    </div>
    
    {/* Placeholder per Recharts */}
    <div className="h-[280px] w-full bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-dashed border-slate-300 flex items-center justify-center">
      <p className="text-slate-400 font-medium italic">Area Grafico Intelligente</p>
    </div>
  </div>
);
