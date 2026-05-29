// components/my_components/reservation/EditReservationDialog.tsx
"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Edit2, User, Phone, Calendar, Clock, Armchair } from "lucide-react"
import { updateReservation } from "@/app/actions/bookings"

interface TableInput {
  id: string;
  name: string;
  minCapacity: number;
  maxCapacity: number;
}

interface EditReservationDialogProps {
  reservation: {
    id: string;
    customerName: string;
    phone: string;
    date: Date;
    guests: number;
    notes?: string | null;
    tableId: string | null;
  };
  tables: TableInput[];
  occupiedTableIds: string[]; // già filtrati da page.tsx (il tavolo corrente è già escluso)
}

export function EditReservationDialog({ reservation, tables, occupiedTableIds }: EditReservationDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const initialDateStr = new Date(reservation.date).toISOString().split("T")[0]
  const initialTimeStr = new Date(reservation.date).toISOString().split("T")[1].substring(0, 5)

  const [customerName, setCustomerName] = useState(reservation.customerName)
  const [phone, setPhone] = useState(reservation.phone)
  const [date, setDate] = useState(initialDateStr)
  const [time, setTime] = useState(initialTimeStr)
  const [guests, setGuests] = useState(reservation.guests)
  const [tableId, setTableId] = useState(reservation.tableId || "")
  const [notes, setNotes] = useState(reservation.notes || "")

  // Filtra per capienza E per disponibilità (occupiedTableIds già esclude il tavolo corrente)
  const compatibleTables = useMemo(() => {
    return tables.filter(
      (table) =>
        guests >= table.minCapacity &&
        guests <= table.maxCapacity &&
        !occupiedTableIds.includes(table.id)
    )
  }, [tables, guests, occupiedTableIds])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateReservation(reservation.id, {
        customerName,
        phone,
        date,
        time,
        guests,
        tableId,
        notes,
      })
      setOpen(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-slate-500 font-bold hover:text-slate-900 rounded-lg h-8 px-2.5 hover:bg-slate-100"
        >
          <Edit2 size={13} className="mr-1" /> Modifica
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-3xl bg-white p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Modifica <span className="text-blue-600">Prenotazione</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-1.5">
            <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1">
              <User size={12} /> Nome Cliente
            </Label>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-xl h-11 font-medium"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1">
              <Phone size={12} /> Telefono
            </Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl h-11 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5 col-span-1">
              <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1">
                <Calendar size={12} /> Data
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl h-11 text-xs px-2"
                required
              />
            </div>
            <div className="space-y-1.5 col-span-1">
              <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1">
                <Clock size={12} /> Ora
              </Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl h-11"
                required
              />
            </div>
            <div className="space-y-1.5 col-span-1">
              <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                Coperti
              </Label>
              <Input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => {
                  setGuests(parseInt(e.target.value) || 1)
                  setTableId("") // reset tavolo se cambiano i coperti
                }}
                className="rounded-xl h-11 font-bold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider flex items-center gap-1">
              <Armchair size={12} /> Cambia Tavolo ({compatibleTables.length} disponibili)
            </Label>
            <select
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-slate-950"
              required
            >
              <option value="" disabled>-- Seleziona Tavolo --</option>
              {compatibleTables.map((table) => (
                <option key={table.id} value={table.id}>
                  {table.name} (Max {table.maxCapacity} pax)
                </option>
              ))}
            </select>
            {compatibleTables.length === 0 && (
              <p className="text-[11px] text-rose-600 font-bold">
                ⚠️ Nessun tavolo disponibile per {guests} persone in questa data.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="font-bold text-slate-700 uppercase text-[11px] tracking-wider">
              Note
            </Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl min-h-16 text-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || compatibleTables.length === 0}
            className="w-full bg-slate-950 text-white font-bold h-12 rounded-xl mt-2"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Aggiorna Prenotazione"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}