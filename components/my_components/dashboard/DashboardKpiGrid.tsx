"use client";

import Link from "next/link";
import { Clock, CalendarCheck, Armchair, LayoutGrid } from "lucide-react";
import { QuickStatCard } from "./QuickStatCard ";

interface DashboardKpiGridProps {
  pendingCount: number;
  todayBookingsCount: number;
  totalCoversToday: number;
  tablesCount: number;
  occupancy: number;
  totalDishes: number;
  hasMenu: boolean;
}

export function DashboardKpiGrid({
  pendingCount,
  todayBookingsCount,
  totalCoversToday,
  tablesCount,
  occupancy,
  totalDishes,
  hasMenu,
}: DashboardKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <QuickStatCard
        label="Da Confermare"
        value={pendingCount}
        icon={Clock}
        trend={
          pendingCount === 0
            ? "Tutto gestito"
            : `${pendingCount} in attesa`
        }
        trendType={pendingCount > 0 ? "down" : "neutral"}
        color="amber"
        description="Prenotazioni da controllare"
      />

      <QuickStatCard
        label="Prenotazioni Oggi"
        value={todayBookingsCount}
        icon={CalendarCheck}
        trend={`${totalCoversToday} coperti`}
        trendType="up"
        color="red"
        description="Prenotazioni confermate"
      />

      <QuickStatCard
        label="Occupazione"
        value={`${occupancy}%`}
        icon={Armchair}
        trend={`${tablesCount} tavoli`}
        trendType="neutral"
        color="slate"
        description="Capacità prevista"
      />

      {/* CARD NAVIGABILE */}
      <Link
        href="/dashboard/menu"
        className="block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        <QuickStatCard
          label="Menu Online"
          value={totalDishes}
          icon={LayoutGrid}
          trend={hasMenu ? "Pubblicato" : "Offline"}
          trendType={hasMenu ? "up" : "down"}
          color="emerald"
          description="Piatti disponibili"
        />
      </Link>

    </div>
  );
}