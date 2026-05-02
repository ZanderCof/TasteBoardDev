"use client";
import { ExternalLink, Globe } from 'lucide-react';

export const StorePreviewCard = () => (
  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-red/20 blur-[60px] group-hover:bg-brand-red/40 transition-all pointer-events-none" />
    <h3 className="font-bold text-slate-400 mb-6 flex items-center justify-between text-sm">
      Anteprima Mobile <ExternalLink size={16} />
    </h3>
    <div className="aspect-[9/16] bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center gap-6 p-4">
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
        <Globe size={32} className="text-brand-red" />
      </div>
      <p className="text-[11px] font-medium text-slate-400 text-center leading-relaxed">
        Il tuo sito web è generato automaticamente e ottimizzato per la conversione.
      </p>
      <button className="w-full bg-white text-slate-900 py-3 rounded-xl text-xs font-black hover:bg-yellow-400 transition-colors">
        VEDI LIVE
      </button>
    </div>
  </div>
);
