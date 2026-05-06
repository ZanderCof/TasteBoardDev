// app/(account)/(dashboard)/dashboard/layout.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Sidebar from "@/components/my_components/dashboard/Sidebar";
import MobileNav from "@/components/my_components/dashboard/MobileNav";
import Topbar from "@/components/my_components/dashboard/Topbar"; // Importa la Topbar

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // 1. Controllo Autenticazione
  if (!session?.user?.id) {
    redirect("/login");
  }

  // 2. Recupero ristoranti (per il controllo onboarding e per lo switcher)
  const userRestaurants = await prisma.restaurant.findMany({
    where: { userId: session.user.id },
    select: { id: true, name: true, type: true }
  });

  // 3. Se non ha locali, redirect forzato all'onboarding
  if (userRestaurants.length === 0) {
    redirect("/onboarding");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-jakarta">
      
      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Navigazione Mobile */}
        <MobileNav />

        {/* TOPBAR con dati reali passati allo switcher */}
        <div className="px-6 pt-6 lg:px-10">
          <Topbar initialStores={userRestaurants} />
        </div>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
