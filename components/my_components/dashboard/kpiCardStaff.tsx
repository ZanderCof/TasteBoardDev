"use client";
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';

interface KpiStaffProps {
  present: number;
  total: number;
}

export const KpiCardStaff = ({ present, total }: KpiStaffProps) => {
  const percentage = Math.round((present / total) * 100);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-red-600/80 rounded-[2.5rem] p-7 shadow-[0_20px_40px_-15px_rgba(220,38,38,0.3)] group border border-red-500"
    >
      {/* Glow Giallo soffuso sullo sfondo */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 blur-[80px] rounded-full group-hover:bg-yellow-400/30 transition-colors duration-700" />

      <div className="relative flex flex-col h-full">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-red-100 uppercase tracking-[0.2em]">
              Risorse Umane
            </p>
            <h3 className="text-white font-bold text-xl tracking-tight">
              Staff in servizio
            </h3>
          </div>
          <div className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-yellow-300 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            <Users size={22} strokeWidth={2.5} />
          </div>
        </div>

        {/* VALORE PRINCIPALE */}
        <div className="flex items-end gap-3 mb-6">
          <div className="relative">
             <span className="text-6xl font-black text-white tracking-tighter">
              {present}
            </span>
            {/* Indicatore Live Bianco */}
            <span className="absolute -right-4 top-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
          </div>
          <div className="flex flex-col mb-2">
            <span className="text-red-100 font-bold text-lg leading-none">/ {total}</span>
            <span className="text-[10px] text-yellow-300 font-black uppercase tracking-wider mt-1">
              {percentage}% Operativi
            </span>
          </div>
        </div>

        {/* PROGRESS BAR (Gialla su sfondo Rosso scuro) */}
        <div className="w-full h-2 bg-red-800/40 rounded-full overflow-hidden mb-8 border border-red-700/30">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]"
          />
        </div>

        {/* ACTION BUTTON (Bianco) */}
        <button className="group/btn mt-auto flex items-center justify-between w-full p-4 rounded-2xl bg-white text-sm font-bold text-red-600 hover:bg-yellow-400 hover:text-red-700 transition-all duration-300 shadow-lg">
          <span className="flex items-center gap-2 uppercase tracking-tight">
            Gestisci Turni
          </span>
          <div className="p-1.5 bg-red-50 rounded-lg group-hover/btn:bg-red-600 group-hover/btn:text-white transition-colors">
            <ArrowUpRight size={16} strokeWidth={3} />
          </div>
        </button>
      </div>
    </motion.div>
  );
};
