"use client";

import { KpiCardStaff } from "@/components/my_components/dashboard/kpiCardStaff";
import { PopularDishesGrid } from "@/components/my_components/dashboard/popularDishesGrid";
import { SalesChartWidget } from "@/components/my_components/dashboard/salesChartWidget";
import StoreStatusCard from "@/components/my_components/dashboard/storeStatusCard";
import Topbar from "@/components/my_components/dashboard/Topbar";
import { motion } from "framer-motion";

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
        <p className="text-sm text-slate-500">
          Panoramica del tuo locale oggi
        </p>
      </header>

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