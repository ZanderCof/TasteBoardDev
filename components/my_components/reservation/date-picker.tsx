"use client"
import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { it } from "date-fns/locale";
import { format } from "date-fns"; // ➕ Importiamo format per gestire le date in modo sicuro

export function DatePickerFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Leggiamo la data dall'URL, se non c'è usiamo oggi
  const dateParam = searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : new Date();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(newDate) => {
        if (newDate) {
          // 1. 🛡️ Cloniamo i parametri attuali dell'URL (mantiene il restaurantId!)
          const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
          
          // 2. 🌍 Formattiamo in YYYY-MM-DD per evitare che il fuso orario UTC sposti il giorno indietro
          const formattedDate = format(newDate, "yyyy-MM-dd");
          
          // 3. Aggiorniamo solo il parametro "date"
          currentParams.set("date", formattedDate);
          
          // 4. Pushiamo la nuova query string completa
          router.push(`?${currentParams.toString()}`);
        }
      }}
      locale={it}
      className="p-0 pointer-events-auto"
    />
  );
}