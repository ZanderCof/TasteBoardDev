"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  description?: string;
  color?: "red" | "emerald" | "amber" | "slate";
}

const colorStyles = {
  red: "bg-red-50 text-red-600 border-red-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};


export const QuickStatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType = "neutral",
  description,
  color = "slate",
}: QuickStatProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 border border-slate-200/60 shadow-sm group transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:bg-white"
    >
      {/* Background Accent Gradient */}
      <div
        className={cn(
          "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full",
          colorStyles[color].split(" ")[0],
        )}
      />

      <div className="relative flex flex-col h-full justify-between gap-6">
        <div className="flex items-start justify-between">
          {/* Icon Container */}
          <div
            className={cn(
              "p-3.5 rounded-2xl border transition-all duration-300 group-hover:scale-105 shadow-sm",
              colorStyles[color],
            )}
          >
            <Icon size={22} strokeWidth={2} />
          </div>

          {/* Trend Badge */}
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-tight shadow-sm border",
                trendType === "up"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : trendType === "down"
                    ? "bg-rose-50 text-rose-700 border-rose-100"
                    : "bg-slate-50 text-slate-500 border-slate-100",
              )}
            >
              {trendType === "up" && <TrendingUp size={13} />}
              {trendType === "down" && <TrendingDown size={13} />}
              {trendType === "neutral" && <Minus size={13} />}
              {trend}
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-bold text-slate-900 tracking-tight transition-colors duration-300 group-hover:text-slate-950">
              {value}
            </h4>
          </div>
          {description && (
            <p className="text-[12px] text-slate-400 font-medium mt-1.5 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-200" />
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
