"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BusinessInfoCard } from "@/components/my_components/dashboard/store/editStore/BusinessInfoCard";
import { SettingsActionToolbar } from "@/components/my_components/dashboard/store/editStore/SettingsActionToolbar";
import { StoreHeader } from "@/components/my_components/dashboard/store/StoreHeader";
import { Trash2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  deleteStore,
  updateStore,
} from "@/app/(account)/(dashboard)/dashboard/store/[id]/action";

interface StoreEditPageProps {
  initialData: {
    id: string;
    name: string;
    address?: string | null;
    piva?: string | null;
    phone?: string | null;
    isLive?: boolean;
  };
}

export default function StoreEditPage({ initialData }: StoreEditPageProps) {
  const params = useParams();
  const router = useRouter();

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [store, setStore] = useState({
    name: initialData.name || "",
    address: initialData.address || "",
    piva: initialData.piva || "",
    phone: initialData.phone || "",
    isLive: initialData.isLive || false,
  });

  const handleUpdate = (fields: Partial<typeof store>) => {
    setStore((prev) => ({ ...prev, ...fields }));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateStore(params.id as string, store);

    if (result.success) {
      toast.success("Locale aggiornato con successo!");
      setIsDirty(false);
      router.refresh();
    } else {
      toast.error("Errore nel salvataggio");
    }
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (
      confirm(
        "Sei sicuro di voler eliminare questo locale? L'azione è irreversibile.",
      )
    ) {
      const result = await deleteStore(params.id as string);
      if (result.success) {
        toast.success("Locale eliminato definitivamente");
        router.push("/dashboard");
      } else {
        toast.error("Errore durante l'eliminazione");
      }
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32 px-4 pt-8 font-jakarta">
      {/* HEADER */}
      <StoreHeader
        name={store.name}
        slug={store.name.toLowerCase().replace(/\s+/g, "-")}
        onUpdateName={(newName) => handleUpdate({ name: newName })}
      />

      {/* INFO AZIENDALI */}
      <BusinessInfoCard
        address={store.address}
        piva={store.piva}
        phone={store.phone}
        onUpdate={handleUpdate}
        type={""} isLive={false}      />

      {/* SEZIONE PERICOLO - ELIMINA LOCALE (Aggiornata) */}
      <section className="bg-red-50/30 border-2 border-dashed border-red-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-black text-red-900 leading-none mb-1">
              Attenzione
            </h3>
            <p className="text-sm text-red-600/70 font-medium italic">
              L&apos;eliminazione del locale è permanente e non può essere
              annullata.
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDelete}
          className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-red-100 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm"
        >
          <Trash2 size={16} />
          Elimina Locale
        </motion.button>
      </section>

      {/* TOOLBAR SALVATAGGIO */}
      <SettingsActionToolbar
        isDirty={isDirty}
        isLoading={isSaving}
        onSave={handleSave}
        onReset={() => {
          setStore({
            name: initialData.name || "",
            address: initialData.address || "",
            piva: initialData.piva || "",
            phone: initialData.phone || "",
            isLive: initialData.isLive || false,
          });
          setIsDirty(false);
        }}
      />
    </div>
  );
}
