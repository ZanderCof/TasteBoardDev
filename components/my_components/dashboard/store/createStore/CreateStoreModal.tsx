"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Store, Sparkles } from "lucide-react"; // Aggiunte icone per stile
import { CreateStoreForm } from "./CreateStoreForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStoreModal = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur più profondo per focus totale */}
          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-101 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] pointer-events-auto relative"
            >
              {/* Decorazione estetica superiore (opzionale) */}
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 via-orange-400 to-yellow-400" />

              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-red-600 mb-1">
                      <Sparkles size={18} className="fill-current" />
                      <span className="text-xs font-black uppercase tracking-widest">Nuovo Business</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                      Crea il tuo <span className="text-red-600">Locale</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-sm">
                      Configura la tua attività in pochi secondi.
                    </p>
                  </div>

                  <button 
                    onClick={onClose}
                    className="p-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-2xl transition-colors duration-200"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Body - Form */}
                <div className="relative">
                  <CreateStoreForm onSuccess={onClose} />
                </div>

                {/* Footer / Nota di supporto */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-400">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Store size={14} />
                  </div>
                  <p className="text-[11px] font-medium leading-tight">
                    Potrai modificare i dettagli del locale, inclusi logo e orari, in qualsiasi momento dalle impostazioni.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
