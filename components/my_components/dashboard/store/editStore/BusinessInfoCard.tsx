"use client";
import React from 'react';
import { MapPin, Hash, Building, Phone, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface BusinessInfoProps {
  address: string;
  piva: string;
  phone: string;
  onUpdate: (fields: { address?: string; piva?: string; phone?: string }) => void;
  onDelete?: () => void; // Aggiunta funzione delete
}

export const BusinessInfoCard = ({ address, piva, phone, onUpdate, onDelete }: BusinessInfoProps) => (
  <div className="space-y-6">
    <section className="bg-white/80 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-jakarta relative overflow-hidden">
      {/* Intestazione */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-slate-900 rounded-[1.5rem] text-white shadow-xl shadow-slate-200">
            <Building size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1.5">Informazioni Aziendali</h2>
            <p className="text-sm text-slate-500 font-medium">Gestisci i recapiti e i dati legali della tua attività</p>
          </div>
        </div>
      </div>

      {/* Grid Campi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-[0.2em]">Partita IVA</label>
          <div className="relative group">
            <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={piva} 
              onChange={(e) => onUpdate({ piva: e.target.value })}
              className="w-full bg-slate-50/50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-5 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 outline-none transition-all duration-300"
              placeholder="12345678901"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-[0.2em]">Telefono di Contatto</label>
          <div className="relative group">
            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => onUpdate({ phone: e.target.value })}
              className="w-full bg-slate-50/50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-5 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 outline-none transition-all duration-300"
              placeholder="+39 02..."
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-[0.2em]">Indirizzo Sede Operativa</label>
          <div className="relative group">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={address} 
              onChange={(e) => onUpdate({ address: e.target.value })}
              className="w-full bg-slate-50/50 border-2 border-slate-50 rounded-[1.5rem] pl-14 pr-5 py-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 outline-none transition-all duration-300"
              placeholder="Via del Gusto 15, 20121 Milano (MI)"
            />
          </div>
        </div>
      </div>
    </section>

    {/* SEZIONE PERICOLO - ELIMINA LOCALE */}
    <section className="bg-red-50/30 border-2 border-dashed border-red-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4 text-center md:text-left">
        <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
          <AlertCircle size={24} />
        </div>
        <div>
          <h3 className="text-lg font-black text-red-900 leading-none mb-1">Attenzione</h3>
          <p className="text-sm text-red-600/70 font-medium italic">L&apos;eliminazione del locale è permanente e non può essere annullata.</p>
        </div>
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onDelete}
        className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
      >
        <Trash2 size={16} />
        Elimina Locale
      </motion.button>
    </section>
  </div>
);
