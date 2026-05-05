"use client";

import React from 'react';
import { Store, Camera, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BrandIdentityProps {
  name: string;
  bio: string;
  logo: string;
  onUpdate: (fields: { name?: string; bio?: string; logo?: string }) => void;
}

export const BrandIdentityCard = ({ name, bio, logo, onUpdate }: BrandIdentityProps) => {
  // Usiamo Picsum per un placeholder di qualità se il logo manca
  const logoUrl = logo || "https://picsum.photos";

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] font-jakarta relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />

      <div className="flex flex-col md:flex-row gap-12 relative">
        
        {/* --- LATO LOGO --- */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            {/* Outer Ring */}
            <div className="absolute -inset-1 bg-linear-to-tr from-red-500 to-yellow-400 rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500" />
            
            <div className="relative w-44 h-44 rounded-[3.2rem] overflow-hidden border-[6px] border-white shadow-xl bg-slate-50">
              <Image 
                src={logoUrl} 
                alt="Brand Logo" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlay interattivo */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-[3px] cursor-pointer">
                <div className="p-3 bg-white/20 rounded-2xl mb-2">
                  <Camera className="text-white" size={24} />
                </div>
                <span className="text-[9px] text-white font-black uppercase tracking-[0.2em]">Aggiorna</span>
              </div>
            </div>

            {/* Badge di stato o azione */}
            <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl hover:bg-red-600 hover:scale-110 transition-all duration-300 border-4 border-white">
              <Camera size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
              <CheckCircle2 size={12} /> Live su Tasteboard
            </span>
          </div>
        </div>

        {/* --- LATO TESTI --- */}
        <div className="flex-1 space-y-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <Sparkles size={16} className="fill-current" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">Profilo Pubblico</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Identità <span className="text-red-600 text-stroke">Brand</span></h2>
            <p className="text-slate-500 font-medium text-sm">Questi dettagli saranno visibili ai tuoi clienti.</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Input Nome */}
            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Nome del Locale</label>
                <Store size={14} className="text-slate-300" />
              </div>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-5 font-bold text-slate-900 focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 outline-none transition-all duration-300 placeholder:text-slate-300"
                placeholder="Inserisci il nome commerciale..."
              />
            </div>

            {/* Input Bio */}
            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Slogan / Bio Breve</label>
                <span className="text-[10px] font-bold text-slate-300">{bio.length}/150</span>
              </div>
              <textarea 
                rows={3} 
                value={bio} 
                onChange={(e) => onUpdate({ bio: e.target.value })}
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] p-5 font-medium text-slate-600 focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 outline-none resize-none transition-all duration-300"
                placeholder="Racconta in poche parole la tua cucina..."
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
