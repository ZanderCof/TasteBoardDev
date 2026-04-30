"use client";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export function CustomerExperience() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider">
              User Experience
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              L&apos;esperienza che i tuoi <br />
              <span className="text-red-600 italic">clienti ameranno.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Niente attese, niente menu spiegazzati. Il cliente inquadra, sceglie e ordina. La velocità del digitale con il gusto del tuo locale.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { t: "Filtri Allergeni", d: "I clienti possono filtrare i piatti in base alle proprie esigenze." },
                { t: "Traduzione Automatica", d: "Il menu parla la lingua del tuo cliente." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{item.t}</h4>
                    <p className="text-sm text-slate-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mockup Mobile */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-red-600/10 rounded-full blur-[100px] -z-10" />
            <motion.div 
              initial={{ rotate: -5 }}
              whileInView={{ rotate: 0 }}
              className="relative w-[280px] h-[580px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center">
                <div className="w-20 h-4 bg-slate-900 rounded-b-xl" />
              </div>
              <div className="p-4 pt-10 bg-white h-full">
                <div className="h-32 bg-red-600 rounded-2xl mb-4 p-4 text-white flex flex-col justify-end">
                  <p className="text-xs opacity-80 uppercase font-bold">Menu del Giorno</p>
                  <h4 className="text-lg font-bold">Bistrot Taste</h4>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 items-center p-2 border-b border-slate-50">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg" />
                      <div className="flex-1 space-y-1">
                        <div className="h-3 w-2/3 bg-slate-200 rounded" />
                        <div className="h-2 w-1/3 bg-slate-100 rounded" />
                      </div>
                      <div className="text-red-600 font-bold text-xs">€12</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
