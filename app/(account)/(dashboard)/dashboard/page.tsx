"use client";

import { KpiCardStaff } from "@/components/my_components/dashboard/kpiCardStaff";
import { PopularDishesGrid } from "@/components/my_components/dashboard/popularDishesGrid";
import { QuickStatCard } from "@/components/my_components/dashboard/QuickStatCard ";
import { SalesChartWidget } from "@/components/my_components/dashboard/salesChartWidget";
import StoreStatusCard from "@/components/my_components/dashboard/storeStatusCard";
import Topbar from "@/components/my_components/dashboard/Topbar";
import { motion } from "framer-motion";
import { Euro, ShoppingBag, Users, Star } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="px-6 lg:px-8 py-6 space-y-8">
      {/* TOPBAR */}
      <Topbar />
      {/* HEADER */}
      <header className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">Panoramica del tuo locale oggi</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStatCard
          label="Incasso Odierno"
          value="€1.240,50"
          icon={Euro}
          trend="+14.2%"
          trendType="up"
          color="green"
          description="Rispetto a ieri"
        />
        <QuickStatCard
          label="Ordini Totali"
          value="48"
          icon={ShoppingBag}
          trend="+5.1%"
          trendType="up"
          color="blue"
          description="8 ordini in attesa"
        />
        <QuickStatCard
          label="Nuovi Clienti"
          value="12"
          icon={Users}
          trend="-2.4%"
          trendType="down"
          color="purple"
          description="Iscritti oggi"
        />
        <QuickStatCard
          label="Rating Medio"
          value="4.8"
          icon={Star}
          trend="Ottimo"
          trendType="neutral"
          color="orange"
          description="Basato su 24 recensioni"
        />
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
          />

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
