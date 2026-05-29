// components/my_components/reservation/ReservationCard.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, Phone, Trash2, Loader2, Armchair, Monitor, PhoneCall } from "lucide-react"
import { deleteReservation } from "@/app/actions/bookings"
import { EditReservationDialog } from "./EditReservationDialog"

interface ReservationCardProps {
  reservation: {
    id: string;
    customerName: string;
    phone: string;
    date: Date;
    guests: number;
    status: "PENDING" | "CONFIRMED" | "DECLINED" | "CANCELLED";
    isManual: boolean;
    notes?: string | null;
    tableId: string | null;
    table?: {
      id: string;
      name: string;
    } | null;
  };
  allTables: { id: string; name: string; minCapacity: number; maxCapacity: number; }[]; // ➕ Serve per la modale di modifica
}

export function ReservationCard({ reservation, allTables }: ReservationCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Vuoi davvero eliminare la prenotazione a nome di ${reservation.customerName}?`)) return
    setIsDeleting(true)
    try {
      await deleteReservation(reservation.id)
    } catch (error) {
      console.error(error)
      setIsDeleting(false)
    }
  }

  // Estraiamo l'ora in modo sicuro dal formato ISO salvato
  const orarioArrivo = new Date(reservation.date).toISOString().split('T')[1].substring(0, 5)

  return (
    <Card className="border-l-4 border-l-emerald-600 hover:shadow-md transition-shadow bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-5 space-y-4">
        
        {/* RIGA SUPERIORE: Anagrafica e Contatti */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-lg text-slate-900">{reservation.customerName}</h4>
              {reservation.isManual ? (
                <Badge className="bg-blue-50 text-blue-600 border-none text-[10px] font-black px-2 py-0">
                  <PhoneCall size={10} className="mr-1" /> TELEFONO
                </Badge>
              ) : (
                <Badge className="bg-purple-50 text-purple-600 border-none text-[10px] font-black px-2 py-0">
                  <Monitor size={10} className="mr-1" /> ONLINE
                </Badge>
              )}
            </div>
            
            {/* Orario e Persone */}
            <div className="flex items-center text-sm text-slate-500 gap-4">
              <span className="flex items-center gap-1 font-semibold">
                <Clock size={14} className="text-slate-400"/> {orarioArrivo}
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Users size={14} className="text-slate-400"/> 
                {reservation.guests} {reservation.guests === 1 ? 'persona' : 'persone'}
              </span>
            </div>
          </div>

          {/* Badge Stato e Telefono */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-bold flex items-center gap-1 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
              <Phone size={12} className="text-slate-400"/> {reservation.phone}
            </span>
          </div>
        </div>

        {/* 🪑 BLOCCO TAVOLO ASSEGNATO (Ben visibile) */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Armchair size={14} />
            </div>
            <div className="text-xs">
              <p className="text-slate-400 font-bold uppercase text-[9px]">Tavolo Assegnato</p>
              <p className="font-black text-slate-800 text-sm">
                {reservation.table ? reservation.table.name : "⚠️ Nessun tavolo selezionato"}
              </p>
            </div>
          </div>
        </div>

        {/* Note del cliente */}
        {reservation.notes && (
          <p className="text-xs text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100/50">
            "{reservation.notes}"
          </p>
        )}

        {/* RIGA INFERIORE: Menu Azioni Rapide */}
        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
          {/* Bottone Elimina */}
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs text-slate-400 hover:text-rose-600 font-bold rounded-lg h-8 px-2.5 hover:bg-rose-50"
          >
            {isDeleting ? <Loader2 size={13} className="animate-spin mr-1" /> : <Trash2 size={13} className="mr-1" />}
            Elimina
          </Button>

          {/* Modale di Modifica */}
          <EditReservationDialog reservation={reservation} tables={allTables} />
        </div>

      </CardContent>
    </Card>
  )
}