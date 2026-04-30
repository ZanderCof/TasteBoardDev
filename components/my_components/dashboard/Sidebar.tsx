"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Utensils,
  QrCode,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Utensils, label: "Menu", href: "/dashboard/menu" },
  { icon: QrCode, label: "QR Code", href: "/dashboard/qr" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white border-r border-slate-200">
      
      {/* LOGO */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100">
        <span className="text-xl font-black text-slate-900">
          Taste<span className="text-red-600">Board</span>
        </span>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-red-50 text-red-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* USER / ACCOUNT */}
      <div className="px-4 pb-4 border-t border-slate-100">
        
        {/* USER INFO */}
        <div className="mt-4 mb-3 p-3 rounded-lg bg-slate-50">
          <p className="text-sm font-semibold text-slate-900">
            Pizzeria Roma
          </p>
          <p className="text-xs text-slate-500">
            Piano Pro
          </p>
        </div>

        {/* SETTINGS */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
        >
          <Settings size={18} />
          Impostazioni
        </Link>

        {/* LOGOUT */}
        <button
          className="w-full mt-1 flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut size={18} />
          Disconnetti
        </button>
      </div>
    </aside>
  );
}