"use client";

import { Plus, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface CreateMenuCardProps {
  restaurantId: string;
}

export default function CreateMenuCard({ restaurantId }: CreateMenuCardProps) {
  const router = useRouter();

  const handleCreate = () => {
    // Navighiamo alla pagina di creazione passando il restaurantId come query param
    router.push(`/dashboard/menu/create?restaurantId=${restaurantId}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCreate}
      className="group relative flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50 backdrop-blur-sm hover:border-red-500 hover:bg-white transition-all cursor-pointer h-full min-h-60 shadow-sm hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)] overflow-hidden"
    >
      {/* Background Decorativo Soffuso al Hover */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
      
      {/* Icon Container */}
      <div className="relative">
        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-90 transition-all duration-500 shadow-inner">
          <Plus size={28} strokeWidth={2.5} />
        </div>
        
        {/* Badge "Pro" o Icona Decorativa */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
          <div className="bg-yellow-400 text-slate-900 p-1.5 rounded-full shadow-lg">
            <Sparkles size={12} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-6 text-center">
        <p className="font-black text-slate-900 uppercase text-[12px] tracking-[0.2em] group-hover:text-red-600 transition-colors">
          Nuovo Menu
        </p>
        <p className="text-slate-400 text-[10px] font-medium mt-1 group-hover:text-slate-500">
          Crea un&apos;esperienza unica
        </p>
      </div>

      {/* Overlay Luce al passaggio del mouse */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
