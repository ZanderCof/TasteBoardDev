"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function ProblemSolution() {
  const problems = [
    "Menu cartacei costosi da ristampare",
    "Prezzi e piatti non aggiornati",
    "Difficoltà nel gestire i turni",
    "Nessun controllo sui margini reali"
  ];

  const solutions = [
    "Aggiornamenti istantanei e gratuiti",
    "Menu QR dinamici e accattivanti",
    "Gestione staff centralizzata",
    "Analisi food-cost automatizzata"
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Accent decorativo giallo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-50" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Basta sprechi, inizia a <span className="text-red-600">guadagnare</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Abbandona i vecchi metodi analogici. Tasteboard trasforma il caos gestionale in un vantaggio competitivo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* PROBLEMI (The Pain) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] border border-red-100 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertCircle size={120} className="text-red-600" />
            </div>
            
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-600 mb-6">
              <XCircle size={28} />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Prima di Tasteboard</h3>
            <ul className="space-y-4">
              {problems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <XCircle className="text-red-400 mt-1 shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SOLUZIONE (The Dream) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-600 p-8 rounded-[2rem] text-white shadow-xl shadow-red-200 relative overflow-hidden"
          >
            {/* Decorazione Gialla */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 blur-2xl" />
            
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-yellow-300 mb-6 backdrop-blur-sm">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="text-2xl font-bold mb-6">Con Tasteboard</h3>
            <ul className="space-y-4">
              {solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="text-yellow-300 mt-1 shrink-0" size={18} />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-yellow-300 uppercase tracking-wider">Tutto in uno</span>
              <ArrowRight className="text-white/50" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
