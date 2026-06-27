"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "29",
    desc: "Perfetto per piccoli bar o chioschi che vogliono solo il digitale.",
    features: ["Menu QR illimitati", "Aggiornamenti in tempo reale", "Supporto email", "1 Utente Admin"],
    icon: <Zap className="text-yellow-500" size={24} />,
    premium: false,
  },
  {
    name: "Pro",
    price: "59",
    desc: "La soluzione completa per ristoranti che vogliono ottimizzare tutto.",
    features: [
      "Tutto del piano Light",
      "Gestione Turni e Personale",
      "Analisi Food Cost & Magazzino",
      "Statistiche vendite avanzate",
      "Supporto Prioritario WhatsApp",
    ],
    icon: <Crown className="text-white" size={24} />,
    premium: true,
  },
];

export function   PricingTeaser() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Investi nella tua <span className="text-red-600">efficienza</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Nessun costo nascosto. Disdici quando vuoi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-8 rounded-[2.5rem] border ${
                plan.premium 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-red-200 scale-105 z-10" 
                  : "bg-slate-50 border-slate-100 text-slate-900"
              }`}
            >
              {plan.premium && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                  Consigliato
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${plan.premium ? "bg-red-600" : "bg-white shadow-sm"}`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black italic">€{plan.price}</span>
                  <p className={`text-xs ${plan.premium ? "text-slate-400" : "text-slate-500"}`}>/mese</p>
                </div>
              </div>

              <p className={`text-sm mb-8 leading-relaxed ${plan.premium ? "text-slate-300" : "text-slate-500"}`}>
                {plan.desc}
              </p>

              <ul className="space-y-4 mb-10 text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check size={18} className={plan.premium ? "text-yellow-400" : "text-red-600"} />
                    <span className={plan.premium ? "text-slate-200" : "text-slate-700"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className={`w-full h-14 rounded-2xl text-lg font-bold transition-all hover:scale-[1.02] ${
                  plan.premium 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-100"
                }`}
              >
                Inizia ora
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-slate-400 text-xs">
          * I prezzi si intendono IVA esclusa. Prova gratuita di 14 giorni inclusa in ogni piano.
        </p>
      </div>
    </section>
  );
}
