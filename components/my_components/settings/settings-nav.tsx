"use client";
import { cn } from "@/lib/utils";
import { Store, Palette, Bell, ShieldCheck, CreditCard } from "lucide-react";

interface SettingsNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const navItems = [
  { id: "profile", label: "Profilo Locale", icon: Store },
  { id: "appearance", label: "Personalizzazione Menu", icon: Palette },
  { id: "notifications", label: "Notifiche", icon: Bell },
  { id: "security", label: "Sicurezza", icon: ShieldCheck },
  { id: "billing", label: "Abbonamento", icon: CreditCard },
];

export function SettingsNav({ activeSection, setActiveSection }: SettingsNavProps) {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={cn(
            "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all",
            activeSection === item.id
              ? "bg-red-600 text-white shadow-lg shadow-red-100"
              : "text-slate-500 hover:bg-white hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-100"
          )}
        >
          <item.icon size={20} />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
