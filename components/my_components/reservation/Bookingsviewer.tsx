// components/my_components/reservation/BookingsViewer.tsx
"use client"

import { useState } from "react"
import { format, isToday, isTomorrow } from "date-fns"
import { it } from "date-fns/locale"
import {
  ChevronRight, Users, Phone, Trash2, Loader2,
  Armchair, Monitor, PhoneCall, Calendar, CheckCircle2, Clock,
} from "lucide-react"
import { deleteReservation, confirmArrival } from "@/app/actions/bookings"
import { EditReservationDialog } from "../dashboard/tables/EditReservationDialog"

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Booking Row ─────────────────────────────────────────────────────────────

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

  const time = format(new Date(reservation.date), "HH:mm")

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
    if (!confirm(`Confermi che ${reservation.customerName} ha liberato il tavolo?`)) return
    setIsArriving(true)
    try {
      setArrived(true)
      await new Promise((r) => setTimeout(r, 500))
      await confirmArrival(reservation.id)
    } catch (e) {
      console.error(e)
      setIsArriving(false)
      setArrived(false)
    }
  }

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 ease-out overflow-hidden
        ${arrived
          ? "opacity-0 scale-95 pointer-events-none"
          : expanded
            ? "bg-slate-50/40 border-slate-200 shadow-md"
            : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm hover:-translate-y-0.5"
        }`}
    >
      {/* Accent bar laterale */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-300
        ${arrived ? "bg-emerald-500" : reservation.isManual ? "bg-blue-500" : "bg-violet-500"}`}
      />

      {/* Main row */}
      <div
        className="flex items-center gap-4 px-5 py-4 pl-6 cursor-pointer select-none"
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Time bubble */}
        <div className="shrink-0 w-14 h-14 rounded-xl bg-slate-900 shadow-sm flex flex-col items-center justify-center border border-slate-800">
          <span className="text-white font-bold text-base tracking-tight leading-none">{time}</span>
          <span className="text-slate-500 text-[9px] font-black uppercase tracking-wider mt-1">
            <Clock size={8} className="inline mr-0.5" />ora
          </span>
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-900 text-base tracking-tight truncate">
              {reservation.customerName}
            </span>
            {reservation.isManual ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100/50">
                <PhoneCall size={9} /> Tel
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-violet-50 text-violet-600 px-2 py-0.5 rounded-md border border-violet-100/50">
                <Monitor size={9} /> Online
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-1.5">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Users size={12} className="text-slate-400" />
              <strong className="text-slate-700 font-semibold">{reservation.guests}</strong> ospiti
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <Armchair size={12} className="text-slate-400" />
              <strong className="text-slate-700 font-semibold">{reservation.table?.name ?? "—"}</strong>
            </span>
          </div>
        </div>

        {/* Phone + chevron */}
        <div className="shrink-0 flex flex-col items-end gap-2">
          <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100 flex items-center gap-1">
            <Phone size={10} /> {reservation.phone}
          </span>
          <ChevronRight
            size={15}
            className={`text-slate-400 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="px-6 pb-5 pt-2 border-t border-slate-100 space-y-3 bg-white/60">
          {reservation.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-900 font-medium leading-relaxed">
              <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-700 mb-1">Note:</span>
              &quot;{reservation.notes}&quot;
            </div>
          )}

          <button
            onClick={handleArrival}
            disabled={isArriving || arrived}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-100 active:scale-[0.99] disabled:opacity-50"
          >
            {isArriving ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
            {arrived ? "Benvenuto! 🎉" : "Libera tavolo"}
          </button>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-rose-50"
            >
              {isDeleting ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export function BookingsViewer({ days, allTables, occupiedByDay }: BookingsViewerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectedDay = days[selectedIndex]
  const occupied = occupiedByDay[selectedDay.key] ?? []
  const totalBookings = days.reduce((sum, d) => sum + d.bookings.length, 0)

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/40 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-bold text-slate-900 text-lg tracking-tight">
              Prossimi <span className="text-slate-500 font-medium">7 giorni</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              <span className="font-semibold text-slate-600">{totalBookings}</span> prenotazioni registrate
            </p>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-sm">
            <Calendar size={16} className="text-slate-500" />
          </div>
        </div>

        {/* ── Day pills ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((day, i) => {
            const active = i === selectedIndex
            const hasBookings = day.bookings.length > 0
            // Etichetta giorno: Oggi / Dom / Lun ecc.
            const label = isToday(day.date)
              ? "Oggi"
              : isTomorrow(day.date)
                ? "Dom."
                : format(day.date, "EEE", { locale: it })

            return (
              <button
                key={day.key}
                onClick={() => setSelectedIndex(i)}
                className={`shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 min-w-[58px]
                  ${active
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                    : "bg-white border border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 capitalize">
                  {label}
                </span>
                <span className="text-lg font-bold tracking-tight mt-0.5 leading-none">
                  {format(day.date, "d")}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-all
                  ${hasBookings
                    ? active ? "bg-amber-400" : "bg-red-400"
                    : "bg-transparent"
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Day title + count ── */}
      <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-50">
        <h3 className="font-bold text-slate-800 text-base capitalize">
          {format(selectedDay.date, "EEEE d MMMM", { locale: it })}
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border
          ${selectedDay.bookings.length > 0
            ? "bg-emerald-50 border-emerald-100 text-emerald-700"
            : "bg-slate-50 border-slate-100 text-slate-400"
          }`}>
          {selectedDay.bookings.length} {selectedDay.bookings.length === 1 ? "arrivo" : "arrivi"}
        </span>
      </div>

      {/* ── Booking list ── */}
      <div className="px-6 pb-6 pt-3 space-y-3 min-h-[200px]">
        {selectedDay.bookings.length > 0 ? (
          // Ordina per orario
          [...selectedDay.bookings]
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((booking) => (
              <BookingRow
                key={booking.id}
                reservation={booking}
                allTables={allTables}
                occupiedTableIds={occupied.filter((id) => id !== booking.tableId)}
              />
            ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-100 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-300">
              <Calendar size={20} />
            </div>
            <p className="text-slate-700 font-semibold text-sm">Nessuna prenotazione</p>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              I clienti vedono questa giornata come disponibile
            </p>
          </div>
        )}
      </div>
    </div>
  )
}