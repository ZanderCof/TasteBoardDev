// app/(account)/(dashboard)/dashboard/menu/page.tsx
import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import MenuListCard from "@/components/my_components/dashboard/menu/MenuListCard";
import CreateMenuCard from "@/components/my_components/dashboard/menu/CreateMenuCard";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default async function MenuListPage() {
  // 1. Query aggiornata: puntiamo a PRISMA.MENU
  const menusFromDb = await prisma.menu.findMany({
    include: {
      _count: {
        select: { categories: true }
      },
      categories: {
        include: {
          _count: {
            select: { items: true } // Conta i piatti per ogni categoria
          }
        }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  // 2. Mappiamo i dati basandoci sulla nuova struttura
  const menus = menusFromDb.map(m => ({
    id: m.id,
    title: m.title, // Ora usa il titolo reale del menu (es. "Menu Estivo")
    isActive: m.isActive,
    categoriesCount: m._count.categories,
    // Sommiamo i piatti di tutte le categorie presenti in questo menu
    dishesCount: m.categories.reduce((acc, cat) => acc + cat._count.items, 0),
    lastUpdate: format(m.updatedAt, "dd MMM, HH:mm", { locale: it })
  }));

  return (
    <div className="space-y-8 font-jakarta">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 uppercase">
            Gestione <span className="text-red-600">Menu</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Crea e gestisci i listini per i tuoi locali.
          </p>
        </div>
        <Link href="/dashboard/menu/create">
          <button className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
            <Plus size={20} /> Nuovo Menu
          </button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <CreateMenuCard />

        {menus.length > 0 ? (
          menus.map((menu) => (
            <MenuListCard
              key={menu.id}
              title={menu.title}
              dishesCount={menu.dishesCount}
              categoriesCount={menu.categoriesCount}
              isActive={menu.isActive}
              lastUpdate={menu.lastUpdate}
            />
          ))
        ) : (
          /* Messaggio opzionale se non ci sono menu oltre alla card di creazione */
          <p className="col-span-full text-slate-400 text-sm italic">
            Non ci sono ancora menu caricati. Clicca su &quot;Nuovo Menu&quot; per iniziare.
          </p>
        )}
      </div>
    </div>
  );
}
