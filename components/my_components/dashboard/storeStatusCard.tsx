"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, QrCode, RefreshCcw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusProps {
  isMenuPublic: boolean;
  qrStatus: "active" | "to_print";
  lastUpdate: string;
}

export default function StoreStatusCard({
  isMenuPublic = true,
  qrStatus = "active",
  lastUpdate = "10 min fa",
}: StatusProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 font-jakarta"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-red-500/10 to-transparent blur-3xl -mr-20 -mt-20 pointer-events-none" />

      <div className="relative flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-slate-900 font-black text-xl tracking-tight leading-none">
              Stato Locale
            </h3>
          </div>

          {/* <div className={cn(
            "flex items-center gap-2.5 px-4 py-2 rounded-2xl border transition-all duration-500",
            isMenuPublic 
              ? "bg-red-50 border-red-100 text-red-600 shadow-sm shadow-red-100" 
              : "bg-amber-50 border-amber-100 text-amber-600"
          )}>
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={cn("absolute w-3 h-3 rounded-full fill-current", isMenuPublic ? "bg-red-400" : "bg-amber-400")}
              />
              <Circle className={cn("w-2 h-2 fill-current")} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter">
              {isMenuPublic ? "Operativo" : "Sospeso"}
            </span>
          </div> */}
        </div>

        {/* INDICATORS GRID */}
        <div className="grid grid-cols-1 gap-4">
          
          {/* MENU STATUS */}
          <motion.div 
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-5 rounded-[1.8rem] bg-slate-50/50 border border-slate-100 group cursor-pointer transition-all hover:bg-white hover:shadow-md hover:border-transparent"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-2xl shadow-sm transition-colors",
                isMenuPublic ? "bg-red-600 text-white" : "bg-slate-200 text-slate-500"
              )}>
                <LayoutGrid size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none mb-1">Menu Digitale</p>
                <p className="text-[11px] text-slate-400 font-medium tracking-tight">Visibilità clienti</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter",
                isMenuPublic ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-500"
              )}>
                {isMenuPublic ? "Online" : "Offline"}
              </span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
          </motion.div>

          {/* QR CODE STATUS */}
          <motion.div 
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-5 rounded-[1.8rem] bg-slate-50/50 border border-slate-100 group cursor-pointer transition-all hover:bg-white hover:shadow-md hover:border-transparent"
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "p-3 rounded-2xl shadow-sm",
                qrStatus === "active" ? "bg-slate-900 text-white" : "bg-amber-500 text-white"
              )}>
                <QrCode size={20} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none mb-1">QR Tavoli</p>
                <p className="text-[11px] text-slate-400 font-medium tracking-tight">Accesso rapido</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-tighter",
                qrStatus === "active" ? "bg-slate-900 text-white" : "bg-amber-100 text-amber-700"
              )}>
                {qrStatus === "active" ? "Pronto" : "Stampa"}
              </span>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
            </div>
          </motion.div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <RefreshCcw size={12} className="text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
              Update <span className="text-slate-900 ml-1">{lastUpdate}</span>
            </p>
          </div>
          
          <button className="text-[11px] font-black text-red-600 hover:text-red-700 uppercase tracking-widest transition-colors">
            Dettagli
          </button>
        </div>
      </div>
    </motion.div>
  );
}
