"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Utensils } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Sfondo Rosso Intenso */}
      <div className="absolute inset-0 bg-red-600 -z-20" />
      
      {/* Decorazioni astratte gialle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400 opacity-20 blur-[100px] -z-10 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 opacity-10 blur-[120px] -z-10 translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Icona fluttuante */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-2xl rotate-3 mb-4">
            <Utensils className="text-red-600" size={40} />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Pronto a trasformare il tuo <br />
            <span className="text-yellow-400 italic">modo di lavorare?</span>
          </h2>

          <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Unisciti ai ristoratori che hanno già scelto Tasteboard. 
            Metti in tavola la tecnologia, riduci gli sprechi e aumenta i tuoi profitti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-10 h-16 text-xl font-bold rounded-2xl shadow-xl shadow-red-700/50 transition-all hover:scale-105 group"
            >
              Crea il tuo menu gratis
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-10 h-16 text-xl font-bold rounded-2xl"
            >
              Parla con un esperto
            </Button>
          </div>

          <p className="text-red-200 text-sm font-semibold flex items-center justify-center gap-2">
            <ArrowRight size={14} /> Nessuna carta di credito richiesta
          </p>
        </motion.div>
      </div>
    </section>
  );
}
