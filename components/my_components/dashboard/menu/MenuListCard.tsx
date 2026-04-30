"use client";
import { motion } from 'framer-motion';
import { FileText, MoreVertical, Eye } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MenuCardProps {
  title: string;
  dishesCount: number;
  categoriesCount: number;
  isActive: boolean;
  lastUpdate: string;
}

export default function MenuListCard({ title, dishesCount, categoriesCount, isActive, lastUpdate }: MenuCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/50 backdrop-blur-xl border border-white/40 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
          isActive ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
        )}>
          {isActive ? "● In uso" : "Non attivo"}
        </div>
        <button className="text-slate-400 hover:text-slate-900"><MoreVertical size={20}/></button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
          <FileText size={16} /> {categoriesCount} Categorie
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
          <Eye size={16} /> {dishesCount} Piatti
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 font-bold uppercase">Update: {lastUpdate}</span>
        <div className="flex gap-2">
           {!isActive && <button className="text-sm font-bold text-brand-red px-3 py-1">Attiva</button>}
           <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold">Modifica</button>
        </div>
      </div>
    </motion.div>
  );
}
