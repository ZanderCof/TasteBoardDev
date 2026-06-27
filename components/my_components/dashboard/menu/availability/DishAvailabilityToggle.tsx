"use client";

import { useOptimistic, useTransition } from "react";
import { toggleDishAvailability } from "@/app/(account)/(dashboard)/dashboard/menu/action";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Props {
  dishId: string;
  name: string;
  price: number;
  available: boolean;
}

export function DishAvailabilityToggle({ dishId, name, price, available }: Props) {
  const [optimisticAvailable, setOptimisticAvailable] = useOptimistic(available);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    const next = !optimisticAvailable;
    startTransition(async () => {
      setOptimisticAvailable(next);
      await toggleDishAvailability(dishId, next);
    });
  }

  return (
    <div
      onClick={handleToggle}
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 active:scale-[0.98]",
        optimisticAvailable
          ? "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
          : "bg-slate-50 border-slate-100 opacity-60"
      )}
    >
      {/* Nome + prezzo */}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-bold text-base leading-tight truncate transition-colors",
          optimisticAvailable ? "text-slate-900" : "text-slate-400 line-through decoration-slate-300"
        )}>
          {name}
        </p>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">
          €{price.toFixed(2)}
        </p>
      </div>

      {/* Toggle */}
      <div className="shrink-0 flex items-center gap-3">
        {/* Etichetta stato */}
        <span className={cn(
          "hidden sm:block text-[10px] font-black uppercase tracking-widest transition-colors",
          optimisticAvailable ? "text-emerald-500" : "text-slate-400"
        )}>
          {optimisticAvailable ? "Disponibile" : "Esaurito"}
        </span>

        {/* Switch visivo */}
        {isPending ? (
          <div className="w-12 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <Loader2 size={13} className="animate-spin text-slate-400" />
          </div>
        ) : (
          <div className={cn(
            "relative w-12 h-7 rounded-full transition-all duration-300",
            optimisticAvailable ? "bg-emerald-500" : "bg-slate-200"
          )}>
            <div className={cn(
              "absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300",
              optimisticAvailable ? "left-6" : "left-1"
            )} />
          </div>
        )}
      </div>
    </div>
  );
}