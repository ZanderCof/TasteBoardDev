"use client";
import React from 'react';
import { MapPin, Hash, Building, Phone, Utensils, Coffee, Pizza, Beer, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const categories = [
  { id: "RESTAURANT", label: "Ristorante", icon: Utensils, color: "text-orange-500", bg: "bg-orange-50" },
  { id: "BAR", label: "Bar/Café", icon: Coffee, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "PIZZERIA", label: "Pizzeria", icon: Pizza, color: "text-red-500", bg: "bg-red-50" },
  { id: "PUB", label: "Pub/Birreria", icon: Beer, color: "text-yellow-600", bg: "bg-yellow-50" },
];

interface BusinessInfoProps {
  address: string;
  piva: string;
  phone: string;
  type: string;
  isLive: boolean;
  onUpdate: (fields: { address?: string; piva?: string; phone?: string; type?: string; isLive?: boolean }) => void;
}

export const BusinessInfoCard = ({ address, piva, phone, type, isLive, onUpdate }: BusinessInfoProps) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.03)] font-jakarta relative overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 relative z-10">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-slate-900 rounded-[1.5rem] text-white shadow-xl shadow-slate-200">
            <Building size={26} strokeWidth={2} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-1.5">Identità & Visibilità</h2>
            <p className="text-sm text-slate-400 font-medium">Gestisci come il tuo locale appare nel mondo digitale</p>
          </div>
        </div>

        {/* TOGGLE STATO LIVE/MANUTENZIONE */}
        <div className="flex items-center p-1.5 bg-slate-50 border border-slate-100 rounded-[1.4rem]">
          <button
            onClick={() => onUpdate({ isLive: true })}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              isLive ? "bg-white text-emerald-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <Eye size={14} /> Live
          </button>
          <button
            onClick={() => onUpdate({ isLive: false })}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              !isLive ? "bg-white text-amber-600 shadow-sm border border-slate-100" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <EyeOff size={14} /> Off
          </button>
        </div>
      </div>

      <div className="space-y-10 relative z-10">
        
        {/* SEZIONE TIPOLOGIA */}
        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            Tipologia di attività
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onUpdate({ type: cat.id })}
                className={cn(
                  "cursor-pointer p-4 rounded-[1.8rem] border-2 transition-all flex flex-col items-center gap-3 text-center",
                  type === cat.id 
                    ? "border-red-500 bg-red-50/30 shadow-sm" 
                    : "border-slate-50 bg-slate-50/30 hover:border-slate-200 hover:bg-white"
                )}
              >
                <div className={cn("p-3 rounded-2xl", cat.bg, cat.color)}>
                  <cat.icon size={22} strokeWidth={2.5} />
                </div>
                <span className={cn(
                  "text-[11px] font-black uppercase tracking-tight",
                  type === cat.id ? "text-red-700" : "text-slate-500"
                )}>
                  {cat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* GRID INPUT RECAPITI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-50 pt-10">
          <div className="group space-y-3">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Partita IVA</label>
            <div className="relative">
              <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={piva} 
                onChange={(e) => onUpdate({ piva: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 outline-none transition-all duration-300 shadow-sm"
                placeholder="12345678901"
              />
            </div>
          </div>

          <div className="group space-y-3">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Telefono</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => onUpdate({ phone: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 outline-none transition-all duration-300 shadow-sm"
                placeholder="+39 02..."
              />
            </div>
          </div>

          <div className="md:col-span-2 group space-y-3">
            <label className="text-[11px] font-black uppercase text-slate-400 ml-1 tracking-[0.2em]">Indirizzo Sede Operativa</label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={address} 
                onChange={(e) => onUpdate({ address: e.target.value })}
                className="w-full bg-slate-50/50 border border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 outline-none transition-all duration-300 shadow-sm"
                placeholder="Via Roma 12, Milano"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
