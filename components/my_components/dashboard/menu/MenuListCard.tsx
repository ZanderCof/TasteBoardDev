"use client";
import { motion } from "framer-motion";
import { FileText, MoreVertical, Eye, Power, PowerOff } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toggleMenuStatus } from "@/app/(account)/(dashboard)/dashboard/menu/action";
import { useTransition } from "react";

interface MenuCardProps {
  id: string;
  title: string;
  dishesCount: number;
  categoriesCount: number;
  isActive: boolean;
  lastUpdate: string;
}

export default function MenuListCard({ id, title, dishesCount, categoriesCount, isActive, lastUpdate }: MenuCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleMenuStatus(id, isActive);
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white/50 backdrop-blur-xl border rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all",
        isActive ? "border-green-100" : "border-white/40"
      )}
    >
      <div className="flex justify-between items-start mb-6">
        {/* Badge dinamico */}
        <div className={cn(
            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2",
            isActive ? "bg-green-100 text-green-600" : "bg-red-50 text-red-400"
          )}
        >
          <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-green-500 animate-pulse" : "bg-red-400")} />
          {isActive ? "Online" : "Offline"}
        </div>
        <button className="text-slate-400 hover:text-slate-900"><MoreVertical size={20} /></button>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>

      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium"><FileText size={16} /> {categoriesCount} Categorie</div>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium"><Eye size={16} /> {dishesCount} Piatti</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="text-[11px] text-slate-400 font-bold uppercase italic">Aggiornato: {lastUpdate}</span>
        
        <div className="flex items-center gap-3">
          {/* Bottone Attiva/Disattiva dinamico */}
          <button 
            onClick={handleToggle}
            disabled={isPending}
            className={cn(
              "p-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-black uppercase tracking-tighter",
              isActive 
                ? "border-red-100 text-red-500 hover:bg-red-50" 
                : "border-green-100 text-green-600 hover:bg-green-50",
              isPending && "opacity-50 cursor-not-allowed"
            )}
          >
            {isActive ? <PowerOff size={16} /> : <Power size={16} />}
            {isActive ? "Spegni" : "Attiva"}
          </button>

          <Link href={`/dashboard/menu/${id}/edit`}>
            <button className="bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm">
              Modifica
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
