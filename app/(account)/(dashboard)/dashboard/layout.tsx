// app/(account)/(dashboard)/dashboard/layout.tsx
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Sidebar from "@/components/my_components/dashboard/Sidebar";
import MobileNav from "@/components/my_components/dashboard/MobileNav";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // 1. Controllo Autenticazione
  if (!session?.user) {
    redirect("/login");
  }

  // 2. Controllo Reale sul DB: L'utente ha un locale?
  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: session.user.id },
    select: { id: true }
  });

  // 3. Se non ha locali, redirect forzato all'onboarding
  if (!restaurant) {
    redirect("/onboarding");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-jakarta">
      
      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Navigazione Mobile (Client Component separato) */}
        <MobileNav />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
