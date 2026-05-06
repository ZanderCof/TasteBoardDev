"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface DishProps {
  name: string;
  price: string;
  description?: string;
  image?: string;
}

export function PublicDishCard({ name, price, description, image }: DishProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-4 p-4 bg-white rounded-[2rem] border border-slate-100 shadow-sm active:scale-[0.98] transition-all"
    >
      <div className="flex-1 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-slate-900 text-base leading-tight">{name}</h3>
          <span className="font-black text-red-600 tracking-tighter shrink-0">€{price}</span>
        </div>
        {description && (
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-medium italic">
            {description}
          </p>
        )}
      </div>

      {image ? (
        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-50">
          <Image src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-2xl bg-yellow-400/5 flex items-center justify-center text-yellow-600/30 shrink-0">
          <Plus size={24} strokeWidth={3} />
        </div>
      )}
    </motion.div>
  );
}
