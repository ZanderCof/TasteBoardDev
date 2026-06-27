"use client";
// components/my_components/dashboard/TableAvailabilityChecker.tsx

import { useState, useTransition } from "react";
import { getAvailableTablesForSlot } from "@/app/(account)/(dashboard)/dashboard/bookings/action";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Armchair, Users, Minus, Plus, RefreshCw,
  CheckCircle2, XCircle, AlertCircle,
} from "lucide-react";

const TIME_PRESETS = ["12:00", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

type TableResult = {
  id: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
  occupied: boolean;
  fits: boolean;
};

export function TableAvailabilityChecker({ restaurantId }: { restaurantId: string }) {
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("20:00");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [results, setResults] = useState<TableResult[] | null>(null);
  const [isChecking, startCheck] = useTransition();

  function check() {
    startCheck(async () => {
      const tables = await getAvailableTablesForSlot(restaurantId, date, time, guests);
      setResults(tables);
    });
  }

  // Conteggi
  const available = results?.filter((t) => !t.occupied && t.fits) ?? [];
  const occupied  = results?.filter((t) => t.occupied) ?? [];
  const wrongSize = results?.filter((t) => !t.occupied && !t.fits) ?? [];
  const hasRoom   = available.length > 0;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-5">

      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">
          Verifica disponibilità
        </p>
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          C&apos;è posto?
        </h3>
      </div>

      {/* Inputs */}
      <div className="space-y-4">

        {/* Ospiti */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
            <Users className="h-3 w-3" /> Ospiti
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setGuests(g => Math.max(1, g - 1)); setResults(null); }}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all disabled:opacity-40"
              disabled={guests <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-2xl font-black text-slate-900 w-6 text-center tabular-nums">{guests}</span>
            <button
              type="button"
              onClick={() => { setGuests(g => Math.min(20, g + 1)); setResults(null); }}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all disabled:opacity-40"
              disabled={guests >= 20}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm text-slate-400 font-medium">{guests === 1 ? "ospite" : "ospiti"}</span>
          </div>
        </div>

        {/* Data */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Data</label>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setResults(null); }}
            className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-slate-400 bg-slate-50"
          />
        </div>

        {/* Orario — preset rapidi */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Orario</label>
          <div className="flex flex-wrap gap-1.5">
            {TIME_PRESETS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { setTime(t); setResults(null); }}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-black border transition-all",
                  time === t
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          {/* Orario personalizzato */}
          <input
            type="time"
            value={time}
            onChange={(e) => { setTime(e.target.value); setResults(null); }}
            className="mt-1 h-9 px-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 focus:outline-none focus:border-slate-400 bg-slate-50"
          />
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={check}
        disabled={isChecking}
        className="w-full h-11 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-sm uppercase tracking-wider transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {isChecking ? (
          <><RefreshCw size={14} className="animate-spin" /> Verifica...</>
        ) : (
          "Verifica disponibilità"
        )}
      </button>

      {/* Risultato */}
      {results !== null && !isChecking && (
        <div className="space-y-3 pt-1 border-t border-slate-100">

          {/* Banner principale */}
          <div className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3",
            hasRoom
              ? "bg-emerald-50 border border-emerald-100"
              : "bg-rose-50 border border-rose-100"
          )}>
            {hasRoom
              ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              : <XCircle className="h-5 w-5 text-rose-500 shrink-0" />
            }
            <div>
              <p className={cn("font-black text-sm", hasRoom ? "text-emerald-800" : "text-rose-800")}>
                {hasRoom
                  ? `Sì, ${available.length} ${available.length === 1 ? "tavolo libero" : "tavoli liberi"}`
                  : "Nessun tavolo disponibile"
                }
              </p>
              <p className={cn("text-[11px] font-medium", hasRoom ? "text-emerald-600" : "text-rose-500")}>
                {guests} {guests === 1 ? "ospite" : "ospiti"} · {time} · {date === format(new Date(), "yyyy-MM-dd") ? "oggi" : date}
              </p>
            </div>
          </div>

          {/* Tavoli disponibili */}
          {available.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Liberi</p>
              {available.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Armchair size={14} className="text-emerald-500" />
                    <span className="font-bold text-sm text-slate-900">{t.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-white border border-emerald-100 px-2 py-0.5 rounded-full">
                    {t.minCapacity}–{t.maxCapacity} posti
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tavoli occupati */}
          {occupied.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Occupati alle {time}</p>
              {occupied.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 opacity-60">
                  <div className="flex items-center gap-2">
                    <Armchair size={14} className="text-slate-400" />
                    <span className="font-medium text-sm text-slate-500 line-through">{t.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Occupato</span>
                </div>
              ))}
            </div>
          )}

          {/* Tavoli con capienza errata */}
          {wrongSize.length > 0 && (
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-100">
              <AlertCircle size={13} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[11px] font-bold text-amber-700">
                {wrongSize.length} {wrongSize.length === 1 ? "tavolo libero" : "tavoli liberi"} ma con capienza diversa da {guests} ospiti ({wrongSize.map(t => t.name).join(", ")})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}