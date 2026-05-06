"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Store, Sparkles } from "lucide-react";
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
          {/* Overlay - Blur leggermente ridotto su mobile per performance */}
          <motion.div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm md:backdrop-blur-md z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Container Principale */}
          <div className="fixed inset-0 flex items-end md:items-center justify-center z-101 pointer-events-none">
            <motion.div
              // Mobile: sale dal basso | Desktop: scala e appare al centro
              initial={{ y: "100%", opacity: 1, scale: 1 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 1 }}
              // Su desktop cambiamo l'animazione via media query nel CSS o usando varianti
              variants={{
                desktop: { scale: 1, y: 0 },
                mobile: { y: 0 }
              }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-[0_20px_50px_rgba(0,0,0,0.2)] pointer-events-auto relative max-h-[95vh] flex flex-col"
            >
              {/* Handle per il trascinamento visuale su Mobile */}
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 md:hidden" />

              {/* Decorazione superiore */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 hidden md:block" />

              <div className="p-6 md:p-10 overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-red-600 mb-1">
                      <Sparkles size={16} className="fill-current" />
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Nuovo Business</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                      Crea il tuo <span className="text-red-600">Locale</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-xs md:text-sm">
                      Configura la tua attività in pochi secondi.
                    </p>
                  </div>

                  <button 
                    onClick={onClose}
                    className="p-2.5 bg-slate-100 text-slate-400 rounded-2xl md:hover:bg-red-50 md:hover:text-red-600 transition-colors"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Body - Form */}
                <div className="relative pb-4">
                  <CreateStoreForm onSuccess={onClose} />
                </div>

                {/* Footer */}
                <div className="mt-4 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-400">
                  <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                    <Store size={14} />
                  </div>
                  <p className="text-[10px] md:text-[11px] font-medium leading-tight">
                    Potrai modificare logo e orari in qualsiasi momento dalle impostazioni.
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
