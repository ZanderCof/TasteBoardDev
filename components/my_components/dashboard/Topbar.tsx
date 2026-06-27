"use client";

import { Bell, Search, Command } from "lucide-react";
import StoreSwitcher from "./StoreSwitcher";


interface Restaurant {
  id: string;
  name: string;
  type: string | null;
}
export default function Topbar({ initialStores }: { initialStores: Restaurant[] }) {

  return (
    <header className="sticky z-40 h-22 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[2.5rem] px-6 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
      
      {/* Search Bar - Stile "Spotlight" */}
      <div className="relative w-full max-w-md group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <Search
            className="text-slate-400 group-focus-within:text-red-500 transition-colors duration-300"
            size={18}
          />
        </div>
        <label htmlFor="dashboard-search" className="sr-only">
          Cerca prenotazioni, piatti o ordini
        </label>
        <input
          id="dashboard-search"
          type="text"
          placeholder="Cerca prenotazioni, piatti o ordini..."
          className="w-full bg-slate-100/50 border border-transparent rounded-[1.2rem] py-3 pl-12 pr-12 outline-none focus:bg-white focus:border-red-500/30 focus-visible:ring-4 focus-visible:ring-red-500/15 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
        />
        {/* Shortcut visivo */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
          <Command size={10} className="text-slate-400" />
          <span className="text-[10px] font-black text-slate-400">K</span>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        {/* Notifiche con indicatore */}
        <button
          aria-label="Notifiche"
          className="relative p-3 bg-white rounded-2xl border border-slate-100 text-slate-500 hover:text-red-600 hover:border-red-100 hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full motion-safe:animate-pulse" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-3 opacity-50" />
        
        <StoreSwitcher initialStores={initialStores} />
      </div>
    </header>
  );
}
