// app/(account)/(dashboard)/dashboard/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { startOfToday, endOfToday } from "date-fns";
import { format } from "date-fns";


import { PopularDishesGrid } from "@/components/my_components/dashboard/popularDishesGrid";
import { SalesChartWidget } from "@/components/my_components/dashboard/salesChartWidget";
import StoreStatusCard from "@/components/my_components/dashboard/storeStatusCard";
import { DashboardKpiGrid } from "@/components/my_components/dashboard/DashboardKpiGrid";
import { KpiCardStaff } from "@/components/my_components/dashboard/kpiCardStaff";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: session.user.id },
    select: { id: true, name: true },
  });

  if (!restaurant) redirect("/dashboard/restaurants/new");

const today = new Date();
today.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

  const [
    pendingCount,
    todayBookingsCount,
    todayCoversCount,
    tablesCount,
    activeMenu,
  ] = await Promise.all([
    prisma.reservation.count({
      where: { restaurantId: restaurant.id, status: "PENDING" },
    }),
    prisma.reservation.count({
      where: {
        restaurantId: restaurant.id,
        date: { gte: today, lte: todayEnd },
        status: "CONFIRMED",
      },
    }),
    prisma.reservation.aggregate({
      where: {
        restaurantId: restaurant.id,
        date: { gte: today, lte: todayEnd },
        status: "CONFIRMED",
      },
      _sum: { guests: true },
    }),
    prisma.table.count({
      where: { restaurantId: restaurant.id },
    }),
    prisma.menu.findFirst({
      where: { restaurantId: restaurant.id, isPublished: true },
      select: {
        name: true,
        categories: {
          select: { _count: { select: { dishes: true } } },
        },
      },
    }),
  ]);

  const totalDishes = activeMenu
    ? activeMenu.categories.reduce((sum, cat) => sum + cat._count.dishes, 0)
    : 0;

  const totalCoversToday = todayCoversCount._sum.guests ?? 0;



  return (
    <div className="px-6 lg:px-8 py-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Panoramica di{" "}
          <span className="font-semibold text-slate-700">{restaurant.name}</span>{" "}
          oggi
        </p>
      </header>

      {/* KPI — Client Component, riceve solo primitivi */}
      <DashboardKpiGrid
        pendingCount={pendingCount}
        todayBookingsCount={todayBookingsCount}
        totalCoversToday={totalCoversToday}
        tablesCount={tablesCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <StoreStatusCard
            isMenuPublic={!!activeMenu}
            activeMenuName={activeMenu?.name ?? "Nessun menu attivo"}
            totalDishes={totalDishes}
            qrStatus="active"
            lastUpdate="Adesso"
          />
          <KpiCardStaff present={8} total={12} />
        </div>

        <div className="lg:col-span-8">
          <SalesChartWidget />
        </div>

        <div className="lg:col-span-12">
          <PopularDishesGrid />
        </div>
      </div>
    </div>
  );
}