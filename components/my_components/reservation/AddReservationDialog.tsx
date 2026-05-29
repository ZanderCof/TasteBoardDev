// components/my_components/reservation/AddReservationDialog.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Loader2,
  User,
  Phone,
  Calendar,
  Clock,
  Armchair,
} from "lucide-react";
import { createManualReservation } from "@/app/actions/bookings";
import { format } from "date-fns";

interface TableInput {
  id: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

interface AddReservationDialogProps {
  restaurantId: string;
  tables: TableInput[];
  currentSelectedDate: Date;
  occupiedTableIds: string[]; // tavoli già prenotati per questa giornata
}

export function AddReservationDialog({
  restaurantId,
  tables,
  currentSelectedDate,
  occupiedTableIds,
}: AddReservationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("20:00");
  const [guests, setGuests] = useState(2);
  const [tableId, setTableId] = useState("");
  const [notes, setNotes] = useState("");

  // Filtra per capienza E per disponibilità (escludi i tavoli già occupati)
  const compatibleTables = useMemo(() => {
    return tables.filter(
      (table) =>
        guests >= table.minCapacity &&
        guests <= table.maxCapacity &&
        !occupiedTableIds.includes(table.id),
    );
  }, [tables, guests, occupiedTableIds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !tableId) return;

    setLoading(true);
    try {
      await createManualReservation({
        customerName,
        phone,
        date,
        time,
        guests,
        tableId,
        notes,
        restaurantId,
      });
      // Reset form e chiusura
      setCustomerName("");
      setPhone("");
      setNotes("");
      setTableId("");
      setOpen(false);
    } catch (error) {
      console.error("Errore nel salvataggio:", error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (open) {
    setDate(format(new Date(), "yyyy-MM-dd"))
    setTime("20:00")
    setGuests(2)
    setTableId("")
    setCustomerName("")
    setPhone("")
    setNotes("")
  }
}, [open])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-11 px-6 shadow-md shadow-red-100 active:scale-95 transition-all">
          <Plus className="mr-2 h-4 w-4" /> Nuova Prenotazione
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-3xl bg-white p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Inserisci <span className="text-red-600">Prenotazione</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Nome Cliente */}
          <div className="space-y-1.5">
            <Label
              htmlFor="customerName"
              className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1"
            >
              <User size={12} /> Nome Cliente
            </Label>
            <Input
              id="customerName"
              placeholder="Es: Mario Rossi"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-xl border-slate-200 h-11 font-medium"
              required
            />
          </div>

          {/* Telefono */}
          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1"
            >
              <Phone size={12} /> Telefono
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Es: +39 333 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border-slate-200 h-11 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Data */}
            <div className="space-y-1.5 col-span-1">
              <Label
                htmlFor="date"
                className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1"
              >
                <Calendar size={12} /> Data
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border-slate-200 h-11 font-medium text-xs px-2"
                required
              />
            </div>

            {/* Ora */}
            <div className="space-y-1.5 col-span-1">
              <Label
                htmlFor="time"
                className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1"
              >
                <Clock size={12} /> Ora Arrivo
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border-slate-200 h-11 font-medium"
                required
              />
            </div>

            {/* Coperti */}
            <div className="space-y-1.5 col-span-1">
              <Label
                htmlFor="guests"
                className="font-bold text-slate-700 uppercase text-[11px] tracking-wider"
              >
                Coperti
              </Label>
              <Input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => {
                  setGuests(parseInt(e.target.value) || 1);
                  setTableId(""); // reset tavolo se cambiano i coperti
                }}
                className="rounded-xl border-slate-200 h-11 font-bold"
                required
              />
            </div>
          </div>

          {/* Selezione Tavolo */}
          <div className="space-y-1.5">
            <Label
              htmlFor="table"
              className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1"
            >
              <Armchair size={12} /> Assegna Tavolo ({compatibleTables.length}{" "}
              disponibili)
            </Label>
            <select
              id="table"
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              required
            >
              <option value="" disabled>
                -- Seleziona un tavolo idoneo --
              </option>
              {compatibleTables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name} (Max {table.maxCapacity} pax)
                </option>
              ))}
            </select>
            {compatibleTables.length === 0 && (
              <p className="text-[11px] text-rose-600 font-bold">
                ⚠️ Nessun tavolo disponibile per {guests} persone in questa
                data.
              </p>
            )}
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <Label
              htmlFor="notes"
              className="font-bold text-slate-700 uppercase text-[11px] tracking-wider"
            >
              Note (Allergie, preferenze...)
            </Label>
            <Textarea
              id="notes"
              placeholder="Es: Tavolo vicino alla finestra, intollerante al glutine..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl border-slate-200 min-h-16 text-sm font-medium"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading || compatibleTables.length === 0}
            className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-slate-200 mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Conferma e Salva Prenotazione"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
