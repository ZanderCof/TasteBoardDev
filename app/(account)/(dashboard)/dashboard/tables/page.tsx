// app/(account)/(dashboard)/dashboard/tables/page.tsx
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DeleteTableButton } from "@/components/my_components/dashboard/tables/DeleteTableButton"
import { AddTableDialog } from "@/components/my_components/dashboard/tables/AddTableDialog"
import { BulkAddTablesDialog } from "@/components/my_components/dashboard/tables/BulkAddTablesDialog"
import { ClientOnly } from "@/components/my_components/ClientOnly"
import { Armchair, Users, LayoutGrid, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

type PageProps = {
  searchParams: Promise<{ restaurantId?: string }>
}

/* ============================================================
   SEAT DOTS — Server-side (niente JS, puro HTML/CSS)
   ============================================================ */

function SeatDots({ count, max = 10 }: { count: number; max?: number }) {
  const dots = Math.min(count, max)
  return (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: dots }).map((_, i) => (
        <span key={i} className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
      ))}
      {count > max && (
        <span className="text-[10px] font-black text-red-400 self-center">+{count - max}</span>
      )}
    </div>
  )
}

/* ============================================================
   CAPACITY BADGE COLOR
   ============================================================ */

function capacityColor(max: number) {
  if (max <= 2) return "bg-sky-50 text-sky-600 border-sky-100"
  if (max <= 4) return "bg-emerald-50 text-emerald-600 border-emerald-100"
  if (max <= 6) return "bg-amber-50 text-amber-600 border-amber-100"
  return "bg-red-50 text-red-600 border-red-100"
}

/* ============================================================
   PAGE
   ============================================================ */

export default async function TablesPage({ searchParams }: PageProps) {
  const { restaurantId: restaurantParam } = await searchParams
  const session = await auth()

  if (!session?.user?.id) redirect("/login")

  // Trova il ristorante attivo
  let currentRestaurantId = restaurantParam
  if (!currentRestaurantId) {
    const firstRestaurant = await prisma.restaurant.findFirst({
      where: { userId: session.user.id },
      select: { id: true },
    })
    if (!firstRestaurant) redirect("/dashboard/restaurants/new")
    currentRestaurantId = firstRestaurant.id
  }

  // Recupera i tavoli ordinati per nome
  const tables = await prisma.table.findMany({
    where: { restaurantId: currentRestaurantId },
    orderBy: { name: "asc" },
  })

  // Statistiche aggregate
  const totalSeatsMin = tables.reduce((s, t) => s + t.minCapacity, 0)
  const totalSeatsMax = tables.reduce((s, t) => s + t.maxCapacity, 0)
  const bySize = {
    small: tables.filter((t) => t.maxCapacity <= 2).length,
    medium: tables.filter((t) => t.maxCapacity > 2 && t.maxCapacity <= 4).length,
    large: tables.filter((t) => t.maxCapacity > 4 && t.maxCapacity <= 6).length,
    xlarge: tables.filter((t) => t.maxCapacity > 6).length,
  }

  return (
    <div className="p-6 sm:p-8 bg-slate-50 min-h-screen space-y-8">

      {/* ── HEADER ── */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Sala e <span className="text-red-600">Tavoli</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            I tavoli configurati qui verranno proposti durante le prenotazioni in base a orario e numero di ospiti.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BulkAddTablesDialog
            restaurantId={currentRestaurantId}
            existingCount={tables.length}
          />
          <AddTableDialog
            restaurantId={currentRestaurantId}
            existingCount={tables.length}
          />
        </div>
      </header>

      {tables.length > 0 ? (
        <>
          {/* ── STATS BAR ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile
              label="Tavoli totali"
              value={String(tables.length)}
              icon={<LayoutGrid className="h-4 w-4" />}
              color="slate"
            />
            <StatTile
              label="Coperti max"
              value={String(totalSeatsMax)}
              sub={`min ${totalSeatsMin}`}
              icon={<Users className="h-4 w-4" />}
              color="red"
            />
            <StatTile
              label="Piccoli (≤4)"
              value={String(bySize.small + bySize.medium)}
              sub="1–4 posti"
              icon={<Armchair className="h-4 w-4" />}
              color="sky"
            />
            <StatTile
              label="Grandi (5+)"
              value={String(bySize.large + bySize.xlarge)}
              sub="5+ posti"
              icon={<Armchair className="h-4 w-4" />}
              color="amber"
            />
          </div>

          {/* ── GRID TAVOLI ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((table) => (
              <div
                key={table.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Top accent bar — larghezza proporzionale alla capienza */}
                <div className="h-1 w-full bg-slate-100">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${Math.min((table.maxCapacity / 12) * 100, 100)}%` }}
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col gap-4">
                  {/* Nome */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                        <Armchair size={16} />
                      </div>
                      <h3 className="font-black text-slate-900 tracking-tight leading-tight">
                        {table.name}
                      </h3>
                    </div>
                    {/* Delete — visibile solo al hover del card */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <DeleteTableButton tableId={table.id} />
                    </div>
                  </div>

                  {/* Seat dots */}
                  <SeatDots count={table.maxCapacity} />

                  {/* Capacity badge */}
                  <div
                    className={cn(
                      "self-start text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border",
                      capacityColor(table.maxCapacity),
                    )}
                  >
                    {table.minCapacity === table.maxCapacity
                      ? `${table.maxCapacity} posti`
                      : `${table.minCapacity}–${table.maxCapacity} posti`}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick-add ghost card — montata solo client-side per evitare un
                falso mismatch di hydration sull'id generato da Radix in questa
                posizione dinamica della lista */}
            <ClientOnly>
              <AddTableDialog
                restaurantId={currentRestaurantId}
                existingCount={tables.length}
              >
                <button
                  type="button"
                  className="border-2 border-dashed border-slate-200 rounded-2xl p-5 h-full min-h-40 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-red-300 hover:text-red-500 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest">
                    Aggiungi tavolo
                  </span>
                </button>
              </AddTableDialog>
            </ClientOnly>
          </div>
        </>
      ) : (
        /* ── EMPTY STATE ── */
        <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
          <div className="w-20 h-20 bg-white rounded-2xl border border-dashed border-slate-200 flex items-center justify-center shadow-sm">
            <Armchair size={28} className="text-slate-300" />
          </div>
          <div className="space-y-1 max-w-xs">
            <h3 className="font-black text-lg text-slate-800">Nessun tavolo configurato</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Aggiungi i tavoli della tua sala. Durante le prenotazioni il sistema mostrerà solo i tavoli liberi e con capienza adeguata.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BulkAddTablesDialog restaurantId={currentRestaurantId} existingCount={0} />
            <AddTableDialog restaurantId={currentRestaurantId} existingCount={0} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   STAT TILE
   ============================================================ */

function StatTile({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string
  value: string
  sub?: string
  icon: React.ReactNode
  color: "slate" | "red" | "sky" | "amber"
}) {
  const colors = {
    slate: "bg-white text-slate-600 border-slate-100",
    red: "bg-red-50 text-red-600 border-red-100",
    sky: "bg-sky-50 text-sky-600 border-sky-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  }

  return (
    <div className={cn("rounded-2xl border p-4 flex items-center gap-3 shadow-sm", colors[color])}>
      <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 truncate">{label}</p>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
        {sub && <p className="text-[10px] font-bold opacity-60 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}