// components/my_components/pricing/pricing-card.tsx
"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Plan {
  popular: boolean;
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
}

export function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 rounded-[2.5rem] border backdrop-blur-md transition-all duration-300 flex flex-col ${
        plan.popular 
          ? "bg-slate-900 text-white border-slate-900 shadow-2xl scale-105 z-10" 
          : "bg-white/40 border-white/50 text-slate-900 shadow-xl"
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg">
          Più Scelto
        </span>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2 tracking-tight">{plan.name}</h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-black italic ${plan.popular ? "text-yellow-400" : "text-red-600"}`}>
            €{plan.price}
          </span>
          <span className={plan.popular ? "text-slate-400" : "text-slate-500"}>/mese</span>
        </div>
        <p className={`mt-4 text-sm font-medium ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
          {plan.description}
        </p>
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feature: string, idx: number) => (
          <li key={idx} className="flex items-center gap-3 text-sm">
            <Check size={18} className={plan.popular ? "text-yellow-400" : "text-red-600"} />
            <span className={plan.popular ? "text-slate-200" : "text-slate-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        className={`w-full h-14 rounded-2xl text-lg font-bold transition-transform hover:scale-[1.02] ${
          plan.popular 
            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20" 
            : "bg-white border-2 border-slate-100 text-slate-900 hover:bg-slate-50"
        }`}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}
