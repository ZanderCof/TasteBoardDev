"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Zap, 
  MousePointer2, 
  Rocket, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WebLinePromoPage() {
  return (
    <div className="min-h-screen bg-white font-jakarta overflow-hidden">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-100/50 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-violet-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-32 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center space-y-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 border border-violet-100 rounded-full text-violet-600 shadow-sm"
          >
            <Sparkles size={14} className="fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nuviio Presenta</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-none"
          >
            Il tuo locale merita <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              una vetrina pro.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto font-medium"
          >
            Con <b>WebLine</b> trasformiamo i dati del tuo gestionale TasteBoard in un sito web moderno, 
            veloce e ottimizzato per Google. Zero sforzo, massimo impatto.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <Button className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-violet-600 text-white font-bold text-lg transition-all shadow-xl shadow-slate-200 gap-2">
              Attiva WebLine <ArrowRight size={20} />
            </Button>
            <p className="text-sm text-slate-400 font-medium italic">Manutenzione e Hosting inclusi.</p>
          </motion.div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            {
              icon: Zap,
              title: "Sincronizzazione Live",
              desc: "Modifica un prezzo su TasteBoard e il sito si aggiorna in un secondo. Senza toccare codice.",
              color: "blue"
            },
            {
              icon: Smartphone,
              title: "Mobile First",
              desc: "Il 90% dei tuoi clienti prenota da smartphone. Il tuo nuovo sito sarà perfetto su ogni schermo.",
              color: "violet"
            },
            {
              icon: MousePointer2,
              title: "Prenotazioni Dirette",
              desc: "Ricevi prenotazioni direttamente sul tuo sito, abbattendo le commissioni dei portali esterni.",
              color: "blue"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-violet-100 transition-all group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3",
                item.color === "blue" ? "bg-blue-50 text-blue-600" : "bg-violet-50 text-violet-600"
              )}>
                <item.icon size={30} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* --- PROMO CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-gradient-to-br from-blue-600 to-violet-700 p-12 md:p-20 text-white overflow-hidden shadow-2xl shadow-blue-200"
        >
          {/* Abstract pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://transparenttextures.com')]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Rocket size={14} className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upgrade Disponibile</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Non lasciarlo <br /> diventare vecchio.
              </h2>
              <p className="text-lg text-blue-50/80 font-medium leading-relaxed">
                Offriamo un servizio di manutenzione mensile che include aggiornamenti di sicurezza, 
                modifiche illimitate ai contenuti e hosting ultra-rapido.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-emerald-400" />
                  <span className="text-sm font-bold">Sicurezza SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-emerald-400" />
                  <span className="text-sm font-bold">Dominio Personalizzato</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[3rem] p-8 md:p-12 space-y-6">
               <div className="space-y-2">
                 <p className="text-blue-100 font-bold uppercase text-xs tracking-widest">Abbonamento WebLine</p>
                 <h4 className="text-5xl font-black italic tracking-tighter">€49<span className="text-xl not-italic opacity-60">/mese</span></h4>
               </div>
               <ul className="space-y-4 pt-4 border-t border-white/10">
                 {["Sito Web Dinamico", "Manutenzione Pro", "Hosting Cloud", "Supporto Prioritario"].map((li, i) => (
                   <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                     <div className="w-1.5 h-1.5 bg-blue-300 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                     {li}
                   </li>
                 ))}
               </ul>
               <Button className="w-full h-14 rounded-2xl bg-white text-violet-700 font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all active:scale-95">
                 Configura il mio sito
               </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Utility function for class names
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}