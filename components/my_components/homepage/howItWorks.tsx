"use client";

import { motion } from "framer-motion";
import { PlusCircle, QrCode, Smartphone, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Configura il Locale",
      desc: "Carica i tuoi piatti, imposta i prezzi e personalizza le categorie con il tuo stile.",
      icon: <PlusCircle size={32} />,
    },
    {
      title: "Genera i QR Code",
      desc: "Scarica e stampa i codici QR unici per ogni tavolo o per l'asporto.",
      icon: <QrCode size={32} />,
    },
    {
      title: "Servi i tuoi Clienti",
      desc: "I clienti scansionano e ordinano. Tu ricevi i dati e analizzi l'andamento in tempo reale.",
      icon: <Smartphone size={32} />,
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Linea di connessione tratteggiata (visibile solo su desktop) */}
      <div className="hidden lg:block absolute top-[55%] left-1/2 -translate-x-1/2 w-2/3 h-[2px] border-t-2 border-dashed border-yellow-300 -z-0" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Pronto in <span className="text-red-600">3 semplici step</span>
          </h2>
          <p className="mt-4 text-slate-500 font-medium">
            Senza installazioni complesse o hardware costoso.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Cerchio con numero e icona */}
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-[2rem] bg-yellow-400 flex items-center justify-center text-slate-900 shadow-lg shadow-yellow-100 group-hover:rotate-12 transition-transform duration-300">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm border-4 border-white">
                  {i + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed italic">
                &ldquo;{step.desc}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action rapida sotto gli step */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-red-600 transition-all cursor-pointer">
            Inizia ora la configurazione <ArrowRight size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
