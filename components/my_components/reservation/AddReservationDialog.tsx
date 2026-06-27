"use client";

import { useState, useRef, useTransition } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus, Loader2, User, Phone, Calendar, Clock,
  Armchair, Minus, AlertTriangle, RefreshCw,
} from "lucide-react";
import { createManualReservation } from "@/app/actions/bookings";
import { getOccupiedTablesForSlot } from "@/app/(account)/(dashboard)/dashboard/bookings/action";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const TIME_PRESETS = ["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"];

interface TableInput {
  id: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

interface Props {
  restaurantId: string;
  tables: TableInput[];
  currentSelectedDate: Date;
  /** Lista iniziale degli occupati — verrà aggiornata dinamicamente */
  occupiedTableIds: string[];
}

function defaultForm(date: Date) {
  return {
    customerName: "",
    phone: "",
    date: format(date, "yyyy-MM-dd"),
    time: "20:00",
    guests: 2,
    tableId: "",
    notes: "",
  };
}

export function AddReservationDialog({
  restaurantId,
  tables,
  currentSelectedDate,
  occupiedTableIds: initialOccupied,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isCheckingSlot, startSlotCheck] = useTransition();
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => defaultForm(currentSelectedDate));

  // ── Occupied IDs aggiornati dinamicamente per data+ora ──────────────────────
  const [occupiedIds, setOccupiedIds] = useState<string[]>(initialOccupied);

  function handleOpenChange(next: boolean) {
    if (next) {
      const fresh = defaultForm(currentSelectedDate);
      setForm(fresh);
      setOccupiedIds(initialOccupied);
      setError("");
      // Fetch occupati per lo slot di default all'apertura
      refreshOccupied(fresh.date, fresh.time);
    }
    setOpen(next);
  }

  /** Aggiorna la lista degli occupati per il nuovo slot senza bloccare la UI */
  function refreshOccupied(date: string, time: string) {
    startSlotCheck(async () => {
      try {
        const ids = await getOccupiedTablesForSlot(restaurantId, date, time);
        setOccupiedIds(ids);
        // Reset tavolo selezionato se non è più disponibile
        setForm((prev) => ({
          ...prev,
          tableId: ids.includes(prev.tableId) ? "" : prev.tableId,
        }));
      } catch {
        // silenzioso: in caso di errore mantieni l'ultima lista nota
      }
    });
  }

  function set<K extends keyof typeof form>(field: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function handleDateChange(newDate: string) {
    set("date", newDate);
    set("tableId", "");
    refreshOccupied(newDate, form.time);
  }

  function handleTimeChange(newTime: string) {
    set("time", newTime);
    set("tableId", "");
    refreshOccupied(form.date, newTime);
  }

  function handleTimePreset(t: string) {
    handleTimeChange(t);
  }

  function adjustGuests(delta: number) {
    const next = Math.max(1, Math.min(20, form.guests + delta));
    setForm((prev) => ({ ...prev, guests: next, tableId: "" }));
  }

  // Filtra tavoli: capienza ok + non occupati per questo slot+orario
  const compatibleTables = tables.filter(
    (t) =>
      form.guests >= t.minCapacity &&
      form.guests <= t.maxCapacity &&
      !occupiedIds.includes(t.id)
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerName.trim()) { setError("Il nome del cliente è obbligatorio."); return; }
    if (!form.phone.trim()) { setError("Il numero di telefono è obbligatorio."); return; }
    if (!form.tableId) { setError("Seleziona un tavolo disponibile."); return; }

    startTransition(async () => {
      try {
        await createManualReservation({
          customerName: form.customerName.trim(),
          phone: form.phone.trim(),
          date: form.date,
          time: form.time,
          guests: form.guests,
          tableId: form.tableId,
          notes: form.notes.trim(),
          restaurantId,
        });
        setOpen(false);
      } catch {
        setError("Impossibile salvare. Riprova.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-11 px-6 shadow-md shadow-red-100 active:scale-95 transition-all">
          <Plus className="mr-2 h-4 w-4" /> Nuova prenotazione
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-3xl bg-white p-0 overflow-hidden gap-0 max-h-[92vh] flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
            Nuova <span className="text-red-600">Prenotazione</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
          <div className="px-6 py-5 space-y-5">

            {/* Cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldSlot label="Nome cliente" icon={<User className="h-3 w-3" />}>
                <Input autoFocus placeholder="Mario Rossi" value={form.customerName}
                  onChange={(e) => set("customerName", e.target.value)}
                  className="h-11 rounded-xl border-slate-200 font-medium focus-visible:ring-red-500/20 focus-visible:border-red-400" />
              </FieldSlot>
              <FieldSlot label="Telefono" icon={<Phone className="h-3 w-3" />}>
                <Input type="tel" placeholder="+39 333 1234567" value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="h-11 rounded-xl border-slate-200 font-medium focus-visible:ring-red-500/20 focus-visible:border-red-400" />
              </FieldSlot>
            </div>

            {/* Data + Ora */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <FieldSlot label="Data" icon={<Calendar className="h-3 w-3" />}>
                  <Input type="date" value={form.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="h-11 rounded-xl border-slate-200 font-medium focus-visible:ring-red-500/20 focus-visible:border-red-400" />
                </FieldSlot>
                <FieldSlot label="Orario" icon={<Clock className="h-3 w-3" />}>
                  <div className="relative">
                    <Input type="time" value={form.time}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="h-11 rounded-xl border-slate-200 font-medium focus-visible:ring-red-500/20 focus-visible:border-red-400" />
                    {isCheckingSlot && (
                      <RefreshCw size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 animate-spin" />
                    )}
                  </div>
                </FieldSlot>
              </div>
              {/* Preset orari */}
              <div className="flex flex-wrap gap-1.5">
                {TIME_PRESETS.map((t) => (
                  <button key={t} type="button" onClick={() => handleTimePreset(t)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-black border transition-all",
                      form.time === t
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600"
                    )}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Coperti */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Numero ospiti</label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => adjustGuests(-1)} disabled={form.guests <= 1}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center transition-all">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-3xl font-black text-slate-900 w-8 text-center tabular-nums">{form.guests}</span>
                <button type="button" onClick={() => adjustGuests(1)} disabled={form.guests >= 20}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 flex items-center justify-center transition-all">
                  <Plus className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-slate-400">{form.guests === 1 ? "ospite" : "ospiti"}</span>
              </div>
            </div>

            {/* Tavoli */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Armchair className="h-3 w-3" />
                Tavolo disponibile
                <span className="normal-case font-medium text-slate-400">
                  ({isCheckingSlot ? "..." : compatibleTables.length} per {form.guests} ospiti)
                </span>
              </label>

              {isCheckingSlot ? (
                <div className="flex items-center gap-2 py-4 text-xs text-slate-400 font-bold">
                  <RefreshCw size={13} className="animate-spin" />
                  Verifica disponibilità per {form.time}...
                </div>
              ) : compatibleTables.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {compatibleTables.map((table) => {
                    const selected = form.tableId === table.id;
                    return (
                      <button key={table.id} type="button" onClick={() => set("tableId", table.id)}
                        className={cn(
                          "flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all",
                          selected
                            ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-400 text-slate-700"
                        )}>
                        <span className={cn("text-sm font-black truncate w-full", selected ? "text-white" : "text-slate-900")}>
                          {table.name}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          {table.minCapacity}–{table.maxCapacity} posti
                        </span>
                        <div className="flex gap-0.5 flex-wrap mt-0.5">
                          {Array.from({ length: Math.min(table.maxCapacity, 8) }).map((_, i) => (
                            <span key={i} className={cn("w-2 h-2 rounded-full",
                              i < form.guests
                                ? selected ? "bg-red-400" : "bg-red-500"
                                : selected ? "bg-slate-700" : "bg-slate-200"
                            )} />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                  <p className="text-xs font-bold text-rose-700">
                    Nessun tavolo libero per {form.guests} ospiti alle {form.time}.
                  </p>
                </div>
              )}
            </div>

            {/* Note */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note</label>
              <Textarea placeholder="Allergie, preferenze..." value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                className="rounded-xl border-slate-200 min-h-16 text-sm font-medium resize-none focus-visible:ring-red-500/20 focus-visible:border-red-400" />
            </div>

            {error && (
              <p className="text-xs font-bold text-red-500 flex items-center gap-1.5">
                <AlertTriangle className="h-3 w-3 shrink-0" />{error}
              </p>
            )}
          </div>
        </form>

        <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <Button type="button" onClick={handleSubmit as unknown as React.MouseEventHandler}
            disabled={isPending || isCheckingSlot || compatibleTables.length === 0}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black h-12 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-slate-200">
            {isPending ? (
              <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Salvataggio...</>
            ) : "Conferma prenotazione"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FieldSlot({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
        {icon && <span className="text-slate-300">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}