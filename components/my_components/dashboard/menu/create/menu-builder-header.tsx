"use client";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MenuBuilderHeader() {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50">
      <div className="flex items-center gap-5 w-full md:w-auto">
        <Link href="/dashboard/menu" className="group p-3 bg-white rounded-2xl border border-slate-100 hover:border-red-600 hover:shadow-lg hover:shadow-red-50 transition-all">
          <ArrowLeft size={22} className="text-slate-400 group-hover:text-red-600 transition-colors" />
        </Link>
        <div className="flex-1 min-w-[200px] lg:min-w-[400px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Configurazione Menu</span>
            <div className="h-1 w-1 bg-slate-300 rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ID: #8821</span>
          </div>
          <input 
            type="text" 
            placeholder="Nome del menu... (es. Primavera 2024)" 
            className="bg-transparent border-none p-0 text-3xl font-black text-slate-900 focus:ring-0 w-full placeholder:text-slate-200 tracking-tight"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Button variant="outline" className="flex-1 md:flex-none h-14 px-8 rounded-2xl font-bold border-slate-200 text-slate-500 hover:bg-slate-50">
           <FileText size={18} className="mr-2" /> Bozza
        </Button>
        <Button className="flex-1 md:flex-none h-14 bg-slate-900 hover:bg-red-600 text-white px-10 rounded-2xl font-bold shadow-xl shadow-slate-200 transition-all active:scale-95 gap-2">
          <Save size={18} /> Pubblica Menu
        </Button>
      </div>
    </header>
  );
}
