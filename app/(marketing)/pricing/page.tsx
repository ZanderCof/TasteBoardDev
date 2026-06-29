"use client";
import { PricingCard } from "@/components/my_components/pricing/pricing-card";
import { PricingFaq } from "@/components/my_components/pricing/pricing-faq";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Essential",
    price: 29,
    description: "Ideale per piccoli bar e chioschi.",
    features: ["Menu QR illimitati", "Aggiornamenti Live", "Gestione Categorie", "Supporto Email"],
    cta: "Inizia ora",
    popular: false
  },
  {
    name: "Pro",
    price: 59,
    description: "Tutto quello che serve per un ristorante.",
    features: ["Tutto del piano Light", "Gestione Dipendenti & Turni", "Food Cost & Inventario", "Analisi Vendite Avanzate", "Supporto WhatsApp 24/7"],
    cta: "Prova Gratis",
    popular: true
  },
  {
    name: "Business",
    price: 99,
    description: "Per catene e franchising multi-locale.",
    features: ["Multi-tenant (più sedi)", "Account Manager dedicato", "Integrazione POS", "Reportistica Personalizzata"],
    cta: "Contattaci",
    popular: false
  }
];

export default function PrezziPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 bg-slate-50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-red-50 to-transparent -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6"
          >
            Piani <span className="text-red-600">Semplici</span>
          </motion.h1>
          <p className="text-xl text-slate-500 font-medium">Scegli la soluzione più adatta alla tua attività.</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} index={i} />
          ))}
        </div>

        <PricingFaq />
      </div>
    </div>
  );
}
