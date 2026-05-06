"use client";
import { MapPin, Settings2, Utensils, Pizza, Coffee, Beer, Store } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Restaurant } from "@prisma/client";
import Image from "next/image";

// Funzione per mappare il testo alle icone
const getCategoryIcon = (type: string | null) => {
  const t = type?.toUpperCase() || ""; // Usiamo il maiuscolo per sicurezza
  
  switch (t) {
    case "PIZZERIA":
      return <Pizza size={16} />;
    case "BAR":
      return <Coffee size={16} />;
    case "PUB":
      return <Beer size={16} />;
    case "RESTAURANT":
    case "RISTORANTE": // Manteniamo compatibilità se avevi vecchi dati
      return <Utensils size={16} />;
    default:
      return <Store size={16} />;
  }
};

export const StoreCard = ({ store }: { store: Restaurant }) => {
  const placeholderImage = `https://picsum.photos/seed/${store.id}/600/400`;
  const finalImageSrc = store.logo && store.logo.startsWith("http") ? store.logo : placeholderImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2.5rem] border border-slate-200/60 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
    >
      {/* Overlay Luce Rossa in Hover */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* IMAGE SECTION */}
      <div className="relative w-full h-48 bg-slate-100 rounded-[2rem] overflow-hidden border border-white shadow-sm">
        <Image
          src={finalImageSrc}
          alt={store.name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-900 shadow-sm flex items-center gap-2 border border-white/20 uppercase tracking-tight">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-xl text-yellow-400 shadow-lg border border-white/10">
            {getCategoryIcon(store.type)}
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="px-3 pt-6 pb-4 flex-1 flex flex-col gap-3">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em]">
            TasteBoard Profile
          </p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-red-600 transition-colors">
            {store.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={14} className="shrink-0" />
          <p className="text-xs font-medium truncate italic">
            {store.address || "Indirizzo da configurare"}
          </p>
        </div>
      </div>

      {/* BUTTON SECTION */}
      <div className="mt-auto pt-2">
        <Link
          href={`/dashboard/store/${store.id}`}
          className="w-full group/btn relative overflow-hidden bg-slate-50 hover:bg-slate-900 text-slate-600 hover:text-white py-4 rounded-[1.4rem] font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
        >
          <Settings2 size={16} className="transition-transform group-hover/btn:rotate-90 duration-500" strokeWidth={2.5} />
          <span>Gestisci Locale</span>
        </Link>
      </div>
    </motion.div>
  );
};
