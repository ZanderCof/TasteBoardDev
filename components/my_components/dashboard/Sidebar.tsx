"use client";

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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Store, label: "Locali", href: "/dashboard/store" },
  { icon: Utensils, label: "Menu", href: "/dashboard/menu" },
  { icon: Users, label: "Staff", href: "/dashboard/staff" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 h-full flex flex-col bg-white/80 backdrop-blur-xl lg:bg-white border-r border-slate-200 shadow-2xl lg:shadow-none">
      {/* HEADER LOGO + CLOSE BUTTON (Mobile only) */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
        <Link href={"/dashboard"}>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            Taste<span className="text-brand-red">board</span>
            <span className="text-yellow-400">.</span>
          </span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-2 text-slate-500">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all",
                isActive
                  ? "bg-brand-red text-red-600 shadow-lg shadow-red-100 scale-[1.02]"
                  : "text-slate-500 hover:bg-slate-50",
              )}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER AREA */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <Link
          href="/dashboard/settings"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition"
        >
          <Settings size={20} />
          Impostazioni
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-brand-red hover:bg-red-50 transition">
          <LogOut size={20} />
          Disconnetti
        </button>
      </div>
    </aside>
  );
}
