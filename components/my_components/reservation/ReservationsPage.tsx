// app/(account)/(dashboard)/dashboard/bookings/page.tsx
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DatePickerFilter } from "@/components/my_components/reservation/date-picker";
import { ReservationCard } from "@/components/my_components/reservation/ReservationCard";
import { ReservationStats } from "@/components/my_components/reservation/ReservationStats";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type PageProps = {
  searchParams: Promise<{ date?: string; restaurantId?: string }>;
};

export default async function BookingsPage({ searchParams }: PageProps) {
  // 1. 🔐 Sicurezza: Recuperiamo i parametri e controlliamo l'utente sul Server
  const { date: dateParam, restaurantId: restaurantParam } = await searchParams;
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 2. 🏪 Troviamo il ristorante attivo dell'utente loggato
  let currentRestaurantId = restaurantParam;
  if (!currentRestaurantId) {
    const firstRestaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id },
      select: { id: true }
    });
    
    if (!firstRestaurant) {
      redirect("/dashboard/restaurants/new"); 
    }
    currentRestaurantId = firstRestaurant.id;
  }

  // 3. 📅 Gestione date pulita dall'URL (niente useState!)
  const selectedDate = dateParam ? new Date(dateParam) : new Date();
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  // 4. ⚡ Fetch dei dati in parallelo sul Database per massima velocità
  const [bookings, totalTablesCount] = await Promise.all([
    prisma.reservation.findMany({
      where: {
        restaurantId: currentRestaurantId,
        date: { gte: startOfDay, lte: endOfDay },
      },
      include: {
        table: true, // Include la mappa dei tavoli reale
      },
      orderBy: { date: "asc" },
    }),
    prisma.table.count({
      where: { restaurantId: currentRestaurantId },
    })
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      {/* HEADER DELLA PAGINA */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Gestione <span className="text-red-600">Prenotazioni</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Gestisci i tavoli e le richieste di TasteBoard
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-11 px-6 shadow-md shadow-red-100 active:scale-95 transition-all">
          <Plus className="mr-2 h-4 w-4" /> Nuova Prenotazione
        </Button>
      </header>

      {/* GRIGLIA PRINCIPALE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLONNA SINISTRA: Calendario Filtro */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Seleziona Data
            </span>
            {/* Usiamo il nostro componente che aggiorna l'URL in modo sicuro */}
            <DatePickerFilter />
          </div>
        </div>

        {/* COLONNA DESTRA: Statistiche e Lista Live */}
        <div className="lg:col-span-8 space-y-6">
          {/* Componente Statistiche dinamico con dati reali */}
          <ReservationStats bookings={bookings} totalTablesCount={totalTablesCount} />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-xl text-slate-800 border-l-4 border-red-600 pl-3 uppercase tracking-tight">
                {format(selectedDate, "eeee d MMMM", { locale: it })}
              </h2>
              <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-200 font-bold">
                {bookings.length} {bookings.length === 1 ? 'Arrivo' : 'Arrivi'}
              </Badge>
            </div>

            {/* RENDER DELLA LISTA REALE */}
            <div className="grid gap-3">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <ReservationCard key={booking.id} reservation={booking} />
                ))
              ) : (
                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-16 text-center">
                  <p className="text-slate-400 font-bold text-base">
                    Nessuna prenotazione registrata per questa data.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}