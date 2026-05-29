"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  Store,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
  Globe,
  CalendarDays,
  TicketPercent,
  Contact2,
  Sofa,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

const navigation = [
  {
    group: "Principale",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      {
        icon: CalendarDays,
        label: "Prenotazioni",
        href: "/dashboard/bookings",
      },
      {
        icon: Store,
        label: "I tuoi Locali",
        href: "/dashboard/store",
      },

      { icon: Utensils, label: "Menù Digitale", href: "/dashboard/menu" },
    ],
  },
  {
    group: "Strumenti",
    items: [
      { icon: Globe, label: "WebLine", href: "/dashboard/webline" },
      { icon: Sofa, label: "Gestore Tavoli", href: "/dashboard/tables" },
      {
        icon: TicketPercent,
        label: "Promozioni",
        href: "/dashboard/promotions",
        isComingSoon: true,
      },
      {
        icon: Contact2,
        label: "Clienti",
        href: "/dashboard/customers",
        isComingSoon: true,
      },
    ],
  },
  {
    group: "Azienda",
    items: [
      {
        icon: Users,
        label: "Staff",
        href: "/dashboard/staff",
        isComingSoon: true,
      },
      {
        icon: BarChart3,
        label: "Analytics",
        href: "/dashboard/analytics",
        isComingSoon: true,
      },
    ],
  },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <aside className="w-full lg:w-72 h-full flex flex-col bg-white border-r-2 border-slate-200 relative shadow-2xl">
      {/* HEADER - Logo più scuro */}
      <div className="h-24 flex items-center justify-between px-8 border-b-2 border-slate-100">
        <Link href={"/dashboard"}>
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">
              Taste<span className="text-red-600 font-black">board</span>
            </span>
            <span className="text-[10px] text-slate-900 font-black tracking-widest uppercase">
              Business Suite
            </span>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="lg:hidden p-2 text-slate-900 bg-slate-100 rounded-xl border border-slate-200"
        >
          <X size={20} strokeWidth={3} />
        </button>
      </div>

      {/* NAV - Contrasto Elevato */}
      <nav className="flex-1 px-4 py-8 space-y-10 overflow-y-auto bg-slate-50/20">
        {navigation.map((section) => (
          <div key={section.group}>
            <h4 className="px-4 mb-4 text-[11px] font-black uppercase tracking-[0.25em] text-slate-900/80">
              {section.group}
            </h4>

            <div className="space-y-2">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const isComingSoon = item.isComingSoon;

                return (
                  <div key={item.href}>
                    {isComingSoon ? (
                      <div className="group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold opacity-40 grayscale border border-transparent">
                        <div className="flex items-center gap-3">
                          <item.icon size={20} strokeWidth={2.5} />
                          {item.label}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter bg-slate-200 text-slate-900 px-2 py-0.5 rounded-lg">
                          Soon
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 border-2",
                          isActive
                            ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-300"
                            : "bg-white border-slate-100 text-slate-800 hover:border-red-600 hover:text-red-600",
                        )}
                      >
                        <item.icon
                          size={20}
                          strokeWidth={isActive ? 3 : 2}
                          className={cn(
                            "transition-colors",
                            isActive
                              ? "text-red-500"
                              : "text-slate-900 group-hover:text-red-600",
                          )}
                        />
                        {item.label}
                        {isActive && (
                          <motion.div
                            layoutId="activePill"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-red-500"
                          />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER - Bottoni Pieni */}
      <div className="p-6 border-t-2 border-slate-100 bg-white">
        <div className="space-y-3">
          <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all border border-slate-200"
          >
            <Settings size={20} strokeWidth={2.5} />
            Impostazioni
          </Link>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold text-red-600 bg-red-50 border-2 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all disabled:opacity-50"
          >
            <LogOut size={20} strokeWidth={2.5} />
            {isLoggingOut ? "Uscita..." : "Logout"}
          </button>
        </div>

        <div className="mt-6 text-[10px] font-black text-slate-900 text-center uppercase tracking-widest border-t border-slate-100 pt-4">
          Tasteboard <span className="text-red-600">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
