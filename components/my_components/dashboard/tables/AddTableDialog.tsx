// components/my_components/tables/AddTableDialog.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from "lucide-react"
import { createTable } from "@/app/actions/tables"

export function AddTableDialog({ restaurantId }: { restaurantId: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [minCap, setMinCap] = useState("1")
  const [maxCap, setMaxCap] = useState("4")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      await createTable({
        name,
        minCapacity: parseInt(minCap),
        maxCapacity: parseInt(maxCap),
        restaurantId,
      })
      setName("")
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
        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full h-11 px-6 shadow-md shadow-red-100 active:scale-95 transition-all">
          <Plus className="mr-2 h-4 w-4" /> Aggiungi Tavolo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Nuovo <span className="text-red-600">Tavolo</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-bold text-slate-700 uppercase text-xs">Nome / Numero Tavolo</Label>
            <Input id="name" placeholder="Es: Tavolo 5, Privè 1..." value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border-slate-200 h-11 font-medium" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minCap" className="font-bold text-slate-700 uppercase text-xs">Posti Minimi</Label>
              <Input id="minCap" type="number" min="1" value={minCap} onChange={(e) => setMinCap(e.target.value)} className="rounded-xl border-slate-200 h-11 font-medium" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCap" className="font-bold text-slate-700 uppercase text-xs">Posti Massimi</Label>
              <Input id="maxCap" type="number" min="1" value={maxCap} onChange={(e) => setMaxCap(e.target.value)} className="rounded-xl border-slate-200 h-11 font-medium" required />
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold h-11 rounded-xl transition-all">
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Salva Tavolo"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}