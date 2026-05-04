"use client";
import React, { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { AddStoreCard } from "@/components/my_components/dashboard/store/AddStoreCard";
import { getMyStores } from "./actions";
import { StoreCard } from "@/components/my_components/dashboard/store/StoreCard";

export default function StoreSettingsPage() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getMyStores();
      setStores(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin text-slate-300" size={40} /></div>;

  return (
    <div className="space-y-12 font-jakarta max-w-[1200px] mx-auto pb-24 px-4 pt-8">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">I tuoi <span className="text-red-600">Locali</span></h1>
          <p className="text-slate-500 font-medium">Gestisci e monitora i tuoi punti vendita attivi.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
        
        {/* Card per aggiungere un nuovo locale sempre alla fine */}
        <AddStoreCard />
      </div>
    </div>
  );
}
