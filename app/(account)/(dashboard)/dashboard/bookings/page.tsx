// app/(account)/(dashboard)/dashboard/bookings/page.tsx
import prisma from "@/lib/prisma";
import { format, addDays, startOfToday } from "date-fns";
import { ReservationStats } from "@/components/my_components/reservation/ReservationStats";
import { AddReservationDialog } from "@/components/my_components/reservation/AddReservationDialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { BookingsViewer } from "@/components/my_components/reservation/Bookingsviewer";

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

  // Raggruppa prenotazioni per giorno
  const bookingsByDay = bookings.reduce<Record<string, typeof bookings>>(
    (acc, booking) => {
      const key = new Date(booking.date).toISOString().split("T")[0];
      if (!acc[key]) acc[key] = [];
      acc[key].push(booking);
      return acc;
    },
    {}
  );

  // Tavoli occupati per giorno
  const occupiedByDay = Object.fromEntries(
    Object.entries(bookingsByDay).map(([day, dayBookings]) => [
      day,
      dayBookings.map((b) => b.tableId).filter(Boolean) as string[],
    ])
  );

  // Array dei 8 giorni (oggi + 7)
  const days = Array.from({ length: 8 }, (_, i) => {
    const d = addDays(today, i);
    const key = d.toISOString().split("T")[0];
    return { date: d, key, bookings: bookingsByDay[key] ?? [] };
  });

  const todayKey = today.toISOString().split("T")[0];
  const todayOccupied = occupiedByDay[todayKey] ?? [];

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
            Gestione <span className="text-red-600">Prenotazioni</span>
          </h1>
          <p className="text-muted-foreground font-medium">
            Prossimi 7 giorni · TasteBoard
          </p>
        </div>
        <AddReservationDialog
          restaurantId={currentRestaurantId}
          tables={allTables}
          currentSelectedDate={today}
          occupiedTableIds={todayOccupied}
        />
      </header>

      <ReservationStats bookings={bookings} totalTablesCount={totalTablesCount} />

      {/* Nuovo viewer con select giorno */}
      <BookingsViewer
        days={days}
        allTables={allTables}
        occupiedByDay={occupiedByDay}
      />
    </div>
  );
}