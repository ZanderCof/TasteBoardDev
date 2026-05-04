"use client";
import React from 'react';
import { Store, Camera, Info } from 'lucide-react';

interface BrandIdentityProps {
  name: string;
  bio: string;
  logo: string;
  onUpdate: (fields: { name?: string; bio?: string; logo?: string }) => void;
}

export const BrandIdentityCard = ({ name, bio, logo, onUpdate }: BrandIdentityProps) => {
  return (
    <section className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] p-8 shadow-sm font-jakarta">
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
        <div className="md:col-span-4 flex flex-col items-center gap-4">
          <div className="relative group w-40 h-40">
            <div className="w-full h-full rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative bg-slate-50">
              <img 
                src={logo || "https://picsum.photos"} // Logo reale o placeholder
                alt="Logo Locale" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 cursor-pointer backdrop-blur-[2px]">
                <Camera className="text-white mb-2" size={28} />
                <span className="text-[10px] text-white font-black uppercase tracking-widest">Cambia Logo</span>
              </div>
            </div>
            <button className="absolute -bottom-2 -right-2 p-3 bg-yellow-400 text-slate-900 rounded-2xl shadow-xl border-4 border-white hover:scale-110 transition-transform active:scale-95">
              <Camera size={18} />
            </button>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
            Max 2MB
          </p>
        </div>

        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-widest">Nome Insegna</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-4 ring-red-600/5 focus:border-red-600/30 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-slate-400 ml-3 tracking-widest">Bio / Slogan</label>
              <textarea 
                rows={3} 
                value={bio} 
                onChange={(e) => onUpdate({ bio: e.target.value })}
                className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 font-medium text-slate-600 focus:ring-4 ring-red-600/5 focus:border-red-600/30 outline-none resize-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
