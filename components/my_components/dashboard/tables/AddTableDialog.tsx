// components/my_components/dashboard/tables/AddTableDialog.tsx
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
import { Plus, Loader2, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { createTable } from "@/app/actions/tables"

/* ============================================================
   TIPI E COSTANTI
   ============================================================ */

type Props = {
  restaurantId: string
  /** Numero di tavoli già esistenti → suggerisce il prossimo nome automaticamente */
  existingCount?: number
  /** Trigger personalizzato. Se omesso viene usato il bottone rosso di default. */
  children?: React.ReactNode
}

/** Preset rapidi: [label, min, max] */
const CAPACITY_PRESETS: [string, number, number][] = [
  ["2", 1, 2],
  ["4", 2, 4],
  ["6", 4, 6],
  ["8", 6, 8],
  ["10+", 8, 12],
]

/* ============================================================
   SEAT DOTS — visualizzazione grafica posti
   ============================================================ */

function SeatDots({ count, max = 12 }: { count: number; max?: number }) {
  const dots = Math.min(count, max)
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {Array.from({ length: dots }).map((_, i) => (
        <span
          key={i}
          className="w-3 h-3 rounded-full bg-red-500 inline-block transition-all duration-200"
        />
      ))}
      {count > max && (
        <span className="text-[10px] font-black text-red-400">+{count - max}</span>
      )}
    </div>
  )
}

/* ============================================================
   COMPONENT
   ============================================================ */

export function AddTableDialog({ restaurantId, existingCount = 0, children }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [name, setName] = useState(`Tavolo ${existingCount + 1}`)
  const [minCap, setMinCap] = useState(2)
  const [maxCap, setMaxCap] = useState(4)
  const [activePreset, setActivePreset] = useState<number>(1)

  // Reset del form spostato nell'handler di apertura — niente useEffect con setState
  function handleOpenChange(next: boolean) {
    if (next) {
      setName(`Tavolo ${existingCount + 1}`)
      setMinCap(2)
      setMaxCap(4)
      setActivePreset(1)
      setError("")
    }
    setOpen(next)
  }

  function applyPreset(idx: number) {
    const [, min, max] = CAPACITY_PRESETS[idx]
    setMinCap(min)
    setMaxCap(max)
    setActivePreset(idx)
  }

  function handleMaxCapChange(val: number) {
    const clamped = Math.max(1, val)
    setMaxCap(clamped)
    if (minCap > clamped) setMinCap(clamped)
    setActivePreset(-1) // deseleziona il preset
  }

  function handleMinCapChange(val: number) {
    const clamped = Math.max(1, val)
    setMinCap(clamped)
    if (maxCap < clamped) setMaxCap(clamped)
    setActivePreset(-1)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError("Il nome del tavolo è obbligatorio.")
      return
    }
    if (minCap > maxCap) {
      setError("I posti minimi non possono superare i massimi.")
      return
    }
    setError("")

    startTransition(async () => {
      try {
        await createTable({
          name: name.trim(),
          minCapacity: minCap,
          maxCapacity: maxCap,
          restaurantId,
        })
        setOpen(false)
      } catch (err) {
        console.error(err)
        setError("Errore durante il salvataggio. Riprova.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ?? (
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-11 px-6 shadow-md shadow-red-100 active:scale-95 transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi tavolo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-3xl bg-white p-0 overflow-hidden gap-0">

        {/* HEADER */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">
            Nuovo <span className="text-red-600">Tavolo</span>
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            Imposta nome e capienza. Potrai modificarli in seguito.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* NOME */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Nome / Numero tavolo
            </Label>
            <Input
              id="name"
              autoFocus
              placeholder="Es. Tavolo 5, Privé 1, Terrazza..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl border-slate-200 font-semibold focus-visible:ring-red-500/20 focus-visible:border-red-400"
            />
          </div>

          {/* CAPIENZA — preset rapidi */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              Capienza (posti a sedere)
            </Label>

            {/* Preset buttons */}
            <div className="flex gap-2 flex-wrap">
              {CAPACITY_PRESETS.map(([label], idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(idx)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-xl text-sm font-black border transition-all",
                    activePreset === idx
                      ? "bg-red-600 text-white border-red-600 shadow-sm shadow-red-200"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-red-300 hover:text-red-600",
                  )}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setActivePreset(-1)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-sm font-black border transition-all",
                  activePreset === -1
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400",
                )}
              >
                Personalizza
              </button>
            </div>

            {/* Min / Max numerici */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1.5">
                <Label htmlFor="minCap" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Minimo
                </Label>
                <Input
                  id="minCap"
                  type="number"
                  min={1}
                  value={minCap}
                  onChange={(e) => handleMinCapChange(parseInt(e.target.value) || 1)}
                  className="h-11 rounded-xl border-slate-200 font-bold text-center text-lg focus-visible:ring-red-500/20 focus-visible:border-red-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="maxCap" className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Massimo
                </Label>
                <Input
                  id="maxCap"
                  type="number"
                  min={1}
                  value={maxCap}
                  onChange={(e) => handleMaxCapChange(parseInt(e.target.value) || 1)}
                  className="h-11 rounded-xl border-slate-200 font-bold text-center text-lg focus-visible:ring-red-500/20 focus-visible:border-red-400"
                />
              </div>
            </div>
          </div>

          {/* ANTEPRIMA VISIVA */}
          <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex flex-col items-center gap-3">
            <SeatDots count={maxCap} />
            <p className="text-xs font-bold text-slate-500 text-center">
              <span className="text-slate-900">{name || "Tavolo"}</span>
              {" · "}da {minCap} a {maxCap} coperti
            </p>
          </div>

          {/* ERRORE */}
          {error && (
            <p className="text-xs font-bold text-red-500">{error}</p>
          )}

          {/* CTA */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black h-11 rounded-xl transition-all active:scale-[0.98]"
          >
            {isPending ? (
              <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Salvataggio...</>
            ) : (
              `Aggiungi "${name || "Tavolo"}"`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}