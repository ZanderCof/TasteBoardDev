"use client";

import React, { useState } from 'react';
import { ChevronsUpDown, Store, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

// Ipotizziamo dei dati che arriveranno dal tuo DB
const stores = [
  { id: '1', name: 'Pizzeria Roma', type: 'Pizzeria' },
  { id: '2', name: 'Sushi Lab', type: 'Ristorante' },
];

export default function StoreSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="relative mb-8 font-jakarta">
      {/* Bottone Principale */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:border-brand-red/30 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white shadow-md shadow-red-100">
            <Store size={20} />
          </div>
          <div className="text-left">
            <p className="text-xs font-black text-slate-900 leading-none truncate w-32">
              {selectedStore.name}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
              {selectedStore.type}
            </p>
          </div>
        </div>
        <ChevronsUpDown size={16} className="text-slate-400 group-hover:text-brand-red transition-colors" />
      </button>

      {/* Menu Dropdown Animato */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay invisibile per chiudere il menu cliccando fuori */}
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-[1.8rem] shadow-2xl z-40 p-2 overflow-hidden"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 py-3">
                I tuoi Locali
              </p>
              
              <div className="space-y-1">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                      selectedStore.id === store.id 
                        ? "bg-brand-red/5 text-brand-red" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        selectedStore.id === store.id ? "bg-brand-red text-white" : "bg-slate-100"
                      )}>
                        <Store size={14} />
                      </div>
                      <span className="text-sm font-bold">{store.name}</span>
                    </div>
                    {selectedStore.id === store.id && <Check size={16} className="text-brand-red" />}
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100">
                <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-slate-900 font-bold transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-slate-900">
                    <Plus size={16} />
                  </div>
                  <span className="text-sm">Aggiungi Locale</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
