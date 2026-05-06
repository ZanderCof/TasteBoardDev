"use client";
import { motion } from 'framer-motion';
import { TrendingUp, Calendar } from 'lucide-react';

export const SalesChartWidget = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-slate-100 h-full overflow-hidden group"
    >
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60 pointer-events-none" />

      <div className="relative flex flex-col h-full">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-200">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                Andamento Vendite
              </h2>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1">
                Performance Settimanale
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
            <button className="px-4 py-2 text-[11px] font-black uppercase tracking-tighter bg-white shadow-sm rounded-xl text-red-600 border border-slate-100">
              Settimana
            </button>
            <button className="px-4 py-2 text-[11px] font-black uppercase tracking-tighter text-slate-400 hover:text-slate-600 transition-colors">
              Mese
            </button>
          </div>
        </div>

        {/* AREA GRAFICO (Placeholder Avanzato) */}
        <div className="relative flex-1 min-h-75 w-full bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center justify-center group/chart overflow-hidden">
          {/* Effetto Grid Simulata */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',  backgroundSize: '30px 30px' }} 
          />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="z-10 flex flex-col items-center"
          >
            <div className="p-4 bg-white rounded-full shadow-xl mb-4 text-red-600 group-hover/chart:rotate-12 transition-transform duration-500">
              <Calendar size={32} />
            </div>
            <p className="text-slate-400 font-bold text-sm">Pronto per Recharts</p>
            <p className="text-[10px] text-slate-300 uppercase font-black tracking-widest mt-1">Collega il Database</p>
          </motion.div>

          {/* Esempio di come apparirebbe un picco nel grafico */}
          <div className="absolute bottom-10 right-10 flex items-center gap-3 bg-yellow-400 p-3 rounded-2xl shadow-xl shadow-yellow-200/50 animate-bounce">
            <span className="text-[10px] font-black text-red-700 uppercase">Top Day!</span>
            <div className="w-2 h-2 rounded-full bg-red-600" />
          </div>
        </div>

        {/* FOOTER STATS */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
            <p className="text-[10px] font-black text-red-600 uppercase mb-1">Miglior Piatto</p>
            <p className="text-lg font-bold text-slate-900">Carbonara</p>
          </div>
          <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-100">
            <p className="text-[10px] font-black text-yellow-700 uppercase mb-1">Media Scontrino</p>
            <p className="text-lg font-bold text-slate-900">€24.50</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
