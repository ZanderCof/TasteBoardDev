"use client";
import React, { useState } from "react";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import { StoreHeader } from "@/components/my_components/dashboard/store/StoreHeader";
import { BrandIdentityCard } from "@/components/my_components/dashboard/store/BrandIdentityCard";
import { StorePreviewCard } from "@/components/my_components/dashboard/store/StorePreviewCard";
import { AddStoreCard } from "@/components/my_components/dashboard/store/AddStoreCard";

export default function StoreSettingsPage() {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="space-y-8 font-jakarta max-w-[1200px] mx-auto pb-24">
      {/* Intestazione: Nome, Link e Switch Live */}
      <StoreHeader
        name="Ristorante Da Mario"
        slug="da-mario-roma"
        isLive={isLive}
        setIsLive={setIsLive}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLONNA PRINCIPALE (SINISTRA) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Identità del brand: Logo, Nome, Bio */}
          <BrandIdentityCard />

          {/* Spazio per i prossimi componenti: Contatti, Social e Orari */}
          {/* <div className="p-12 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center">
             <p className="text-slate-400 font-medium italic">Prossimo step: Gestione Orari e Contatti</p>
          </div> */}
        </div>

        {/* COLONNA LATERALE (DESTRA) - Resta fissa durante lo scroll */}
        {/* <div className="lg:col-span-4 sticky top-6">
          <StorePreviewCard />
        </div> */}
      </div>

      <div className="lg:col-span-8 space-y-8">
        {/* Altri componenti... */}

        <div className="pt-4">
          <AddStoreCard />
        </div>
      </div>

      {/* Floating Save Button - Sempre visibile in basso a destra */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 right-8 z-50 shadow-2xl"
      >
        <button className="bg-green-800 hover:bg-brand-red text-white px-8 py-4 rounded-[2rem] font-black flex items-center gap-3 transition-all active:scale-95 group">
          <Save
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          Salva Modifiche
        </button>
      </motion.div>
    </div>
  );
}
