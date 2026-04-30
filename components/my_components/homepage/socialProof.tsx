"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProof() {
  const partners = [
    "Ristorante Roma",
    "Bar Centrale",
    "Pizzeria Bella",
    "Bistrot Milano",
    "Sushi Zen",
    "The Burger Lab"
  ];

  return (
    <section className="w-full py-16 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Elemento decorativo giallo tenue */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1/2 h-full bg-yellow-50/30 skew-x-12 -z-10" />

      <div className="container mx-auto px-6 max-w-6xl text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3 mb-10"
        >
          {/* Valutazione "fake" ma d'impatto */}
          <div className="flex gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Già scelto da oltre <span className="text-red-600">150+</span> attività in Italia
          </p>
        </motion.div>

        {/* Griglia Loghi / Nomi */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="text-slate-400 font-medium hover:text-red-600 transition-colors cursor-default select-none grayscale hover:grayscale-0"
            >
              <span className="text-lg md:text-xl tracking-tight opacity-80 italic">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Feedback rapido sottostante */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-slate-500 text-sm italic"
        >
          &ldquo;Da quando usiamo <span className="font-bold text-slate-700">Tasteboard</span>, il tempo di aggiornamento dei menu è passato da giorni a secondi.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
