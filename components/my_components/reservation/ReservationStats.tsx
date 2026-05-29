// components/my_components/reservation/ReservationStats.tsx
import { Status } from "@prisma/client";

// Definiamo un tipo leggero per quello che serve al componente
type BookingStatInput = {
  guests: number;
  status: Status;
  tableId: string | null;
};

interface ReservationStatsProps {
  bookings: BookingStatInput[];
  totalTablesCount?: number; // Passato dal server per calcolare i tavoli liberi
}

export function ReservationStats({ bookings, totalTablesCount = 0 }: ReservationStatsProps) {
  
  // 1. Calcola il totale degli ospiti confermati per oggi
  const totaleOspiti = bookings
    .filter((b) => b.status === "CONFIRMED")
    .reduce((sum, b) => sum + b.guests, 0);

  // 2. Conta quante prenotazioni sono ancora in attesa
  const inAttesa = bookings.filter((b) => b.status === "PENDING").length;

  // 3. Calcola i tavoli occupati (estraiamo i tableId univoci delle prenotazioni confermate)
  const tavoliOccupatiIds = new Set(
    bookings
      .filter((b) => b.status === "CONFIRMED" && b.tableId)
      .map((b) => b.tableId)
  );
  
  const numeroTavoliOccupati = tavoliOccupatiIds.size;
  
  // Se conosciamo il totale dei tavoli del locale facciamo la sottrazione, 
  // altrimenti mostriamo semplicemente quanti sono occupati.
  const mostraTavoliLiberi = totalTablesCount > 0;
  const tavoliLiberi = Math.max(0, totalTablesCount - numeroTavoliOccupati);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* CARD: TOTALE OSPITI */}
      <div className="bg-white p-4 rounded-xl border-b-4 border-red-600 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">Totale Ospiti (Confermati)</p>
        <h3 className="text-3xl font-black text-red-600">{totaleOspiti}</h3>
      </div>

      {/* CARD: IN ATTESA */}
      <div className="bg-white p-4 rounded-xl border-b-4 border-yellow-400 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">In Attesa</p>
        <h3 className="text-3xl font-black text-yellow-500">{inAttesa}</h3>
      </div>

      {/* CARD: TAVOLI LIBERI / OCCUPATI */}
      <div className="bg-white p-4 rounded-xl border-b-4 border-slate-200 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">
          {mostraTavoliLiberi ? "Tavoli Liberi" : "Tavoli Occupati"}
        </p>
        <h3 className="text-3xl font-black text-slate-800">
          {mostraTavoliLiberi ? tavoliLiberi : numeroTavoliOccupati}
        </h3>
      </div>
    </div>
  );
}