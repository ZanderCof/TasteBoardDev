// app/(account)/(dashboard)/dashboard/tables/page.tsx
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Armchair, Users } from "lucide-react";
import { DeleteTableButton } from "@/components/my_components/dashboard/tables/DeleteTableButton";
import { AddTableDialog } from "@/components/my_components/dashboard/tables/AddTableDialog";

type PageProps = {
  searchParams: Promise<{ restaurantId?: string }>;
};

export default async function TablesPage({ searchParams }: PageProps) {
  const { restaurantId: restaurantParam } = await searchParams;
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  // Trova il ristorante attivo
  let currentRestaurantId = restaurantParam;
  if (!currentRestaurantId) {
    const firstRestaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!firstRestaurant) redirect("/dashboard/restaurants/new");
    currentRestaurantId = firstRestaurant.id;
  }

  // Recupera i tavoli del locale ordinati per nome
  const tables = await prisma.table.findMany({
    where: { restaurantId: currentRestaurantId },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Sala e <span className="text-red-600">Tavoli</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Configura la mappa dei tavoli per gestire la capienza delle prenotazioni
          </p>
        </div>
        <AddTableDialog restaurantId={currentRestaurantId} />
      </header>

      {/* LISTA TAVOLI */}
      {tables.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tables.map((table) => (
            <Card key={table.id} className="border-slate-100 shadow-sm bg-white hover:shadow-md transition-all rounded-2xl overflow-hidden group">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-bold">
                      <Armchair size={16} />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 tracking-tight">{table.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg w-fit">
                    <Users size={12} className="text-slate-400" />
                    Da {table.minCapacity} a {table.maxCapacity} coperti
                  </div>
                </div>
                
                {/* Bottone per eliminare il tavolo al passaggio del mouse */}
                <DeleteTableButton tableId={table.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 mx-auto border border-dashed border-slate-200 text-slate-300">
            <Armchair size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-800 mb-1">Nessun tavolo inserito</h3>
          <p className="text-slate-400 font-medium text-sm mb-6">
            Aggiungi i tavoli della tua sala per iniziare a ricevere e organizzare le prenotazioni.
          </p>
        </div>
      )}
    </div>
  );
}