// components/my_components/reservation/ReservationStats.tsx
import { Status } from "@prisma/client";
import { Users, Clock, LayoutGrid } from "lucide-react";

type BookingStatInput = {
  guests: number;
  status: Status;
  tableId: string | null;
};

interface ReservationStatsProps {
  bookings: BookingStatInput[];
  totalTablesCount?: number;
}

export function ReservationStats({ bookings, totalTablesCount = 0 }: ReservationStatsProps) {
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const pending = bookings.filter((b) => b.status === "PENDING");

  const totaleOspiti = confirmed.reduce((sum, b) => sum + b.guests, 0);
  const inAttesa = pending.length;

  const tavoliOccupati = new Set(
    confirmed.filter((b) => b.tableId).map((b) => b.tableId)
  ).size;

  const tavoliLiberi = Math.max(0, totalTablesCount - tavoliOccupati);
  const mostraTavoliLiberi = totalTablesCount > 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      {/* Ospiti confermati */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
          <Users className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Ospiti confermati
          </p>
          <p className="text-3xl font-black text-slate-900 leading-none mt-0.5">
            {totaleOspiti}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {confirmed.length} prenotazioni confermate
          </p>
        </div>
      </div>

      {/* In attesa */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            In attesa
          </p>
          <div className="flex items-end gap-2 mt-0.5">
            <p className="text-3xl font-black text-slate-900 leading-none">{inAttesa}</p>
            {inAttesa > 0 && (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 rounded-md px-1.5 py-0.5 mb-0.5">
                da confermare
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {pending.reduce((s, b) => s + b.guests, 0)} ospiti in attesa
          </p>
        </div>
      </div>

      {/* Tavoli */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <LayoutGrid className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {mostraTavoliLiberi ? "Tavoli liberi" : "Tavoli occupati"}
          </p>
          <p className="text-3xl font-black text-slate-900 leading-none mt-0.5">
            {mostraTavoliLiberi ? tavoliLiberi : tavoliOccupati}
          </p>
          {mostraTavoliLiberi && (
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {tavoliOccupati} occupati su {totalTablesCount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}