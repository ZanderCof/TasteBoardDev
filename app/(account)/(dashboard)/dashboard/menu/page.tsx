import prisma from "@/lib/prisma";
import { auth } from "@/auth"; 
import CreateMenuCard from "@/components/my_components/dashboard/menu/CreateMenuCard";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { redirect } from "next/navigation";
import MenuListCard from "@/components/my_components/dashboard/menu/MenuListCard";

// Aggiungiamo searchParams per leggere l'ID dall'URL
export default async function MenuListPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ restaurantId?: string }> 
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resolvedSearchParams = await searchParams;
  const urlRestaurantId = resolvedSearchParams.restaurantId;

  // 1. Cerchiamo il ristorante (quello dell'URL o il primo disponibile)
  const restaurant = await prisma.restaurant.findFirst({
    where: { 
      userId: session.user.id,
      ...(urlRestaurantId ? { id: urlRestaurantId } : {}) // Se c'è l'ID nell'URL, prendi quello
    },
    orderBy: { createdAt: 'asc' } // Prende il più vecchio (il primo creato) come default
  });

  if (!restaurant) redirect("/onboarding");

  // 2. Query filtrata SOLO per quel ristorante specifico
  const menusFromDb = await prisma.menu.findMany({
    where: {
      restaurantId: restaurant.id, // Filtro diretto per ID Ristorante
    },
    include: {
      _count: { select: { categories: true } },
      categories: {
        include: { _count: { select: { dishes: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

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
          <h1 className="text-3xl font-black text-slate-900 uppercase italic">
            Menu <span className="text-red-600">{restaurant.name}</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Gestione listini per questo locale.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Passiamo l'ID del ristorante alla card di creazione */}
        <CreateMenuCard restaurantId={restaurant.id} />

        {menus.length > 0 ? (
          menus.map((menu) => (
            <MenuListCard
              key={menu.id}
              id={menu.id}
              title={menu.title}
              dishesCount={menu.dishesCount}
              categoriesCount={menu.categoriesCount}
              isActive={menu.isActive}
              lastUpdate={menu.lastUpdate}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-200">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
               Nessun menu creato per questo ristorante
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
