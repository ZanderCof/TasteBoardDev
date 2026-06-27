"use client"

import { useEffect, useState } from "react"

/**
 * Monta i children solo dopo l'hydration. Usato per isolare elementi che
 * generano falsi mismatch di hydration con librerie terze (es. id generati
 * da Radix in posizioni dinamiche di liste), senza dover marcare l'intera
 * pagina come client-only.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <>{children}</>
}
