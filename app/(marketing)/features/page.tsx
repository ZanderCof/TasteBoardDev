"use client";

import { BentoFeatures } from "@/components/my_components/features/bento-features";
import { DetailSection } from "@/components/my_components/features/detail-section";
import { FeaturesHero } from "@/components/my_components/features/features-hero";
import { FinalCTA } from "@/components/my_components/homepage/homeCTA";
import { motion } from "framer-motion";


export default function FunzionalitaPage() {
  return (
    <div className="relative min-h-screen  pt-20">
      <FeaturesHero />
      
      <div className="container mx-auto px-6 max-w-7xl pb-24">
        <BentoFeatures />
        
        <div className="space-y-32 mt-32">
          <DetailSection 
            title="Gestione Turni Intelligente"
            subtitle="Dimentica i messaggi su WhatsApp e i fogli di carta. Organizza la tua brigata in pochi secondi."
            image="https://unsplash.com"
            features={["Calendario Drag & Drop", "Richieste ferie digitali", "Notifiche automatiche allo staff"]}
            reversed={false}
          />

          <DetailSection 
            title="Analisi Costi e Food Cost"
            subtitle="Monitora i margini di ogni piatto. Se i fornitori alzano i prezzi, Tasteboard ti avvisa."
            image="https://unsplash.com"
            features={["Calcolo margini automatico", "Gestione bolle d'acquisto", "Alert variazione prezzi"]}
            reversed={true}
          />
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
