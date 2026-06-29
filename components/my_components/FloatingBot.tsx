"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Search, 
  ChevronRight, 
  Sparkles
} from "lucide-react";

const SUGGESTED_FAQS = [
  "Cos'è TasteBoard?",
  "Come funziona il menu digitale?",
  "Gestione turni e staff",
  "Piani e prezzi Beta"
];

export default function FloatingBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-100 flex flex-col items-end">
      
      {/* Finestra del Bot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-32px)] sm:w-100 max-w-100 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header - Branding TasteBoard */}
            <div className="bg-slate-900 p-6 text-white relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                  <Sparkles className="text-white w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">TasteBot</h3>
                  <p className="text-xs text-slate-400 mt-1 italic">Sempre al tuo servizio</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Corpo - Ricerca e FAQ */}
            <div className="p-6 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Cerca una risposta..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Domande frequenti
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTED_FAQS.map((q, i) => (
                    <button 
                      key={i}
                      className="flex items-center justify-between p-3.5 text-left text-sm font-semibold text-slate-700 bg-white border border-slate-100 rounded-2xl hover:border-red-500 hover:text-red-600 hover:bg-red-50/10 transition-all group"
                    >
                      {q}
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                Non trovi la risposta? <span className="font-bold text-slate-900 cursor-pointer hover:underline">Chatta con un umano</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsante Trigger (Icona tonda) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-400 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 relative group"
      >
        {/* Effetto Ping quando è chiuso per attirare l'attenzione */}
        <AnimatePresence>
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25" />
          )}
        </AnimatePresence>
        
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

    </div>
  );
}
