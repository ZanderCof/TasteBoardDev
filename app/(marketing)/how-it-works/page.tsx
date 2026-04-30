"use client";

import { motion } from "framer-motion";
import { PlusCircle, QrCode, Smartphone } from "lucide-react";

// Importa i tuoi componenti separati
import { StepCard } from "@/components/my_components/howItWorks/stepCard";
import { WhyChooseUs } from "@/components/my_components/howItWorks/whyChooseUs";
import { CustomerExperience } from "@/components/my_components/howItWorks/customerExperience";
import { ComparisonTable } from "@/components/my_components/howItWorks/comparisonTable";
import { FAQSection } from "@/components/my_components/howItWorks/FAQSection";

export default function ComeFunzionaPage() {
  const steps = [
    {
      number: "01",
      title: "Crea il tuo menu digitale",
      desc: "Inserisci piatti, prezzi e categorie in pochi minuti. Gestisci tutto da una dashboard intuitiva, pensata per essere immediata anche senza competenze tecniche.",
      icon: <PlusCircle size={32} />,
      color: "red"
    },
    {
      number: "02",
      title: "Genera il tuo QR personalizzato",
      desc: "Crea un QR code unico per il tuo locale e rendilo subito operativo su tavoli, vetrine, volantini o servizio delivery.",
      icon: <QrCode size={32} />,
      color: "yellow"
    },
    {
      number: "03",
      title: "Aggiorna tutto in tempo reale",
      desc: "Modifica prezzi, piatti o disponibilità in qualsiasi momento. Le modifiche sono istantanee e visibili ai clienti senza attese.",
      icon: <Smartphone size={32} />,
      color: "red"
    }
  ];

  return (
    <div className="relative min-h-screen pt-32 overflow-hidden bg-slate-50">
      
      {/* 1. SFONDO DINAMICO GLOBALE */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-400/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[30%] right-10 w-96 h-96 bg-yellow-400/10 rounded-full blur-[150px]" />
      </div>

      {/* 2. SEZIONE STEPS */}
      <section className="container mx-auto px-6 max-w-5xl mb-32">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter"
          >
            Digitalizzare il tuo menu è <span className="text-red-600">immediato</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Tasteboard è pensato per essere semplice da usare fin dal primo minuto, senza formazione e senza complicazioni.
          </p>
        </div>

        <div className="grid gap-12 relative">
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-200 via-yellow-200 to-transparent" />
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* 3. ALTRE SEZIONI */}
      
      <CustomerExperience />
      
      <ComparisonTable />
      
      <WhyChooseUs />
      
      <FAQSection />

      <div className="pb-20" />
      
    </div>
  );
}