// app/(account)/(dashboard)/dashboard/bookings/page.tsx
import prisma from "@/lib/prisma";
import { format, addDays, startOfToday } from "date-fns";
import { it } from "date-fns/locale";
import { ReservationStats } from "@/components/my_components/reservation/ReservationStats";
import { AddReservationDialog } from "@/components/my_components/reservation/AddReservationDialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BookingsViewer } from "@/components/my_components/reservation/Bookingsviewer";
import { TableAvailabilityChecker } from "@/components/my_components/reservation/Tableavailabilitychecker";

type PageProps = {
  searchParams: Promise<{ restaurantId?: string }>;
};

export default async function BookingsPage({ searchParams }: PageProps) {
  const { restaurantId: restaurantParam } = await searchParams;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let currentRestaurantId = restaurantParam;
  if (!currentRestaurantId) {
    const firstRestaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    });
    if (!firstRestaurant) redirect("/dashboard/restaurants/new");
    currentRestaurantId = firstRestaurant.id;
  }

  const today = startOfToday();
  const weekEnd = addDays(today, 7);

  const [bookings, totalTablesCount, allTables] = await Promise.all([
    prisma.reservation.findMany({
      where: {
        restaurantId: currentRestaurantId,
        date: { gte: today, lte: weekEnd },
        status: { notIn: ["CANCELLED", "DECLINED"] },
      },
      include: { table: true },
      orderBy: { date: "asc" },
    }),
    prisma.table.count({ where: { restaurantId: currentRestaurantId } }),
    prisma.table.findMany({
      where: { restaurantId: currentRestaurantId },
      select: { id: true, name: true, minCapacity: true, maxCapacity: true },
      orderBy: { name: "asc" },
    }),
  ]);

  // Raggruppa per giorno (timezone-safe)
  const bookingsByDay = bookings.reduce<Record<string, typeof bookings>>(
    (acc, booking) => {
      const key = format(new Date(booking.date), "yyyy-MM-dd");
      if (!acc[key]) acc[key] = [];
      acc[key].push(booking);
      return acc;
    },
    {}
  );

  const occupiedByDay = Object.fromEntries(
    Object.entries(bookingsByDay).map(([day, dayBookings]) => [
      day,
      dayBookings.map((b) => b.tableId).filter(Boolean) as string[],
    ])
  );

  const days = Array.from({ length: 8 }, (_, i) => {
    const d = addDays(today, i);
    const key = format(d, "yyyy-MM-dd");
    return { date: d, key, bookings: bookingsByDay[key] ?? [] };
  });

  const todayKey     = format(today, "yyyy-MM-dd");
  const todayOccupied = occupiedByDay[todayKey] ?? [];
  const todayLabel   = format(today, "EEEE d MMMM", { locale: it });

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            {/* Data oggi come sopratitolo */}
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-red-500 mb-1 capitalize">
              {todayLabel}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-none">
              Prenotazioni
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1.5">
              Prossimi 7 giorni · aggiornato in tempo reale
            </p>
          </div>

          <AddReservationDialog
            restaurantId={currentRestaurantId}
            tables={allTables}
            currentSelectedDate={today}
            occupiedTableIds={todayOccupied}
          />
        </header>

        {/* ── KPI STATS ──────────────────────────────────────────────────── */}
        <ReservationStats
          bookings={bookings}
          totalTablesCount={totalTablesCount}
        />

        {/* ── MAIN LAYOUT: viewer + checker sidebar ──────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">

          {/* Viewer prenotazioni */}
          <BookingsViewer
            days={days}
            allTables={allTables}
            occupiedByDay={occupiedByDay}
          />

          {/* Sidebar checker — sticky su desktop */}
          <div className="xl:sticky xl:top-6">
            <TableAvailabilityChecker restaurantId={currentRestaurantId} />
          </div>

        </div>
      </div>
    </div>
  );
}