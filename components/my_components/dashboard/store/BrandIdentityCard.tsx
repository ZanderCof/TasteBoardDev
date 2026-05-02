"use client";

import React from 'react';
import { Store, Camera, Info } from 'lucide-react';
import { cn } from "@/lib/utils";

export const BrandIdentityCard = () => {
  return (
    <section className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-sm font-jakarta">
      {/* Header della sezione */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-200">
            <Store size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Identità del Brand</h2>
            <p className="text-sm text-slate-500 font-medium">Definisci come il tuo locale appare online</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Sinistra: Gestione Logo */}
        <div className="md:col-span-4 flex flex-col items-center gap-4">
          <div className="relative group w-40 h-40">
            {/* Contenitore Immagine */}
            <div className="w-full h-full rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative bg-slate-50">
              <img 
                src="https://picsum.photos/200/300" 
                alt="Logo Locale" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay al passaggio del mouse */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 cursor-pointer backdrop-blur-[2px]">
                <Camera className="text-white mb-2" size={28} />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Cambia Logo</span>
              </div>
            </div>
            
            {/* Badge flottante per upload rapido */}
            <button className="absolute -bottom-2 -right-2 p-3 bg-yellow-400 text-slate-900 rounded-2xl shadow-xl border-4 border-white hover:scale-110 transition-transform active:scale-95">
              <Camera size={18} />
            </button>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
            Formati: JPG, PNG, WEBP (Max 2MB)
          </p>
        </div>

        {/* Destra: Campi Testuali */}
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            {/* Nome Insegna */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-widest flex items-center gap-2">
                Nome Insegna
              </label>
              <input 
                type="text" 
                defaultValue="Ristorante Da Mario" 
                className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 ring-brand-red/5 focus:border-brand-red/30 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Descrizione / Slogan */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-widest">
                Bio / Slogan
              </label>
              <textarea 
                rows={3} 
                defaultValue="Cucina tipica romana nel cuore di Trastevere, materie prime a km zero e ricette della nonna." 
                className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 font-medium text-slate-600 focus:ring-4 ring-brand-red/5 focus:border-brand-red/30 outline-none resize-none transition-all"
              />
              <div className="flex items-center gap-1.5 ml-2 mt-1">
                <Info size={12} className="text-slate-400" />
                <span className="text-[10px] text-slate-400 font-medium italic">Apparirà sotto il nome del locale nel tuo sito web.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
