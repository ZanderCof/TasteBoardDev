"use client";
import { motion } from 'framer-motion';
import { Users, ArrowUpRight } from 'lucide-react';

interface KpiStaffProps {
  present: number;
  total: number;
}

export const KpiCardStaff = ({ present, total }: KpiStaffProps) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-slate-900 text-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden group "
  >
    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
      <Users size={80} />
    </div>
    <p className="text-slate-400 font-medium tracking-wide">Staff in servizio</p>
    <div className="flex items-end gap-2 mt-2">
      <span className="text-5xl font-black text-yellow-400">{present}</span>
      <span className="text-slate-400 mb-1 font-bold">/ {total}</span>
    </div>
    <button className="mt-6 flex items-center gap-2 text-sm font-bold text-white group-hover:text-yellow-400 transition-colors">
      Gestisci Turni <ArrowUpRight size={16} />
    </button>
  </motion.div>
);
