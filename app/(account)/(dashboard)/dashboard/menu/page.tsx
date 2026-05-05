import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { auth } from "@/auth"; // Importa auth per recuperare la sessione
import MenuListCard from "@/components/my_components/dashboard/menu/MenuListCard";
import CreateMenuCard from "@/components/my_components/dashboard/menu/CreateMenuCard";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { redirect } from "next/navigation";

export default async function MenuListPage() {
  // 1. Recuperiamo la sessione dell'utente loggato
  const session = await auth();

  // 2. Protezione: se non c'è sessione, rimandiamo al login
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 3. Query FILTRATA: prendiamo solo i menu del ristorante collegato all'userId
  const menusFromDb = await prisma.menu.findMany({
    where: {
      restaurant: {
        userId: session.user.id, // Filtra per l'ID dell'utente loggato
      },
    },
    include: {
      _count: {
        select: { categories: true },
      },
      categories: {
        include: {
          _count: {
            select: { dishes: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // 4. Mappiamo i dati per la UI
  const menus = menusFromDb.map((m) => ({
    id: m.id,
    title: m.name || "Menu senza nome",
    isActive: m.isPublished,
    categoriesCount: m._count.categories,
    dishesCount: m.categories.reduce((acc, cat) => acc + cat._count.dishes, 0),
    lastUpdate: format(m.createdAt, "dd MMM, HH:mm", { locale: it }),
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
          <div className="bg-red-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer">
            <Plus size={20} /> Nuovo Menu
          </div>
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
          <p className="col-span-full text-slate-400 text-sm italic">
            Non ci sono ancora menu caricati per il tuo locale.
          </p>
        )}
      </div>
    </div>
  );
}
