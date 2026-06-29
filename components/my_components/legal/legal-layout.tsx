"use client";

import { motion } from "framer-motion";
import { FileText, ChevronRight, Scale } from "lucide-react";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-24 selection:bg-red-100 selection:text-red-900">
      
      {/* Background Elements - Molto tenui per non distrarre */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-50/50 via-transparent to-transparent -z-10" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[240px_1fr] gap-16 items-start">
          
          {/* SIDEBAR DI SUPPORTO (Sticky) */}
          <aside className="hidden lg:block sticky top-32 space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Documento</p>
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Scale size={18} className="text-red-600" />
                <span>Ufficio Legale</span>
              </div>
            </div>

            <nav className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigazione</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li className="flex items-center gap-2 text-red-600">
                   <ChevronRight size={14} /> Introduzione
                </li>
                <li className="flex items-center gap-2 hover:text-slate-800 cursor-pointer transition-colors">
                   Definizioni
                </li>
                <li className="flex items-center gap-2 hover:text-slate-800 cursor-pointer transition-colors">
                   I tuoi diritti
                </li>
              </ul>
            </nav>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-700 leading-relaxed font-medium">
                Hai domande? <br />
                <span className="font-bold underline cursor-pointer">Contattaci</span>
              </p>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-[1.5rem] sm:rounded-[3rem] p-4 sm:p-8 md:p-16 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
              
              {/* Floating Badge */}
              <div className="flex items-center gap-2 mb-8">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <FileText size={16} />
                </div>
                <div className="h-px w-8 bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tasteboard Official Document</span>
              </div>

              <header className="mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
                  {title}
                </h1>
                <div className="flex items-center gap-4 py-4 border-y border-slate-50">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Versione 2.0
                  </p>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <p className="text-slate-500 text-xs font-medium italic">
                    Aggiornato il {lastUpdated}
                  </p>
                </div>
              </header>

              {/* L'articolo reale */}
              <div
                className="prose prose-slate max-w-none 
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl prose-h2:border-l-4 prose-h2:border-red-600 prose-h2:pl-6 prose-h2:mt-12
                prose-p:text-slate-600 prose-p:text-lg prose-p:leading-[1.8]
                prose-li:text-slate-600 prose-li:text-lg
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-a:text-red-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
              >
                {children}
              </div>

              {/* Footer del documento */}
              <footer className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                   <span>Tasteboard Legal</span>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="text-xs font-bold text-slate-900 hover:text-red-600 flex items-center gap-2 transition-colors"
                >
                  Stampa documento
                </button>
              </footer>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
