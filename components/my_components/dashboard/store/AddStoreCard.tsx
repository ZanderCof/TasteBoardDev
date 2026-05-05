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
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer w-full group relative overflow-hidden bg-white/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-brand-red/40 hover:bg-white transition-all duration-300"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-[1.5rem] bg-green-600 flex items-center justify-center text-white group-hover:bg-green-400 transition-colors">
            <Plus size={32} strokeWidth={2.5} />
          </div>

          <div className="absolute -bottom-1 -right-1 p-1.5 bg-yellow-400 rounded-lg text-slate-900 shadow-md">
            <Store size={12} />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-black text-slate-900">
            Aggiungi un nuovo <span className="group-hover:text-brand-red">Locale</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Espandi il tuo business creando un altro profilo Tasteboard.
          </p>
        </div>
      </motion.div>

      <CreateStoreModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};