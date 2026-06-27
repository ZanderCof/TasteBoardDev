"use client";

import { useTransition } from "react";
import { resetAllDishAvailability } from "@/app/(account)/(dashboard)/dashboard/menu/action";
import { RefreshCw, Loader2 } from "lucide-react";

export function ResetAvailabilityButton({ menuId }: { menuId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleReset() {
    startTransition(async () => {
      await resetAllDishAvailability(menuId);
    });
  }

  return (
    <button
      onClick={handleReset}
      disabled={isPending}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all disabled:opacity-50"
    >
      {isPending
        ? <Loader2 size={13} className="animate-spin" />
        : <RefreshCw size={13} />
      }
      Ripristina tutto
    </button>
  );
}