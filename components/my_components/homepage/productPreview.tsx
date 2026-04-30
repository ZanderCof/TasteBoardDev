"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Package, Users } from "lucide-react";

export function ProductPreview() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorazione di sfondo */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-yellow-100/40 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-6xl text-center">
        <div className="mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Tutto sotto controllo, <span className="text-red-600 font-serif italic text-5xl">ovunque</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Dall&apos;analisi del Food Cost alla gestione dei turni. Tasteboard ti offre una visuale a 360&deg; sulla tua attività.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl p-4 md:p-8 overflow-hidden"
        >
          {/* Fake Header Dashboard */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl italic">T</div>
              <div>
                <h4 className="font-bold text-slate-900">Dashboard Analisi</h4>
                <p className="text-xs text-slate-400">Aggiornato: un minuto fa</p>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200" />
              ))}
            </div>
          </div>

          {/* Bento Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* KPI Principale */}
            <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white text-left relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-red-600/20 transition-colors">
                <BarChart3 size={120} />
               </div>
               <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Vendite Totali Mensili</p>
                <h3 className="text-5xl font-extrabold text-yellow-400">€ 24.850,00</h3>
                <div className="mt-4 flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <TrendingUp size={16} /> +12.5% rispetto al mese precedente
                </div>
               </div>
            </div>

            {/* Food Cost Alert */}
            <div className="bg-red-50 rounded-3xl p-8 border border-red-100 text-left">
              <div className="w-12 h-12 bg-red-600 text-white rounded-2xl flex items-center justify-center mb-6">
                <Package size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Food Cost Alert</h4>
              <p className="text-sm text-slate-500 mb-4">L&apos;aumento del costo della farina ha ridotto il margine sulla &quot;Pizza Margherita&quot; del 4%.</p>
              <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full w-3/4" />
              </div>
            </div>

            {/* Employee Management */}
            <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-100 text-left">
              <div className="w-12 h-12 bg-yellow-400 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Turni Personale</h4>
              <p className="text-sm text-slate-500">3 dipendenti in servizio oggi. Marco ha richiesto ferie per il weekend.</p>
              <div className="mt-4 flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-yellow-200 border-2 border-white" />
                ))}
                <div className="w-8 h-8 rounded-full bg-white border-2 border-yellow-100 flex items-center justify-center text-[10px] font-bold">+2</div>
              </div>
            </div>

            {/* Piatti più venduti */}
            <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 text-left">
               <h4 className="font-bold text-slate-900 mb-6">Top Performance Piatti</h4>
               <div className="space-y-4">
                  {[
                    { name: "Carbonara Special", qty: 450, color: "bg-yellow-400" },
                    { name: "Pizza Margherita", qty: 380, color: "bg-red-600" },
                    { name: "Tiramisù", qty: 290, color: "bg-slate-900" }
                  ].map((p, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>{p.name}</span>
                        <span className="text-slate-400">{p.qty} ordini</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(p.qty/450)*100}%` }}
                          transition={{ duration: 1, delay: i*0.2 }}
                          className={`${p.color} h-full`} 
                        />
                      </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
