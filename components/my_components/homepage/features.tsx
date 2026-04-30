"use client";

import { motion } from "framer-motion";
import { QrCode, UtensilsCrossed, Zap, BarChart3, Clock, ClipboardList } from "lucide-react";

const features = [
  {
    title: "Menu Digitale",
    desc: "Personalizza il design e organizza piatti e bevande in categorie eleganti.",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "QR Code Dinamici",
    desc: "Un unico codice per tavoli o asporto. Personalizzalo con il tuo logo.",
    icon: <QrCode className="w-6 h-6" />,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Aggiornamenti Live",
    desc: "Finita la burrata? Nascondi il piatto dal menu in un click, in tempo reale.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Analisi Vendite",
    desc: "Scopri i piatti più visti e ottimizza il tuo inventario basandoti sui dati.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Gestione Turni",
    desc: "Organizza il personale e gestisci le ferie senza fogli Excel o messaggi persi.",
    icon: <Clock className="w-6 h-6" />,
    color: "bg-yellow-100 text-yellow-600"
  },
  {
    title: "Inventario e Bolle",
    desc: "Carica le fatture e monitora le giacenze per non restare mai senza scorte.",
    icon: <ClipboardList className="w-6 h-6" />,
    color: "bg-red-100 text-red-600"
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-600 mb-4">
            Funzionalità
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Gestire un locale non è mai stato così <span className="underline decoration-yellow-400">fluido</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-[2rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-red-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              
              <h4 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                {f.title}
              </h4>
              
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
