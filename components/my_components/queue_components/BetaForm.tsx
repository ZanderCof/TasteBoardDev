"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const BetaForm = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <form className="flex flex-col gap-3">
        <div className="relative group">
          <Input 
            type="email" 
            placeholder="example@email.com" 
            className="h-14 rounded-2xl border-slate-200 bg-white/50 backdrop-blur-sm focus:ring-yellow-500 pr-32"
          />
          <Button 
            className="absolute right-1.5 top-1.5 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-6 font-bold"
          >
            Unisciti <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <p className="text-[11px] text-center text-slate-400">
          Stato coda <span className="text-slate-900 font-bold italic">0+ ristoratori </span> già in lista d&apos;attesa.
        </p>
      </form>
    </motion.div>
  );
};
