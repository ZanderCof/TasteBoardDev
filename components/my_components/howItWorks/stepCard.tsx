// components/my_components/how-it-works/step-card.tsx
"use client";

import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export function StepCard({ step, index }: { step: Step; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* CONTENITORE SFOCATO (VETRO) */}
      <div className="flex-1 w-full p-8 rounded-[2.5rem] border border-white/50 bg-white/40 backdrop-blur-md shadow-xl shadow-slate-200/50 group hover:bg-white/60 transition-all">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
          step.color === "red" ? "bg-red-600 text-white" : "bg-yellow-400 text-slate-900"
        }`}>
          {step.icon}
        </div>
        
        <span className="text-sm font-bold text-red-600 uppercase tracking-widest">Step {step.number}</span>
        <h3 className="text-2xl font-black text-slate-900 mt-2 mb-4">{step.title}</h3>
        <p className="text-slate-600 leading-relaxed font-medium">
          {step.desc}
        </p>
      </div>

      {/* SPAZIATORE PER LA LINEA CENTRALE */}
      <div className="hidden md:flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full bg-white border-4 border-red-600 shadow-xl flex items-center justify-center font-bold text-slate-900">
          {step.number}
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}
