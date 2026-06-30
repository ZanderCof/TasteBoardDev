// app/(account)/(dashboard)/dashboard/layout.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Sidebar from "@/components/my_components/dashboard/Sidebar";
import MobileNav from "@/components/my_components/dashboard/MobileNav";
import Topbar from "@/components/my_components/dashboard/Topbar";
import type { NotificationItem } from "@/components/my_components/dashboard/NotificationsCenter";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // 1. Controllo Autenticazione
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 2. Recupero ristoranti e notifiche in parallelo
  const [userRestaurants, rawNotifications] = await Promise.all([
    prisma.restaurant.findMany({
      where: { userId: session.user.id },
      select: { id: true, name: true, type: true },
    }),
    prisma.notification.findMany({
      where: {
        active: true,
        OR: [
          { targetServiceSlug: null },
          { targetServiceSlug: "tasteboard" },
        ],
      },
      include: {
        reads: {
          where: { userId: session.user.id },
          select: { id: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // 3. Se non ha locali, redirect forzato all'onboarding
  if (userRestaurants.length === 0) {
    redirect("/onboarding");
  }

  // Serializza le notifiche per il client (Date → string)
  const notifications: NotificationItem[] = rawNotifications.map((n) => ({
    id: n.id,
    title: n.title,
    message: n.message,
    type: n.type,
    createdAt: n.createdAt.toISOString(),
    isRead: n.reads.length > 0,
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-jakarta" style={{ paddingTop: "var(--beta-h, 0px)" }}>

      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Navigazione Mobile */}
        <MobileNav />

        {/* TOPBAR con dati reali passati allo switcher */}
        <div className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-10">
          <Topbar initialStores={userRestaurants} notifications={notifications} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
