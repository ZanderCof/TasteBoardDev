// components/my_components/dashboard/DashboardKpiGrid.tsx
"use client";

import { QuickStatCard } from "@/components/my_components/dashboard/QuickStatCard ";
import { Clock, CalendarCheck, Armchair, Star } from "lucide-react";

interface DashboardKpiGridProps {
  pendingCount: number;
  todayBookingsCount: number;
  totalCoversToday: number;
  tablesCount: number;
}

export function DashboardKpiGrid({
  pendingCount,
  todayBookingsCount,
  totalCoversToday,
  tablesCount,
}: DashboardKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 rounded-[3rem] border border-slate-100 bg-slate-400/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02),0_10px_40px_-15px_rgba(0,0,0,0.1)]">
      <QuickStatCard
        label="Da Approvare"
        value={pendingCount}
        icon={Clock}
        trend={pendingCount > 0 ? "Urgente" : "In pari"}
        trendType={pendingCount > 0 ? "down" : "neutral"}
        color="amber"
        description="Richiedono conferma"
      />
      <QuickStatCard
        label="Prenotazioni Oggi"
        value={todayBookingsCount}
        icon={CalendarCheck}
        trend={todayBookingsCount > 0 ? `+${todayBookingsCount}` : "Nessuna"}
        trendType={todayBookingsCount > 0 ? "up" : "neutral"}
        color="indigo"
        description="Confermate per oggi"
      />
      <QuickStatCard
        label="Coperti Oggi"
        value={totalCoversToday}
        icon={Armchair}
        trend={tablesCount > 0 ? `${tablesCount} tavoli` : "Nessun tavolo"}
        trendType="neutral"
        color="violet"
        description="Ospiti previsti"
      />
      <QuickStatCard
        label="Rating Medio"
        value="—"
        icon={Star}
        trend="Presto"
        trendType="neutral"
        color="emerald"
        description="Recensioni in arrivo"
      />
    </div>
  );
}