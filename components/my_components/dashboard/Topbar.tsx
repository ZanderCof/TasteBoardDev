"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import StoreSwitcher from "./StoreSwitcher";

export default function Topbar() {
  return (
    <header className="h-20 bg-white/40 backdrop-blur-md border border-white/40 rounded-[2rem] px-8 flex items-center justify-between shadow-sm">
      {/* Search Bar */}
      <div className="relative w-96 group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-red transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Cerca prenotazioni, piatti..."
          className="w-full bg-white/50 border border-white/60 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:ring-2 ring-brand-red/10 transition-all font-medium"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-500 hover:text-brand-red transition-all shadow-sm">
          <Bell size={20} />
        </button>
        <div className="h-10 w-[1px] bg-slate-200 mx-2" />
        <div className="flex items-center gap-3 cursor-pointer">
          <StoreSwitcher />
        </div>
      </div>
    </header>
  );
}
