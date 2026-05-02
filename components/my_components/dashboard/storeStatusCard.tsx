"use client";

import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, QrCode, RefreshCcw, Circle } from "lucide-react";
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
    <div className="relative overflow-hidden bg-white border border-red-100 rounded-[2rem] p-6 shadow-sm">

      {/* Accent glow leggero */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-5">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 font-extrabold text-lg tracking-tight">
            Stato Locale
          </h3>

          <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Circle
                className={cn(
                  "w-2.5 h-2.5 fill-current",
                  isMenuPublic ? "text-red-500" : "text-yellow-500"
                )}
              />
            </motion.div>

            <span className="text-[10px] font-bold uppercase text-slate-600">
              {isMenuPublic ? "Operativo" : "Sospeso"}
            </span>
          </div>
        </div>

        {/* STATUS */}
        <div className="space-y-3">

          {/* MENU */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-red-100 hover:bg-red-50/30 transition">
            
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-xl",
                  isMenuPublic
                    ? "bg-red-500 text-white"
                    : "bg-yellow-100 text-yellow-600"
                )}
              >
                <LayoutGrid size={18} />
              </div>

              <span className="text-sm font-semibold text-slate-800">
                Menu Online
              </span>
            </div>

            <span
              className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg",
                isMenuPublic
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              )}
            >
              {isMenuPublic ? "Attivo" : "Disattivato"}
            </span>
          </div>

          {/* QR */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-yellow-100 hover:bg-yellow-50/30 transition">
            
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2.5 rounded-xl",
                  qrStatus === "active"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 text-slate-900"
                )}
              >
                <QrCode size={18} />
              </div>

              <span className="text-sm font-semibold text-slate-800">
                QR Tavoli
              </span>
            </div>

            <span
              className={cn(
                "text-xs font-bold px-2 py-1 rounded-lg",
                qrStatus === "active"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              )}
            >
              {qrStatus === "active" ? "Pronto" : "Da stampare"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-2 pt-3 border-t border-red-100">
          <RefreshCcw size={12} className="text-red-300" />
          <span className="text-[11px] text-slate-500 font-medium">
            Ultimo aggiornamento:{" "}
            <span className="text-slate-800 font-semibold">
              {lastUpdate}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}