"use client";

import { useMemo, useState } from "react";
import { LifeBuoy, Plus, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { SupportForm } from "./support-form";
import { TicketList } from "./ticket-list";
import type { HubTicketDetail } from "@/lib/hub-sync";

export function SupportView({
  restaurantId,
  tickets,
  error,
}: {
  restaurantId: string;
  tickets: HubTicketDetail[];
  error?: string;
}) {
  const [tab, setTab] = useState<"list" | "new">("list");

  const openCount = useMemo(
    () => tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length,
    [tickets],
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LifeBuoy size={26} className="text-red-600" />
            <h1 className="text-3xl font-black text-slate-900">Assistenza</h1>
          </div>
          <p className="text-slate-500 text-sm">
            {openCount > 0
              ? `Hai ${openCount} ${openCount === 1 ? "ticket aperto" : "ticket aperti"}.`
              : "Nessun ticket aperto al momento."}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-2xl p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setTab("list")}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              tab === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50",
            )}
          >
            <ListChecks size={14} />
            I tuoi ticket
          </button>
          <button
            type="button"
            onClick={() => setTab("new")}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              tab === "new" ? "bg-red-600 text-white" : "text-slate-500 hover:bg-slate-50",
            )}
          >
            <Plus size={14} />
            Nuovo ticket
          </button>
        </div>
      </div>

      {tab === "new" ? (
        <SupportForm restaurantId={restaurantId} onCreated={() => setTab("list")} />
      ) : (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-6 sm:p-8">
          <TicketList tickets={tickets} error={error} />
        </div>
      )}
    </div>
  );
}
