"use client";

import React from 'react';
import { Plus, Store } from 'lucide-react';
import { motion } from 'framer-motion';

export const AddStoreCard = () => {
  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="w-full group relative overflow-hidden bg-white/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-red/40 hover:bg-white transition-all duration-300"
    >
      {/* Icona con cerchio di sfondo che si colora all'hover */}
      <div className="relative">
        <div className="w-16 h-16 rounded-[1.5rem] bg-green-600 flex items-center justify-center text-white group-hover:bg-green-400 group-hover:text-white transition-colors duration-300 shadow-sm">
          <Plus size={32} strokeWidth={2.5} />
        </div>
        {/* Piccola icona store di supporto */}
        <div className="absolute -bottom-1 -right-1 p-1.5 bg-yellow-400 rounded-lg text-slate-900 shadow-md">
          <Store size={12} />
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Aggiungi un nuovo <span className="group-hover:text-brand-red transition-colors">Locale</span>
        </h3>
        <p className="text-xs text-slate-500 font-medium max-w-[200px] mx-auto mt-1">
          Espandi il tuo business creando un altro profilo Tasteboard.
        </p>
      </div>
    </motion.button>
  );
};
