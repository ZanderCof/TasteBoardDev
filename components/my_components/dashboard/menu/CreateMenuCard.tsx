"use client";
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function CreateMenuCard() {
  return (
    <Link href="/dashboard/menu/create">
      <motion.div 
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="group h-full min-h-[220px] bg-white/20 backdrop-blur-sm border-2 border-dashed border-slate-300 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-4 hover:border-brand-red/50 hover:bg-white/40 transition-all cursor-pointer"
      >
        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-600 group-hover:text-yellow-600  transition-colors duration-300">
          <Plus size={32} />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-700 group-hover:text-slate-900">Crea Nuovo Menu</h3>
          <p className="text-sm text-slate-400 font-medium">Aggiungi un nuovo listino digitale</p>
        </div>
      </motion.div>
    </Link>
  );
}
