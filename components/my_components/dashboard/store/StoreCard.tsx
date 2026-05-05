// components/my_components/dashboard/store/StoreCard.tsx
"use client";
import { MapPin, Settings2, } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Restaurant } from "@prisma/client";
import Image from "next/image";

export const StoreCard = ({ store }: { store: Restaurant }) => {
  // FIX: URL corretto con / e ${}
  const placeholderImage = `https://picsum.photos/seed/${store.id}/600/400`;
  
  const finalImageSrc = store.logo && store.logo.startsWith("http") 
    ? store.logo 
    : placeholderImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2.8rem] border border-slate-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
    >
      {/* Resto del codice identico... */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div>
        <div className="w-full h-44 bg-slate-100 rounded-[2.2rem] mb-6 overflow-hidden relative border border-white shadow-inner">
          <Image
            src={finalImageSrc}
            alt={store.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[9px] font-black text-slate-900 shadow-sm flex items-center gap-1.5 border border-white/20 uppercase tracking-tighter">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Attivo
            </div>
          </div>
        </div>

        <div className="px-2 space-y-4">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
            {store.name}
          </h3>
          <div className="flex items-center gap-3">
             <MapPin size={14} className="text-red-500"/>
             <p className="text-slate-500 text-sm font-bold truncate">{store.address || "Indirizzo non configurato"}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-50">
        <Link
          href={`/dashboard/store/${store.id}`}
          className="w-full bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-600 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
        >
          <Settings2 size={16} />
          Modifica locale
        </Link>
      </div>
    </motion.div>
  );
};
