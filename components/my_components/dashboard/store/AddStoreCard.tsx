"use client";
import React, { useState } from "react";
import { Plus, Store } from "lucide-react";
import { motion } from "framer-motion";
import { CreateStoreModal } from "./createStore/CreateStoreModal";

export const AddStoreCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        onClick={() => setOpen(true)}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer w-full group relative overflow-hidden bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.8rem] p-10 flex flex-col items-center justify-center gap-6 hover:border-emerald-500/40 hover:bg-white transition-all duration-500 h-full min-h-87.5"
      >
        <div className="relative">
          {/* Cerchio Pulsante Rosso (Base) -> Verde (Hover) */}
          <div className="w-20 h-20 rounded-[2rem] bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-100 group-hover:bg-emerald-500 group-hover:shadow-emerald-100 transition-all duration-500 group-hover:rotate-90">
            <Plus size={40} strokeWidth={3} />
          </div>

          {/* Badge Giallo (Resta costante per richiamare il brand) */}
          <div className="absolute -bottom-2 -right-2 p-2.5 bg-yellow-400 rounded-2xl text-slate-900 shadow-xl border-4 border-white group-hover:scale-110 transition-transform">
            <Store size={16} strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Nuovo <span className="text-red-600 group-hover:text-emerald-600 transition-colors">Locale</span>
          </h3>
          <p className="text-sm text-slate-400 font-medium max-w-50 leading-relaxed">
            Aggiungi un altro punto vendita alla tua rete TasteBoard.
          </p>
        </div>

        {/* Effetto Glow di Sfondo Verde in Hover */}
        <div className="absolute inset-0 bg-linear-to-b from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>

      <CreateStoreModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
