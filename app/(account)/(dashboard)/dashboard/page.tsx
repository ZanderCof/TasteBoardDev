import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

import StoreStatusCard from "@/components/my_components/dashboard/storeStatusCard";
import { DashboardKpiGrid } from "@/components/my_components/dashboard/DashboardKpiGrid";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!restaurant) {
    redirect("/dashboard/restaurants/new");
  }

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
    lastMenuUpdate,
  ] = await Promise.all([
    prisma.reservation.count({
      where: {
        restaurantId: restaurant.id,
        status: "PENDING",
      },
    }),

    prisma.reservation.count({
      where: {
        restaurantId: restaurant.id,
        date: {
          gte: today,
          lte: todayEnd,
        },
        status: "CONFIRMED",
      },
    }),

    prisma.reservation.aggregate({
      where: {
        restaurantId: restaurant.id,
        date: {
          gte: today,
          lte: todayEnd,
        },
        status: "CONFIRMED",
      },
      _sum: {
        guests: true,
      },
    }),

    prisma.table.count({
      where: {
        restaurantId: restaurant.id,
      },
    }),

    prisma.menu.findFirst({
      where: {
        restaurantId: restaurant.id,
        isPublished: true,
      },
      select: {
        id: true,
        name: true,
        updatedAt: true,
        categories: {
          select: {
            _count: {
              select: {
                dishes: true,
              },
            },
          },
        },
      },
    }),

    prisma.menu.findFirst({
      where: {
        restaurantId: restaurant.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        updatedAt: true,
      },
    }),
  ]);

  const totalDishes = activeMenu
    ? activeMenu.categories.reduce(
        (sum, category) => sum + category._count.dishes,
        0,
      )
    : 0;

  const totalCoversToday = todayCoversCount._sum.guests ?? 0;

  const occupancy =
    tablesCount > 0 ? Math.round((todayBookingsCount / tablesCount) * 100) : 0;

  const lastUpdate = lastMenuUpdate
    ? formatDistanceToNow(lastMenuUpdate.updatedAt, {
        addSuffix: true,
        locale: it,
      })
    : "mai";

  const greeting =
    pendingCount > 0
      ? `Hai ${pendingCount} prenotazioni da confermare`
      : todayBookingsCount > 0
        ? `Oggi sono previsti ${totalCoversToday} coperti`
        : "Nessuna prenotazione prevista per oggi";

  const menus = await prisma.menu.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="px-6 lg:px-8 py-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-2 text-slate-500">{greeting}</p>

        <p className="text-sm text-slate-400 mt-1">{restaurant.name}</p>
      </header>

      <DashboardKpiGrid
        pendingCount={pendingCount}
        todayBookingsCount={todayBookingsCount}
        totalCoversToday={totalCoversToday}
        tablesCount={tablesCount}
        occupancy={occupancy}
        totalDishes={totalDishes}
        hasMenu={!!activeMenu}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <StoreStatusCard
            isMenuPublic={!!activeMenu}
            menus={menus}
            totalDishes={totalDishes}
            qrStatus="active"
            lastUpdate={lastUpdate}
          />
        </div>
      </div>
    </div>
  );
}
