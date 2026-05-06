"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Sparkles, Rocket, BellRing } from 'lucide-react';

export const ComingSoonPlaceholder = ({ featureName = "Questa funzione" }) => (
  <div className="w-full min-h-[400px] flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md w-full bg-white rounded-[3rem] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] text-center relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-100/50 blur-[80px] rounded-full" />
      
      <div className="relative z-10 space-y-6">
        <div className="inline-flex p-4 bg-amber-50 rounded-[2rem] text-amber-600 mb-2">
          <Timer size={32} strokeWidth={2.5} className="animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-600 mb-1">
            <Sparkles size={14} className="fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Coming Soon</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {featureName} sta per arrivare.
          </h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">
            I nostri chef digitali stanno ultimando i dettagli. <br /> 
            Sarà disponibile nel tuo prossimo aggiornamento.
          </p>
        </div>

        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
          <BellRing size={16} /> Avvisami quando è pronta
        </button>
      </div>
    </motion.div>
  </div>
);
