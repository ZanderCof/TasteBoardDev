"use client"
import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { it } from "date-fns/locale";

export function DatePickerFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date();

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={(newDate) => {
        if (newDate) {
          router.push(`?date=${newDate.toISOString()}`);
        }
      }}
      locale={it}
      className="p-0 pointer-events-auto"
    />
  );
}
