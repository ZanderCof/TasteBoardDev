"use client";
import { Share2 } from "lucide-react";
import Image from "next/image";

export function PublicHeader({ restaurantName, logo }: { restaurantName: string, logo?: string }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-100">
          {logo ? <Image src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl" /> : restaurantName[0]}
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-tight uppercase italic">{restaurantName}</h1>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aperto Ora</span>
          </div>
        </div>
      </div>
      <button className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-red-600 transition-colors">
        <Share2 size={20} />
      </button>
    </header>
  );
}
