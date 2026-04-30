"use client";

import React, { useState } from 'react';
import { ArrowLeft, Save, PlusCircle, GripVertical, Utensils, Info } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"; // Assicurati che il percorso sia corretto

const categories = ['Antipasti', 'Primi', 'Secondi', 'Dolci', 'Bevande'];

export default function CreateMenuPage() {
  const [activeTab, setActiveTab] = useState('Antipasti');

  return (
    <div className="space-y-8 font-jakarta max-w-[1400px] mx-auto pb-10">
      {/* Header Intelligente */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/30 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-sm">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <Link href="/dashboard/menu" className="group p-3 bg-white rounded-2xl border border-slate-200 hover:border-brand-red hover:shadow-lg hover:shadow-red-50 transition-all">
            <ArrowLeft size={22} className="text-slate-600 group-hover:text-brand-red transition-colors" />
          </Link>
          <div className="flex-1 min-w-[280px]">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red mb-1 block">Nuovo Listino</span>
            <input 
              type="text" 
              placeholder="Nome del menu... (es. Estate 2024)" 
              className="bg-transparent border-none p-0 text-2xl font-black text-slate-900 focus:ring-0 w-full placeholder:text-slate-300"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
             Bozza
          </button>
          <button className="flex-1 md:flex-none bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl shadow-slate-200 flex items-center justify-center gap-2 hover:bg-brand-red hover:shadow-red-100 transition-all active:scale-95">
            <Save size={18} /> Pubblica Menu
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Categorie - Floating Style */}
        <aside className="lg:col-span-4 space-y-4 sticky top-6">
          <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-6 border border-white/40 shadow-sm">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="font-black text-slate-900 tracking-tight">Categorie</h2>
              <button className="p-2 bg-brand-red/10 text-brand-red rounded-xl hover:bg-brand-red hover:text-white transition-all group">
                <PlusCircle size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {categories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 font-bold text-sm group",
                      isActive 
                        ? "bg-brand-red text-white border-brand-red shadow-lg shadow-red-100 scale-[1.02]" 
                        : "bg-white/40 border-transparent text-slate-500 hover:bg-white hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", isActive ? "bg-white" : "bg-slate-300 group-hover:bg-brand-red")} />
                      {cat}
                    </div>
                    <GripVertical size={16} className={cn("opacity-30", isActive ? "text-white" : "text-slate-400")} />
                  </button>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 flex gap-3">
               <Info size={20} className="text-yellow-600 shrink-0" />
               <p className="text-[11px] text-yellow-700 leading-relaxed font-medium">
                 Trascina le categorie per cambiare l&apos;ordine di visualizzazione sul menu digitale.
               </p>
            </div>
          </div>
        </aside>

        {/* Builder Area - Content Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/60 p-8 min-h-[600px] shadow-sm relative overflow-hidden"
            >
              {/* Header Sezione */}
              <div className="flex items-center justify-between mb-10">
                 <div>
                   <h2 className="text-2xl font-black text-slate-900">{activeTab}</h2>
                   <p className="text-slate-500 text-sm font-medium">Aggiungi piatti a questa sezione</p>
                 </div>
                 <button className="flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-2xl font-bold border border-slate-200 hover:border-brand-red hover:text-brand-red transition-all shadow-sm">
                   <PlusCircle size={20} /> Aggiungi Piatto
                 </button>
              </div>

              {/* Empty State migliorato */}
              <div className="flex flex-col items-center justify-center py-20 bg-white/30 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <Utensils size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Nessun piatto in {activeTab}</h3>
                <p className="text-slate-500 text-center max-w-[280px] mt-2 mb-8 font-medium">
                  Personalizza la tua offerta culinaria aggiungendo il primo piatto.
                </p>
                <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-brand-red transition-all shadow-lg active:scale-95">
                   Crea il primo piatto
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
