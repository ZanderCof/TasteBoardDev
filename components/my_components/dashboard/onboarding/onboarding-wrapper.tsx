"use client";
import { motion } from "framer-motion";

interface OnboardingWrapperProps {
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}

export function OnboardingWrapper({ step, totalSteps, children }: OnboardingWrapperProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="max-w-2xl mx-auto py-2 px-4 sm:px-6">
      {/* Progress Bar */}
      <div className="mb-12 space-y-4">
        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
          <span>Configurazione Locale</span>
          <span>Step {step} di {totalSteps}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          />
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/70 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] border border-white shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
