"use client"; // 1. Aggiungi questo in alto

import { motion } from "framer-motion"; // 2. Aggiungi questo import
import { Edit3, Trash2 } from "lucide-react"; // Assicurati di avere gli import delle icone

export function DishItem({ name, price, description }: { name: string, price: string, description?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="group flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4">
        {/* Placeholder Immagine con filtro rosso blurrato */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-[2px] z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-red-700 z-20 uppercase tracking-tighter">No Img</div>
        </div>
        
        <div className="text-left">
          <h4 className="font-bold text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500 line-clamp-1">{description || "Nessuna descrizione aggiunta."}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-black text-slate-900 tracking-tighter">€{price}</span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Edit3 size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
