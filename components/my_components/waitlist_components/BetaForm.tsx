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
      className="w-full max-w-md mx-auto space-y-4"
    >
      <form className="flex flex-col gap-3">

        {/* INPUT WRAPPER */}
        <div className="relative group">

          <Input
            type="email"
            placeholder="Inserisci la tua email"
            className="
              h-14 rounded-2xl
              border border-slate-200
              bg-white/70 backdrop-blur-md
              shadow-sm
              focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
              pr-24 sm:pr-36 transition-all
            "
          />

          <Button
            type="submit"
            className="
              absolute right-1.5 top-1.5
              h-11 rounded-xl
              bg-slate-900 hover:bg-slate-800
              text-white px-3 sm:px-6 font-semibold
              shadow-lg shadow-slate-900/20
              active:scale-[0.98]
              transition-all
            "
          >
            <span className="hidden sm:inline">Entra ora</span>
            <span className="sm:hidden">Entra</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* MICRO COPY */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          Accesso anticipato limitato — priorità ai primi iscritti
        </div>

        {/* SOCIAL PROOF */}
        <p className="text-[12px] text-center text-slate-500">
          <span className="text-slate-900 font-bold">0+ ristoratori</span> già in lista d’attesa
        </p>

      </form>
    </motion.div>
  );
};