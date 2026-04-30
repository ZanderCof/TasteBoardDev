// app/not-found.tsx
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Utensils } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 pt-32 pb-20 text-center">
      {/* Icona decorativa */}
      <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-600 mb-8 animate-bounce">
        <Utensils size={40} />
      </div>

      <h1 className="text-7xl md:text-9xl font-black text-slate-200 absolute -z-10 select-none">
        404
      </h1>

      <h2 className="text-4xl font-black text-slate-900 mb-4">
        Ops! Pagina non trovata.
      </h2>
      
      <p className="text-slate-500 max-w-md mb-10 text-lg">
        La pagina che stai cercando non è qui.
      </p>

      <Link href="/">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-14 rounded-2xl shadow-xl shadow-red-200 transition-transform hover:scale-105">
          Torna alla Home
        </Button>
      </Link>
    </div>
  )
}
