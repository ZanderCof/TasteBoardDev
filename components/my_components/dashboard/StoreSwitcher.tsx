"use client";

import React, { useState } from 'react';
import { ChevronsUpDown, Store, Plus, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const stores = [
  { id: '1', name: 'Pizzeria Roma', type: 'Pizzeria', status: 'Online' },
  { id: '2', name: 'Sushi Lab', type: 'Ristorante', status: 'Online' },
];

export default function StoreSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  return (
    <div className="relative font-jakarta">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 p-2 pr-4 bg-white border rounded-[1.3rem] transition-all duration-300 group",
          isOpen ? "border-red-500 ring-4 ring-red-500/5 shadow-sm" : "border-slate-100 hover:border-slate-200 shadow-sm"
        )}
      >
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-slate-200 group-hover:bg-red-600 transition-colors">
          <Store size={18} strokeWidth={2.5} />
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-black text-slate-900 leading-none truncate max-w-25">
            {selectedStore.name}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">
              {selectedStore.type}
            </p>
          </div>
        </div>
        <ChevronsUpDown size={14} className="text-slate-300 group-hover:text-slate-900 ml-2" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 12, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full right-0 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 p-3 overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">I tuoi Locali</span>
                <Sparkles size={12} className="text-red-500" />
              </div>
              
              <div className="space-y-1.5">
                {stores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => {
                      setSelectedStore(store);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-200 group",
                      selectedStore.id === store.id 
                        ? "bg-red-50" 
                        : "hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                        selectedStore.id === store.id ? "bg-red-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}>
                        <Store size={16} strokeWidth={2.5} />
                      </div>
                      <div className="text-left">
                        <p className={cn("text-xs font-black", selectedStore.id === store.id ? "text-red-600" : "text-slate-700")}>
                          {store.name}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{store.type}</p>
                      </div>
                    </div>
                    {selectedStore.id === store.id && (
                      <div className="bg-red-600 rounded-full p-0.5">
                        <Check size={12} className="text-white" strokeWidth={4} />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-50">
                <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-900 text-white hover:bg-red-600 transition-all shadow-lg shadow-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Plus size={16} strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest">Nuovo Locale</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
