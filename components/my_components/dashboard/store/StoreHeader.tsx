"use client";

import React from 'react';
import { Globe, ArrowLeft, ExternalLink, Zap, Edit2 } from 'lucide-react';
import { useRouter } from "next/navigation";

interface StoreHeaderProps {
  name: string;
  slug: string;
  onUpdateName: (newName: string) => void; // Nuova prop per aggiornare il nome
}

export const StoreHeader = ({ name, slug, onUpdateName }: StoreHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 font-jakarta pb-6 border-b border-slate-100">
      <div className="flex items-start gap-6 w-full">
        {/* Tasto Indietro */}
        <button 
          onClick={() => router.back()}
          className="mt-1 p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all group shadow-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="space-y-3 w-full max-w-2xl">
          {/* Badge Superiore */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center gap-1.5">
              <Zap size={12} className="fill-current" />
              <span className="text-[10px] font-black uppercase tracking-wider">Control Panel</span>
            </div>
          </div>

          {/* NOME MODIFICABILE INLINE */}
          <div className="relative group/name flex items-center gap-3">
            <input
              value={name}
              onChange={(e) => onUpdateName(e.target.value)}
              placeholder="Nome del locale"
              className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none bg-transparent border-none outline-none focus:ring-2 focus:ring-red-500/10 rounded-xl w-full transition-all hover:bg-slate-50 focus:bg-slate-50 px-2 -ml-2 py-1"
            />
            <Edit2 size={20} className="text-slate-200 group-hover/name:text-red-500 transition-colors shrink-0" />
          </div>

          {/* Link Esterno */}
          <a 
            href={`https://tasteboard.io{slug}`} 
            target="_blank" 
            className="group/link flex items-center gap-2 text-sm w-fit"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full group-hover/link:bg-white group-hover/link:border-slate-200 transition-all">
              <Globe size={13} className="text-slate-400 group-hover/link:text-red-500 transition-colors" /> 
              <span className="text-slate-400 font-medium">tasteboard.io/</span>
              <span className="text-slate-900 font-bold">{slug || "locale"}</span>
              <ExternalLink size={12} className="ml-1 text-slate-300 opacity-0 group-hover/link:opacity-100 transition-all" />
            </div>
          </a>
        </div>
      </div>

      {/* Spazio vuoto a destra o per future info rapide (es: orario apertura) */}
      <div className="hidden md:block shrink-0">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Editing Mode</span>
        </div>
      </div>
    </header>
  );
};
