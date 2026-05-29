// components/my_components/tables/DeleteTableButton.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deleteTable } from "@/app/actions/tables"

export function DeleteTableButton({ tableId }: { tableId: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Sei sicuro di voler eliminare questo tavolo? Le prenotazioni assegnate perderanno il tavolo.")) return
    setLoading(true)
    try {
      await deleteTable(tableId)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      size="icon" 
      variant="ghost" 
      onClick={handleDelete}
      disabled={loading}
      className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-100 sm:opacity-0 group-hover:opacity-100"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </Button>
  )
}