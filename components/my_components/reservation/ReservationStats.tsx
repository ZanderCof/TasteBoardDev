export function ReservationStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-xl border-b-4 border-red-600 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">Totale Ospiti</p>
        <h3 className="text-3xl font-black text-red-600">42</h3>
      </div>
      <div className="bg-white p-4 rounded-xl border-b-4 border-yellow-400 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">In Attesa</p>
        <h3 className="text-3xl font-black text-yellow-500">5</h3>
      </div>
      <div className="bg-white p-4 rounded-xl border-b-4 border-slate-200 shadow-sm">
        <p className="text-sm text-muted-foreground uppercase font-bold">Tavoli Liberi</p>
        <h3 className="text-3xl font-black text-slate-800">12</h3>
      </div>
    </div>
  )
}
