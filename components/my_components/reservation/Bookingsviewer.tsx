// components/my_components/reservation/BookingsViewer.tsx
"use client"

import { useState } from "react"
import { format, isToday, isTomorrow } from "date-fns"
import { it } from "date-fns/locale"
import { ChevronRight, Users, Phone, Trash2, Loader2, Armchair, Monitor, PhoneCall, Calendar, CheckCircle2 } from "lucide-react"
import { deleteReservation, confirmArrival } from "@/app/actions/bookings"
import { EditReservationDialog } from "../dashboard/tables/EditReservationDialog"

// ─── Types ────────────────────────────────────────────────────────────────────

interface TableInput {
  id: string
  name: string
  minCapacity: number
  maxCapacity: number
}

interface Reservation {
  id: string
  customerName: string
  phone: string
  date: Date
  guests: number
  status: "PENDING" | "CONFIRMED" | "DECLINED" | "CANCELLED"
  isManual: boolean
  notes?: string | null
  tableId: string | null
  table?: { id: string; name: string } | null
}

interface DayData {
  date: Date
  key: string
  bookings: Reservation[]
}

interface BookingsViewerProps {
  days: DayData[]
  allTables: TableInput[]
  occupiedByDay: Record<string, string[]>
}

// ─── Single Booking Row ───────────────────────────────────────────────────────

function BookingRow({
  reservation,
  allTables,
  occupiedTableIds,
}: {
  reservation: Reservation
  allTables: TableInput[]
  occupiedTableIds: string[]
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isArriving, setIsArriving] = useState(false)
  const [arrived, setArrived] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Eliminare la prenotazione di ${reservation.customerName}?`)) return
    setIsDeleting(true)
    try {
      await deleteReservation(reservation.id)
    } catch (e) {
      console.error(e)
      setIsDeleting(false)
    }
  }

  const handleArrival = async () => {
    if (!confirm(`Confermare l'arrivo di ${reservation.customerName}? La prenotazione verrà rimossa.`)) return
    setIsArriving(true)
    try {
      // Animazione di "check" prima di rimuovere
      setArrived(true)
      await new Promise((r) => setTimeout(r, 600))
      await confirmArrival(reservation.id)
    } catch (e) {
      console.error(e)
      setIsArriving(false)
      setArrived(false)
    }
  }

  const time  = format(new Date(reservation.date), "yyyy-MM-dd");

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300
        ${arrived
          ? "bg-emerald-50 border-emerald-200 scale-95 opacity-0"
          : expanded
            ? "bg-white border-slate-300 shadow-lg"
            : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
        }`}
    >
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-colors duration-300
        ${arrived ? "bg-emerald-500" : "bg-emerald-500"}`}
      />

      {/* Main row — click per espandere */}
      <div
        className="flex items-center gap-4 px-5 py-4 pl-6 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Time bubble */}
        <div className="shrink-0 w-14 h-14 rounded-xl bg-slate-950 flex flex-col items-center justify-center">
          <span className="text-white font-black text-base leading-none">{time}</span>
          <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">ora</span>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-slate-900 text-base truncate">
              {reservation.customerName}
            </span>
            {reservation.isManual ? (
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-500 px-2 py-0.5 rounded-full">
                <PhoneCall size={8} /> tel
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider bg-violet-50 text-violet-500 px-2 py-0.5 rounded-full">
                <Monitor size={8} /> online
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Users size={11} className="text-slate-400" />
              {reservation.guests} pers.
            </span>
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Armchair size={11} className="text-slate-400" />
              {reservation.table?.name ?? "—"}
            </span>
          </div>
        </div>

        {/* Phone + chevron */}
        <div className="shrink-0 flex flex-col items-end gap-1.5">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Phone size={10} /> {reservation.phone}
          </span>
          <ChevronRight
            size={14}
            className={`text-slate-300 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-6 pb-5 pt-1 border-t border-slate-50 space-y-4">

          {/* Note */}
          {reservation.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 font-medium italic">
              "{reservation.notes}"
            </div>
          )}

          {/* ── BOTTONE ARRIVO ── */}
          <button
            onClick={handleArrival}
            disabled={isArriving || arrived}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all duration-200
              ${arrived
                ? "bg-emerald-500 text-white"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white border border-emerald-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-100 active:scale-95"
              }`}
          >
            {isArriving
              ? <Loader2 size={15} className="animate-spin" />
              : <CheckCircle2 size={15} />
            }
            {arrived ? "Benvenuto! 🎉" : "Conferma Arrivo"}
          </button>

          {/* Elimina + Modifica */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-50"
            >
              {isDeleting
                ? <Loader2 size={12} className="animate-spin" />
                : <Trash2 size={12} />}
              Elimina
            </button>

            <EditReservationDialog
              reservation={reservation}
              tables={allTables}
              occupiedTableIds={occupiedTableIds}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function BookingsViewer({ days, allTables, occupiedByDay }: BookingsViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedDay = days[selectedIndex]
  const occupied = occupiedByDay[selectedDay.key] ?? []
  const totalBookings = days.reduce((sum, d) => sum + d.bookings.length, 0)

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-slate-900 text-lg uppercase tracking-tight">
              Prossimi <span className="text-red-600">7 giorni</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {totalBookings} prenotazioni totali
            </p>
          </div>
          <Calendar size={18} className="text-slate-300" />
        </div>

        {/* ── Day pills ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((day, i) => {
            const active = i === selectedIndex
            const hasBookings = day.bookings.length > 0
            const label = isToday(day.date) ? "oggi" : isTomorrow(day.date) ? "dom" : format(day.date, "EEE", { locale: it })
            return (
              <button
                key={day.key}
                onClick={() => setSelectedIndex(i)}
                className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-150 min-w-[56px]
                  ${active
                    ? "bg-slate-950 shadow-lg shadow-slate-200"
                    : "bg-slate-50 hover:bg-slate-100"
                  }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-slate-400" : "text-slate-400"}`}>
                  {label}
                </span>
                <span className={`text-lg font-black leading-tight ${active ? "text-white" : "text-slate-700"}`}>
                  {format(day.date, "d")}
                </span>
                <div className={`w-1 h-1 rounded-full mt-0.5 ${hasBookings ? "bg-red-500" : "bg-transparent"}`} />
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Day title + count ── */}
      <div className="px-6 py-4 flex items-center justify-between">
        <h3 className="font-black text-slate-800 text-base capitalize">
          {format(selectedDay.date, "EEEE d MMMM", { locale: it })}
        </h3>
        <span className={`text-xs font-black px-3 py-1 rounded-full
          ${selectedDay.bookings.length > 0
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-400"
          }`}>
          {selectedDay.bookings.length} {selectedDay.bookings.length === 1 ? "arrivo" : "arrivi"}
        </span>
      </div>

      {/* ── List ── */}
      <div className="px-6 pb-6 space-y-3 min-h-[200px]">
        {selectedDay.bookings.length > 0 ? (
          selectedDay.bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              reservation={booking}
              allTables={allTables}
              occupiedTableIds={occupied.filter((id) => id !== booking.tableId)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3">
              <Calendar size={20} className="text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold text-sm">Nessuna prenotazione</p>
            <p className="text-slate-300 text-xs font-medium mt-1">Giornata libera</p>
          </div>
        )}
      </div>
    </div>
  )
}