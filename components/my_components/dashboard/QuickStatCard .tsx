"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  description?: string;
  color?: "red" | "blue" | "green" | "orange" | "purple";
}

const colorStyles = {
  red: "bg-red-50 text-red-600 shadow-red-100",
  blue: "bg-blue-50 text-blue-600 shadow-blue-100",
  green: "bg-green-50 text-green-600 shadow-green-100",
  orange: "bg-orange-50 text-orange-600 shadow-orange-100",
  purple: "bg-purple-50 text-purple-600 shadow-purple-100",
};

export const QuickStatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  description,
  color = "red",
}: QuickStatProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden bg-white rounded-[2.5rem] p-6 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group transition-all hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]"
    >
      {/* Glow di sfondo al passaggio del mouse */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-50 rounded-full blur-3xl group-hover:bg-red-50 transition-colors duration-500" />

      <div className="relative flex flex-col gap-4">
        {/* Icona e Trend */}
        <div className="flex items-center justify-between">
          <div className={cn("p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-sm", colorStyles[color])}>
            <Icon size={24} strokeWidth={2.5} />
          </div>

          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-inner",
              trendType === "up" ? "bg-green-50 text-green-600" : 
              trendType === "down" ? "bg-red-50 text-red-600" : 
              "bg-slate-50 text-slate-400"
            )}>
              {trendType === "up" ? <TrendingUp size={12} /> : trendType === "down" ? <TrendingDown size={12} /> : null}
              {trend}
            </div>
          )}
        </div>

        {/* Valori */}
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
            {label}
          </p>
          <h4 className="text-3xl font-black text-slate-900 tracking-tighter leading-none group-hover:text-red-600 transition-colors">
            {value}
          </h4>
          {description && (
            <p className="text-[11px] text-slate-400 font-medium mt-1 ml-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
