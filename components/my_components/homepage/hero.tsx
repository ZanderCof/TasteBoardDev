"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-white">
      {/* Background Decor - Cerchi sfumati gialli/rossi */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-red-50/50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* TESTO */}
          <div className="flex flex-col gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium w-fit"
            >
              <Zap size={16} fill="currentColor" />
              <span>Semplifica la tua gestione</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-slate-900"
            >
              Il gusto di gestire bene con{" "}
              <span className="text-red-600 italic">Tasteboard</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-600 text-lg md:text-xl max-w-[500px] leading-relaxed"
            >
              Crea menu digitali eleganti in 2 minuti. Gestisci dipendenti e
              inventario senza stress, con un occhio costante ai tuoi margini.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/login" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 h-14 text-lg shadow-lg shadow-red-200 transition-all hover:scale-105"
                >
                  Inizia gratis
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-200 px-8 h-14 text-lg hover:bg-slate-50 transition-all"
              >
                Guarda demo
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-slate-500">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="text-red-500" size={18} /> QR Menu
                Incluisi
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="text-red-500" size={18} /> Analisi Food
                Cost
              </div>
            </div>
          </div>

          {/* VISUAL (Mockup più rifinito) */}
          <motion.div
            initial={{ opacity: 0, rotate: 2 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Elemento decorativo giallo dietro al mockup */}
            <div className="absolute -inset-4 bg-yellow-400 rounded-[2.5rem] -rotate-3 -z-10 shadow-inner" />

            <div className="rounded-[2rem] border-[8px] border-slate-900 bg-white shadow-2xl overflow-hidden relative">
              <div className="bg-red-600 p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <Utensils size={24} />
                  <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30" />
                </div>
                <h3 className="text-2xl font-bold italic text-yellow-300">
                  Pizzeria da Mario
                </h3>
                <p className="text-sm opacity-90">I sapori della tradizione</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 border-b pb-2 flex justify-between items-center">
                    Le Pizze Classiche{" "}
                    <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded">
                      POPULAR
                    </span>
                  </h4>
                  <div className="flex justify-between items-center group cursor-default">
                    <div>
                      <p className="font-semibold text-slate-900">Margherita</p>
                      <p className="text-xs text-slate-500">
                        Pomodoro, Mozzarella, Basilico
                      </p>
                    </div>
                    <span className="font-bold text-red-600">€6.50</span>
                  </div>
                  <div className="flex justify-between items-center border-l-4 border-yellow-400 pl-3 py-1 bg-yellow-50/50">
                    <div>
                      <p className="font-semibold text-slate-900">Diavola 🔥</p>
                      <p className="text-xs text-slate-500">
                        Salami piccante, Olive
                      </p>
                    </div>
                    <span className="font-bold text-red-600">€8.00</span>
                  </div>
                </div>

                {/* Statistica "fake" per il gestionale */}
                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-wider">
                    Analisi Food Cost
                  </p>
                  <div className="flex items-end gap-2">
                    <div className="h-12 w-full bg-red-200 rounded-t-sm" />
                    <div className="h-16 w-full bg-yellow-400 rounded-t-sm" />
                    <div className="h-20 w-full bg-red-600 rounded-t-sm" />
                    <div className="h-14 w-full bg-red-200 rounded-t-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating QR Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-red-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  QR Code
                </span>
              </div>
              <p className="text-[10px] font-extrabold text-red-600 uppercase">
                Scan & Eat
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
