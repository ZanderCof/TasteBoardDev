"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, QrCode, RefreshCcw, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusProps {
  isMenuPublic: boolean;
  activeMenuName: string; // Nuovo: nome del menu attivo
  totalDishes: number;    // Nuovo: conteggio piatti
  qrStatus: "active" | "to_print";
  lastUpdate: string;
}

export default function StoreStatusCard({
  isMenuPublic = true,
  activeMenuName = "Menu Principale",
  totalDishes = 0,
  qrStatus = "active",
  lastUpdate = "10 min fa",
}: StatusProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/60 shadow-sm group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/40"
    >
      {/* Glow d'accento */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col gap-6">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-slate-900 font-bold text-lg tracking-tight">
              Stato Operativo
            </h3>
          </div>

        </div>

        {/* INDICATORS LIST */}
        <div className="space-y-3">
          
          {/* MENU STATUS */}
          <motion.div 
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm group/item cursor-pointer transition-all hover:border-indigo-200"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl transition-all duration-300",
                isMenuPublic ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"
              )}>
                <LayoutGrid size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {isMenuPublic ? activeMenuName : "Menu Offline"}
                </p>
                <p className="text-[12px] text-slate-500 font-medium">
                  {isMenuPublic ? `${totalDishes} piatti visibili` : "Nessun menu pubblico"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isMenuPublic ? "bg-emerald-500" : "bg-rose-500"
              )} />
              <ChevronRight size={14} className="text-slate-300 group-hover/item:text-indigo-600 transition-colors" />
            </div>
          </motion.div>

          {/* QR CODE STATUS */}
          <motion.div 
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm group/item cursor-pointer transition-all hover:border-indigo-200"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-xl transition-all duration-300",
                qrStatus === "active" ? "bg-slate-900 text-white" : "bg-amber-50 text-amber-600"
              )}>
                <QrCode size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">QR Tavoli</p>
                <p className="text-[12px] text-slate-500 font-medium">
                  {qrStatus === "active" ? "Configurazione attiva" : "Da rigenerare"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter border",
                qrStatus === "active" ? "bg-slate-50 text-slate-700 border-slate-200" : "bg-amber-50 text-amber-700 border-amber-100"
              )}>
                {qrStatus === "active" ? "Pronto" : "Stampa"}
              </span>
              <ChevronRight size={14} className="text-slate-300 group-hover/item:text-indigo-600 transition-colors" />
            </div>
          </motion.div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <RefreshCcw size={12} className="text-slate-400 animate-spin-slow" />
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Aggiornato <span className="text-slate-600 ml-1">{lastUpdate}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
