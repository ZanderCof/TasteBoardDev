"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, QrCode, RefreshCcw, Circle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface StatusProps {
  isMenuPublic: boolean;
  qrStatus: 'active' | 'to_print';
  lastUpdate: string;
}

export default function StoreStatusCard({ 
  isMenuPublic = true, 
  qrStatus = 'active', 
  lastUpdate = "10 min fa" 
}: StatusProps) {
  
  return (
    <div className="relative overflow-hidden bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-6 shadow-xl font-jakarta">
      {/* Accent Glow - Brand Red */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-red/10 blur-[50px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-5">
        {/* Header con Badge di Stato */}
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">Stato Locale</h3>
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-white/40 shadow-sm">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Circle className={cn("w-2.5 h-2.5 fill-current", isMenuPublic ? "text-green-500" : "text-brand-red")} />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">
              {isMenuPublic ? "Operativo" : "Sospeso"}
            </span>
          </div>
        </div>

        {/* Status Indicators Grid */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* Row Menu */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/20 hover:bg-white/60 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl shadow-sm",
                isMenuPublic ? "bg-green-100 text-green-600" : "bg-red-100 text-brand-red"
              )}>
                <LayoutGrid size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700 font-jakarta">Menu Online</span>
            </div>
            <span className={cn("text-xs font-black", isMenuPublic ? "text-green-600" : "text-brand-red")}>
              {isMenuPublic ? "ON" : "OFF"}
            </span>
          </div>

          {/* Row QR Code */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/20 hover:bg-white/60 transition-colors">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl shadow-sm",
                qrStatus === 'active' ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"
              )}>
                <QrCode size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700">QR Tavoli</span>
            </div>
            <span className={cn("text-xs font-black", qrStatus === 'active' ? "text-blue-600" : "text-yellow-600")}>
              {qrStatus === 'active' ? "OK" : "PRINT"}
            </span>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-200/40">
          <RefreshCcw size={12} className="text-slate-400 animate-spin-slow" />
          <span className="text-[11px] text-slate-400 font-medium tracking-wide">
            Update: <span className="text-slate-600 font-bold uppercase">{lastUpdate}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
