"use client";

import { motion } from "framer-motion";
import { BetaForm } from "@/components/my_components/queue_components/BetaForm";
import { BetaCountdown } from "@/components/my_components/queue_components/BetaCountdown";
import { Sparkles } from "lucide-react";

export default function QueuePage() {
  return (
    <main className="select-none min-h-screen bg-white relative flex flex-col items-center justify-center px-6 overflow-hidden border-[12px] border-slate-50">
      {/* Background Animato */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-yellow-100/40 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-50/40 rounded-full blur-[100px]"
        />
      </div>

      {/* CONTENUTO - Ridotto space-y da 12 a 8 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full text-center space-y-8 relative z-10"
      >
        {/* Header - Ridotto space-y da 6 a 4 */}
        <div className="space-y-4">
          <motion.div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/40 backdrop-blur-md border border-yellow-200 shadow-sm text-yellow-700 font-bold text-[10px] uppercase tracking-[0.2em] mx-auto">
            <Sparkles size={12} className="animate-pulse" /> Accesso Beta
            Esclusivo
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85]">
            La nuova era <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
              della sala.
            </span>
          </h1>

          <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto leading-tight">
            TasteBoard sta per arrivare. Rivoluziona la gestione del tuo locale
            con intelligenza.
          </p>
        </div>

        {/* Countdown e Form - Ridotto il gap tra loro */}
        <div className="space-y-4">
          <BetaCountdown />
          <div className="pt-2">
            <BetaForm />
          </div>
        </div>

        {/* Info Badge - Ridotto pt da 16 a 8 e gap da 12 a 6 */}
        <motion.div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">
                Stato
              </p>
              <p className="text-xs font-bold text-slate-900">
                Sviluppo attivo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 tracking-tighter">
                V1
              </span>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">
                Versione
              </p>
              <p className="text-xs font-bold text-slate-900 italic">
                v0.0.1-beta
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
