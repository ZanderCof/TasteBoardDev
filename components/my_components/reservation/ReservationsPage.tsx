import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Prenotazioni</h1>
          <p className="text-muted-foreground">Gestisci i tavoli di TasteBoard</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-6">
          <Plus className="mr-2 h-4 w-4" /> Nuova Prenotazione
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonna Sinistra: Filtri e Calendario */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border-none"
            />
          </div>
        </div>

        {/* Colonna Destra: Lista Prenotazioni */}
        <div className="lg:col-span-8">
          <ReservationStats />
          <div className="space-y-4">
            <h2 className="font-bold text-xl text-slate-800 border-l-4 border-yellow-400 pl-3">
              Oggi, {date?.toLocaleDateString()}
            </h2>
            {/* Map delle prenotazioni qui */}
            <ReservationCard reservation={{
              customerName: "Mario Rossi",
              time: "20:30",
              guests: 4,
              status: "CONFIRMED",
              phone: "+39 333..."
            }} />
            {/* ...altre card */}
          </div>
        </div>
      </div>
    </div>
  )
}
