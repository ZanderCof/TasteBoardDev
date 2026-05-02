"use client";
import { Globe } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StoreHeaderProps {
  name: string;
  slug: string;
  isLive: boolean;
  setIsLive: (val: boolean) => void;
}

export const StoreHeader = ({ name, slug, isLive, setIsLive }: StoreHeaderProps) => (
  <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-jakarta">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Gestione <span className="text-brand-red">Locali</span>
        </h1>
        {/* <span className="bg-brand-red/10 text-brand-red text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          Premium
        </span> */}
      </div>
      <p className="text-slate-500 font-medium italic flex items-center gap-2 text-sm">
        <Globe size={14} /> tasteboard.io/{slug}
      </p>
    </div>

    <div className="flex items-center text-black gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
      <button 
        onClick={() => setIsLive(true)}
        className={cn("px-5 py-2 rounded-xl text-[10px] font-black transition-all", isLive ? "bg-green-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-50")}
      >
        LIVE
      </button>
      <button 
        onClick={() => setIsLive(false)}
        className={cn("px-5 py-2 rounded-xl text-[10px] font-black transition-all", !isLive ? "bg-yellow-500 text-white shadow-md" : "text-slate-400 hover:bg-slate-50")}
      >
        MANUTENZIONE
      </button>
    </div>
  </header>
);
