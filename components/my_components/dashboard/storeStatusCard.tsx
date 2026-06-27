"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  QrCode,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusProps {
  isMenuPublic: boolean;
  menus: {
    id: string;
    name: string;
  }[];
  totalDishes: number;
  qrStatus: "active" | "to_print";
  lastUpdate: string;
}

export default function StoreStatusCard({
  isMenuPublic = true,
  menus = [],
  totalDishes = 0,
  qrStatus = "active",
  lastUpdate = "10 min fa",
}: StatusProps) {
  const lastTwoMenus = menus.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/60 shadow-sm group"
    >
      {/* Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-slate-900 font-bold text-lg">
              Stato Menu
            </h3>
          </div>
        </div>

        {/* MENU LIST */}
        <div className="space-y-3">

          {lastTwoMenus.length === 0 && (
            <p className="text-sm text-slate-400">
              Nessun menu creato
            </p>
          )}

          {lastTwoMenus.map((menu) => (
            <Link
              key={menu.id}
              href={`/dashboard/menu/${menu.id}/edit`}
              className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-red-200 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-50 text-red-600">
                    <LayoutGrid size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {menu.name}
                    </p>
                    <p className="text-[12px] text-slate-500">
                      Modifica menu
                    </p>
                  </div>
                </div>

                <ChevronRight
                  size={14}
                  className="text-slate-300 group-hover:text-red-600"
                />
              </motion.div>
            </Link>
          ))}

          {/* QR STATUS */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "p-3 rounded-xl",
                  qrStatus === "active"
                    ? "bg-slate-900 text-white"
                    : "bg-amber-50 text-amber-600"
                )}
              >
                <QrCode size={20} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  QR Tavoli
                </p>
                <p className="text-[12px] text-slate-500">
                  {qrStatus === "active"
                    ? "Configurazione attiva"
                    : "Da rigenerare"}
                </p>
              </div>
            </div>

            <span className="text-[10px] px-2 py-1 rounded-md border bg-slate-50">
              {qrStatus === "active" ? "Pronto" : "Stampa"}
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <RefreshCcw size={12} className="text-slate-400" />
            <p className="text-[10px] text-slate-400 uppercase font-bold">
              Aggiornato <span className="text-slate-600">{lastUpdate}</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}