"use client";
import { motion } from "framer-motion";
import {
  FileText, MoreVertical, Power, PowerOff,
  Utensils, Edit3, Trash2, ExternalLink, QrCode,
  ToggleLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toggleMenuStatus } from "@/app/(account)/(dashboard)/dashboard/menu/action";
import { deleteMenu } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuCardProps {
  id: string;
  title: string;
  dishesCount: number;
  categoriesCount: number;
  isActive: boolean;
  lastUpdate: string;
}

export default function MenuListCard({
  id, title, dishesCount, categoriesCount, isActive, lastUpdate,
}: MenuCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleMenuStatus(id, isActive);
    });
  };

  const handleDelete = () => {
    if (!confirm(`Sei sicuro di voler eliminare definitivamente il menu "${title}"?`)) return;
    startTransition(async () => {
      await deleteMenu(id);
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "bg-white rounded-[2.5rem] p-7 border transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col",
        isActive ? "border-emerald-100" : "border-slate-100 bg-slate-50/30"
      )}
    >
      {/* ── Top row: status badge + dropdown ── */}
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border",
          isActive
            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
            : "bg-slate-100 border-slate-200 text-slate-400"
        )}>
          <span className={cn(
            "w-1.5 h-1.5 rounded-full",
            isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
          )} />
          {isActive ? "Pubblicato" : "Bozza"}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all outline-none">
              <MoreVertical size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-[1.5rem] border-slate-100 shadow-2xl">
            <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-3 py-2">
              Opzioni Menu
            </DropdownMenuLabel>

            <Link href={`/dashboard/menu/${id}/edit`}>
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-slate-50">
                <Edit3 size={16} className="text-slate-400" />
                <span className="font-bold text-sm">Modifica contenuti</span>
              </DropdownMenuItem>
            </Link>

            {/* ← NUOVO: link alla pagina disponibilità nel dropdown */}
            <Link href={`/dashboard/menu/${id}/availability`}>
              <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-slate-50">
                <ToggleLeft size={16} className="text-slate-400" />
                <span className="font-bold text-sm">Disponibilità piatti</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="flex items-center gap-3 p-3 rounded-xl cursor-pointer focus:bg-slate-50">
              <QrCode size={16} className="text-slate-400" />
              <span className="font-bold text-sm">Visualizza QR Code</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-slate-100 my-1" />

            <DropdownMenuItem
              onClick={handleToggle}
              disabled={isPending}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer",
                isActive
                  ? "text-amber-600 focus:bg-amber-50"
                  : "text-emerald-600 focus:bg-emerald-50"
              )}
            >
              {isActive ? <PowerOff size={16} /> : <Power size={16} />}
              <span className="font-bold text-sm">
                {isActive ? "Metti in pausa" : "Attiva ora"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-600 focus:bg-red-50"
            >
              <Trash2 size={16} />
              <span className="font-bold text-sm">Elimina</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Titolo ── */}
      <Link href={`/dashboard/menu/${id}`}>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 hover:text-red-600 transition-colors tracking-tight">
          {title}
        </h3>
      </Link>

      {/* ── Stats ── */}
      <div className="flex gap-5 mb-8">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            <FileText size={14} />
          </div>
          {categoriesCount} <span className="font-medium text-slate-400">Sezioni</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500">
            <Utensils size={14} />
          </div>
          {dishesCount} <span className="font-medium text-slate-400">Piatti</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Ultima modifica</span>
          <span className="text-[11px] text-slate-500 font-bold">{lastUpdate}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* ← NUOVO: pulsante disponibilità diretto, accento verde */}
          <Link href={`/dashboard/menu/${id}/availability`}>
            <button
              title="Gestisci disponibilità piatti"
              className="flex items-center gap-1.5 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 text-slate-400 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95"
            >
              <ToggleLeft size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Disponibilità</span>
            </button>
          </Link>

          <Link href={`/dashboard/menu/${id}`}>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-200">
              Gestisci
              <ExternalLink size={14} strokeWidth={2.5} />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}