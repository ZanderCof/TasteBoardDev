"use client";

import { KpiCardStaff } from "@/components/my_components/dashboard/kpiCardStaff";
import { PopularDishesGrid } from "@/components/my_components/dashboard/popularDishesGrid";
import { QuickStatCard } from "@/components/my_components/dashboard/QuickStatCard ";
import { SalesChartWidget } from "@/components/my_components/dashboard/salesChartWidget";
import StoreStatusCard from "@/components/my_components/dashboard/storeStatusCard";
import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="px-6 lg:px-8 py-6 space-y-8">
      {/* HEADER */}
      <header className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">Panoramica del tuo locale oggi</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4 rounded-[3rem] border border-slate-100 bg-slate-400/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02),0_10px_40px_-15px_rgba(0,0,0,0.1)]">
        {/* AZIONE IMMEDIATA: Prenotazioni che il ristoratore deve confermare */}
        <QuickStatCard
          label="Da Approvare"
          value="5"
          icon={Clock}
          trend="Priorità"
          trendType="down" // Down inteso come "mancanza/negativo" se sono troppe
          color="amber"
          description="Richiedono conferma"
        />

        {/* CARICO DI LAVORO: Quante persone arrivano oggi */}
        {/* <QuickStatCard
            label="Coperti Oggi"
            value="32"
            icon={Users}
            trend="+12%"
            trendType="up"
            color="blue"
            description="Totale ospiti previsti"
          /> */}

        {/* REPUTAZIONE: Il dato che volevi mantenere */}
        <QuickStatCard
          label="Rating Medio"
          value="4.8"
          icon={Star}
          trend="Ottimo"
          trendType="neutral"
          color="emerald"
          description="Feedback dei clienti"
        />

        {/* STATO OPERATIVO: Controllo se il locale è "online"
          <QuickStatCard
            label="Menu Online"
            value="Attivo"
            icon={ShoppingBag}
            trend="Visibile"
            trendType="neutral"
            color="green"
            description="Il tuo menù è pubblico"
          /> */}
      </div>
      {/* GRID */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <StoreStatusCard
            isMenuPublic={true}
            qrStatus="active"
            lastUpdate="2 min fa" 
            activeMenuName={"Menu estivo"} 
            totalDishes={6}          />

          <KpiCardStaff present={8} total={12} />
        </div>

        {/* MAIN CHART */}
        <div className="lg:col-span-8">
          <SalesChartWidget />
        </div>

        {/* BOTTOM */}
        <div className="lg:col-span-12">
          <PopularDishesGrid />
        </div>
      </motion.div>
    </div>
  );
}
