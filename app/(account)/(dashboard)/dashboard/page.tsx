"use client";
import { KpiCardStaff } from '@/components/my_components/dashboard/kpiCardStaff';
import { PopularDishesGrid } from '@/components/my_components/dashboard/popularDishesGrid';
import { SalesChartWidget } from '@/components/my_components/dashboard/salesChartWidget';
import StoreStatusCard from '@/components/my_components/dashboard/storeStatusCard';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-10"> {/* Solo padding bottom per respirare a fine pagina */}
      <header className='ps-5'>
        <h1 className="text-3xl font-black text-slate-900">Overview</h1>
        <p className="text-slate-500">Benvenuto su Tasteboard</p>
      </header>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        <div className="lg:col-span-4 space-y-6">
          <StoreStatusCard isMenuPublic={true} qrStatus="active" lastUpdate="2 min fa" />
          <KpiCardStaff present={8} total={12} />
        </div>

        <div className="lg:col-span-8">
          <SalesChartWidget />
        </div>

        <div className="lg:col-span-12">
          <PopularDishesGrid />
        </div>
      </motion.div>
    </div>
  );
}
