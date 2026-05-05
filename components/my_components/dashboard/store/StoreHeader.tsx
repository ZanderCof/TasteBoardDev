"use client";

import React from 'react';
import { Globe, ArrowLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface StoreHeaderProps {
  name: string;
  slug: string;
  isLive: boolean;
  setIsLive: (val: boolean) => void;
}

export const StoreHeader = ({ name, slug, isLive, setIsLive }: StoreHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-jakarta px-4 py-4">
      <div className="flex items-center gap-5">
        {/* Tasto Indietro */}
        <button 
          onClick={() => router.back()}
          className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
        </button>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Gestione <span className="text-red-600">{name}</span>
            </h1>
          </div>
          <p className="text-slate-500 font-medium italic flex items-center gap-2 text-sm">
            <Globe size={14} className="text-slate-400" /> 
            <span className="text-slate-400 font-normal">tasteboard.io/</span>
            <span className="text-slate-900 font-bold not-italic">{slug || "il-tuo-locale"}</span>
          </p>
        </div>
      </div>

      {/* Switcher di Stato */}
      <div className="flex items-center text-black gap-1 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100 w-fit">
        <button 
          onClick={() => setIsLive(true)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
            isLive 
              ? "bg-white text-green-600 shadow-sm" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          {isLive && <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />}
          Live
        </button>
        <button 
          onClick={() => setIsLive(false)}
          className={cn(
            "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", 
            !isLive 
              ? "bg-white text-yellow-600 shadow-sm" 
              : "text-slate-400 hover:text-slate-600"
          )}
        >
          Manutenzione
        </button>
      </div>
    </header>
  );
};
