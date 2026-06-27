// components/my_components/dashboard/tables/BulkAddTablesDialog.tsx
"use client"

import { useState, useTransition } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Layers, Loader2, Plus, Trash2 } from "lucide-react"
import { createTablesBulk } from "@/app/actions/tables"

type Props = {
  restaurantId: string
  /** Numero di tavoli già esistenti → continua la numerazione da qui */
  existingCount?: number
}

type Group = {
  id: number
  quantity: number
  minCapacity: number
  maxCapacity: number
}

function newGroup(id: number): Group {
  return { id, quantity: 10, minCapacity: 2, maxCapacity: 4 }
}

export function BulkAddTablesDialog({ restaurantId, existingCount = 0 }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [namePrefix, setNamePrefix] = useState("Tavolo")
  const [groups, setGroups] = useState<Group[]>([newGroup(1)])
  const [nextGroupId, setNextGroupId] = useState(2)

  function handleOpenChange(next: boolean) {
    if (next) {
      setNamePrefix("Tavolo")
      setGroups([newGroup(1)])
      setNextGroupId(2)
      setError("")
    }
    setOpen(next)
  }

  function updateGroup(id: number, patch: Partial<Group>) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g
        const updated = { ...g, ...patch }
        if (updated.maxCapacity < updated.minCapacity) {
          if (patch.minCapacity !== undefined) updated.maxCapacity = updated.minCapacity
          else updated.minCapacity = updated.maxCapacity
        }
        return updated
      }),
    )
  }

  function addGroup() {
    setGroups((prev) => [...prev, newGroup(nextGroupId)])
    setNextGroupId((id) => id + 1)
  }

  function removeGroup(id: number) {
    setGroups((prev) => prev.filter((g) => g.id !== id))
  }

  const totalTables = groups.reduce((sum, g) => sum + (g.quantity || 0), 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (groups.some((g) => g.quantity < 1)) {
      setError("Ogni gruppo deve avere almeno 1 tavolo.")
      return
    }
    if (groups.some((g) => g.minCapacity > g.maxCapacity)) {
      setError("I posti minimi non possono superare i massimi.")
      return
    }
    setError("")

    startTransition(async () => {
      try {
        await createTablesBulk({
          restaurantId,
          namePrefix,
          startIndex: existingCount + 1,
          groups: groups.map(({ quantity, minCapacity, maxCapacity }) => ({
            quantity,
            minCapacity,
            maxCapacity,
          })),
        })
        setOpen(false)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : "Errore durante il salvataggio. Riprova.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full h-11 px-6 font-bold border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-600"
        >
          <Layers className="mr-2 h-4 w-4" />
          Crea più tavoli
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-3xl bg-white p-0 overflow-hidden gap-0">
        {/* HEADER */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
            Crea <span className="text-red-600">più tavoli</span>
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Utile per locali grandi: definisci gruppi per quantità e capienza, es. 10 tavoli da 2-4 posti e 20 da 4-8.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* PREFISSO NOME */}
          <div className="space-y-1.5">
            <Label htmlFor="namePrefix" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Prefisso nome
            </Label>
            <Input
              id="namePrefix"
              value={namePrefix}
              onChange={(e) => setNamePrefix(e.target.value)}
              placeholder="Tavolo"
              className="h-11 rounded-xl border-slate-200 font-semibold focus-visible:ring-red-500/20 focus-visible:border-red-400"
            />
            <p className="text-xs text-slate-400 font-medium">
              I tavoli si chiameranno &quot;{namePrefix || "Tavolo"} {existingCount + 1}&quot;, &quot;{namePrefix || "Tavolo"} {existingCount + 2}&quot;, ecc.
            </p>
          </div>

          {/* GRUPPI */}
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Gruppi per capienza
            </Label>

            {groups.map((group, idx) => (
              <div
                key={group.id}
                className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex items-end gap-3"
              >
                <div className="space-y-1 flex-1">
                  <Label htmlFor={`qty-${group.id}`} className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Quantità
                  </Label>
                  <Input
                    id={`qty-${group.id}`}
                    type="number"
                    min={1}
                    value={group.quantity}
                    onChange={(e) => updateGroup(group.id, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="h-10 rounded-xl border-slate-200 font-bold text-center bg-white focus-visible:ring-red-500/20 focus-visible:border-red-400"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label htmlFor={`min-${group.id}`} className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Min posti
                  </Label>
                  <Input
                    id={`min-${group.id}`}
                    type="number"
                    min={1}
                    value={group.minCapacity}
                    onChange={(e) => updateGroup(group.id, { minCapacity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="h-10 rounded-xl border-slate-200 font-bold text-center bg-white focus-visible:ring-red-500/20 focus-visible:border-red-400"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Label htmlFor={`max-${group.id}`} className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Max posti
                  </Label>
                  <Input
                    id={`max-${group.id}`}
                    type="number"
                    min={1}
                    value={group.maxCapacity}
                    onChange={(e) => updateGroup(group.id, { maxCapacity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="h-10 rounded-xl border-slate-200 font-bold text-center bg-white focus-visible:ring-red-500/20 focus-visible:border-red-400"
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={groups.length === 1}
                  onClick={() => removeGroup(group.id)}
                  aria-label={`Rimuovi gruppo ${idx + 1}`}
                  className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl shrink-0 disabled:opacity-30"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            <button
              type="button"
              onClick={addGroup}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-xs font-black uppercase tracking-widest hover:border-red-300 hover:text-red-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <Plus size={14} />
              Aggiungi gruppo
            </button>
          </div>

          {/* RIEPILOGO */}
          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-center">
            <p className="text-sm font-bold text-red-700">
              Stai per creare <span className="text-base font-black">{totalTables}</span>{" "}
              {totalTables === 1 ? "tavolo" : "tavoli"}
            </p>
          </div>

          {/* ERRORE */}
          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          {/* CTA */}
          <Button
            type="submit"
            disabled={isPending || totalTables === 0}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black h-11 rounded-xl transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creazione in corso...
              </>
            ) : (
              `Crea ${totalTables} ${totalTables === 1 ? "tavolo" : "tavoli"}`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
