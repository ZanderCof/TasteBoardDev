"use client";
import React from 'react';
import { Save, RotateCcw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsActionToolbarProps {
  isDirty: boolean;
  isLoading: boolean;
  onSave: () => Promise<void> | void;
  onReset: () => void;
}

export const SettingsActionToolbar = ({ 
  isDirty, 
  isLoading, 
  onSave, 
  onReset 
}: SettingsActionToolbarProps) => ( // <-- Usiamo l'interfaccia qui
  <AnimatePresence>
    {isDirty && (
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      >
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl flex items-center justify-between gap-4">
          <div className="hidden sm:block pl-4">
            <p className="text-white text-xs font-black uppercase tracking-widest">Modifiche non salvate</p>
            <p className="text-slate-400 text-[10px] font-medium italic">Stai attento a non perdere il lavoro!</p>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={onReset}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs font-black text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Annulla
            </button>
            <button 
              onClick={onSave}
              disabled={isLoading}
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-[1.2rem] text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              Salva Modifiche
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
