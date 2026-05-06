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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

// Definiamo i gruppi per una gerarchia chiara
const navigation = [
  {
    group: "Principale",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: CalendarDays, label: "Prenotazioni", href: "/dashboard/bookings" },
      { icon: Utensils, label: "Menù Digitale", href: "/dashboard/menu" },
    ],
  },
  {
    group: "Strumenti",
    items: [
      { icon: Globe , label: "WebLine", href: "/dashboard/webline" },
      { icon: TicketPercent, label: "Promozioni", href: "/dashboard/promotions" },
      { icon: Contact2, label: "Clienti", href: "/dashboard/customers" },
    ],
  },
  {
    group: "Azienda",
    items: [
      { icon: Store, label: "I tuoi Locali", href: "/dashboard/store" },
      { icon: Users, label: "Gestione Staff", href: "/dashboard/staff" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
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
    <aside className="w-full lg:w-72 h-full flex flex-col bg-white border-r border-slate-200">
      {/* HEADER LOGO */}
      <div className="h-24 flex items-center justify-between px-8">
        <Link href={"/dashboard"}>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            Taste<span className="text-red-600">board</span>
            <span className="text-red-600">.</span>
          </span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-500 bg-slate-50 rounded-xl">
          <X size={20} />
        </button>
      </div>

      {/* NAV CON GERARCHIA */}
      <nav className="flex-1 px-4 space-y-8 overflow-y-auto pt-2">
        {navigation.map((section) => (
          <div key={section.group} className="space-y-2">
            <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {section.group}
            </h4>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200",
                      isActive
                        ? "bg-red-700 text-white shadow-lg shadow-slate-200"
                        : "text-slate-500 hover:bg-slate-50 hover:text-red-700",
                    )}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* FOOTER AREA */}
      <div className="p-6 space-y-2 bg-slate-50/50">
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 transition"
        >
          <Settings size={18} />
          Impostazioni
        </Link>
        
        <button 
          onClick={handleLogout} 
          disabled={isLoggingOut} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-red-600 transition disabled:opacity-50"
        >
          <LogOut size={18} />
          {isLoggingOut ? "Uscita..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
