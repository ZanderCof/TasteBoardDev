"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { BusinessInfoCard } from "@/components/my_components/dashboard/store/editStore/BusinessInfoCard";
import { SettingsActionToolbar } from "@/components/my_components/dashboard/store/editStore/SettingsActionToolbar";
import { StoreHeader } from "@/components/my_components/dashboard/store/StoreHeader";
import { Loader2 } from "lucide-react";

export default function StoreEditPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Stato del locale
  const [store, setStore] = useState({
    name: "",
    bio: "",
    logo: "",
    address: "",
    piva: "",
    phone: "",
    isLive: false,
  });

  // 1. Simula il fetch dei dati (qui chiamerai il tuo DB)
  useEffect(() => {
    async function loadStore() {
      // Esempio: const data = await getStoreById(params.id);
      setLoading(false);
    }
    loadStore();
  }, [params.id]);

  const handleUpdate = (fields: Partial<typeof store>) => {
    setStore((prev) => ({ ...prev, ...fields }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Chiamata alla Server Action (es: updateStore(params.id, store))
    await new Promise((res) => setTimeout(res, 1000)); // simulazione
    setIsSaving(false);
    setIsDirty(false);
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32 px-4 pt-8">
      {/* 1. Header */}
      <StoreHeader 
        name={store.name || "Nuovo Locale"} 
        slug={store.name.toLowerCase().replace(/\s+/g, "-")} 
        isLive={store.isLive} 
        setIsLive={(val) => handleUpdate({ isLive: val })} 
      />

      {/* 2. Brand Identity */}
      

      {/* 3. Business Info */}
      <BusinessInfoCard 
        address={store.address} 
        piva={store.piva} 
        phone={store.phone} 
        onUpdate={handleUpdate} 
      />

      {/* 4. Toolbar di Salvataggio */}
      <SettingsActionToolbar 
        isDirty={isDirty} 
        isLoading={isSaving} 
        onSave={handleSave} 
        onReset={() => setIsDirty(false)}
      />
    </div>
  );
}
