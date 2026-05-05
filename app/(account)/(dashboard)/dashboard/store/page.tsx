// app/(account)/(dashboard)/dashboard/store/page.tsx
import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { StoreCard } from "@/components/my_components/dashboard/store/StoreCard";
import { AddStoreCard } from "@/components/my_components/dashboard/store/AddStoreCard";

export default async function StoreSettingsPage() {
  // 1. Recupero sessione sul server
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // 2. Query diretta al DB (molto più veloce dello useEffect)
  const stores = await prisma.restaurant.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-12 font-jakarta max-w-7xl mx-auto pb-24 px-4 pt-8">
      <div className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            I tuoi <span className="text-red-600">Locali</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Gestisci e monitora i tuoi punti vendita attivi.
          </p>
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
