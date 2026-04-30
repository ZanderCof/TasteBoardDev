"use client";

import React from "react";
import { Plus, LayoutGrid, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import MenuListCard from "@/components/my_components/dashboard/menu/MenuListCard";
import CreateMenuCard from "@/components/my_components/dashboard/menu/CreateMenuCard";

export default function MenuListPage() {
  return (
    <div className="space-y-8 font-jakarta">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Gestione <span className="text-brand-red">Menu</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Crea e attiva i listini per il tuo locale.
          </p>
        </div>
        <Link href="/dashboard/menu/create">
          <button className="bg-brand-red text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-red-200 transition-all flex items-center gap-2">
            <Plus size={20} /> Nuovo Menu
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Card per creare nuovo menu */}
        <CreateMenuCard />

        {/* I tuoi menu esistenti */}
        <MenuListCard
          title="Menu Principale 2024"
          dishesCount={42}
          categoriesCount={8}
          isActive={true}
          lastUpdate="Oggi, 10:30"
        />

        <MenuListCard
          title="Specialità di Stagione"
          dishesCount={15}
          categoriesCount={2}
          isActive={false}
          lastUpdate="Ieri"
        />
      </div>
    </div>
  );
}
