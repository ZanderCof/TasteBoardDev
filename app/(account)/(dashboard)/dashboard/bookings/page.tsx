// app/(account)/(dashboard)/dashboard/bookings/page.tsx
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { DatePickerFilter } from "@/components/my_components/reservation/date-picker";
import { ReservationCard } from "@/components/my_components/reservation/ReservationCard";
import { ReservationStats } from "@/components/my_components/reservation/ReservationStats";

// DEFINIAMO IL TIPO CORRETTO PER NEXT.js 15
type PageProps = {
  searchParams: Promise<{ date?: string }>;
};

export default async function BookingsPage({ searchParams }: PageProps) {
  // 1. Await dei searchParams (Obbligatorio in Next.js 15+)
  const { date: dateParam } = await searchParams;
  
  const selectedDate = dateParam ? new Date(dateParam) : new Date();
  
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  // 2. Fetch dei dati
  const bookings = await prisma.reservation.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: { date: "asc" },
  });

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Gestione <span className="text-red-600">Prenotazioni</span>
          </h1>
          <p className="text-muted-foreground font-medium first-letter:uppercase">
            {format(selectedDate, "eeee d MMMM yyyy", { locale: it })}
          </p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-6 shadow-lg shadow-red-200 transition-all active:scale-95">
          <Plus className="mr-2 h-5 w-5" /> NUOVA PRENOTAZIONE
        </Button>
      </div>

      <ReservationStats bookings={bookings} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-700 uppercase text-sm tracking-wider">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              Calendario
            </h3>
            <DatePickerFilter />
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 min-h-125">
            <div className="flex items-center justify-between mb-6 border-b border-slate-50 pb-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
                Lista Arrivi
              </h2>
              <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-xs font-black border border-red-100">
                {bookings.length} {bookings.length === 1 ? 'PRENOTAZIONE' : 'PRENOTAZIONI'}
              </span>
            </div>

            <div className="grid gap-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <ReservationCard key={booking.id} reservation={booking} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                    <Plus className="text-slate-300 w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-bold text-lg">Nessun tavolo prenotato</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
