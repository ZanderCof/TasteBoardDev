// app/(account)/(dashboard)/dashboard/menu/[slug]/page.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Eye, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OwnerMenuViewPage() {
  const { slug } = useParams();

  // Qui recupererai i dati reali dal database tramite il tuo slug
  const menuInfo = {
    title: "Menu Estivo 2024",
    lastUpdate: "24 Maggio 2026",
    categoriesCount: 4,
    dishesCount: 28
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* ================= BARRA DI NAVIGAZIONE SUPERIORE ================= */}
        <div className="flex items-center justify-between mb-12">
          <Link 
            href="/dashboard/menu" 
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} /> Torna ai menu
          </Link>

          {/* Bottone principale di Switch all'Editor */}
          <Link href={`/dashboard/menu/${slug}/edit`}>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-md hover:bg-slate-800 transition-all"
            >
              <Edit3 size={16} /> Modifica Menu
            </motion.button>
          </Link>
        </div>

        {/* ================= HERO INFORMATIVA GENERALE ================= */}
        <div className="relative bg-white/70 backdrop-blur-xl border border-white p-8 md:p-12 rounded-[2.5rem] shadow-sm overflow-hidden mb-8">
          {/* Cerchio di luce giallo/oro sullo sfondo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest mb-3">
                <Sparkles size={10} className="fill-red-600" /> Vista Proprietario
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">{menuInfo.title}</h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2 flex items-center gap-1.5">
                <Calendar size={14} /> Ultima modifica: {menuInfo.lastUpdate}
              </p>
            </div>

            {/* Statistiche veloci in box minimali */}
            <div className="flex gap-4">
              <div className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-center min-w-25">
                <p className="text-2xl font-black text-slate-900">{menuInfo.categoriesCount}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Sezioni</p>
              </div>
              <div className="bg-slate-50 border border-slate-100 px-5 py-4 rounded-2xl text-center min-w-25">
                <p className="text-2xl font-black text-slate-900">{menuInfo.dishesCount}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">Piatti Totali</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LINK RAPIDO QR CODE CLIENTE ================= */}
        <div className="bg-linear-to-r from-red-500/10 to-yellow-500/5 border border-red-100 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-500 border border-red-100 shadow-sm">
              <Eye size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Link pubblico per i clienti</p>
              <p className="text-xs text-slate-500">Usa questo URL per generare il QR Code da mettere sui tavoli.</p>
            </div>
          </div>
          <Link 
            href={`/menu/${slug}`} 
            target="_blank" 
            className="text-xs font-bold uppercase tracking-wider bg-white border border-slate-200 hover:border-slate-900 px-4 py-2.5 rounded-xl text-center transition-colors"
          >
            Vedi come Cliente →
          </Link>
        </div>

        {/* ================= ANTEPRIMA CONTENUTI (Sola Lettura) ================= */}
        <div className="space-y-4">
          <h2 className="text-xs font-black uppercase text-slate-400 tracking-[0.2em] px-2">Anteprima Rapida</h2>
          
          {/* Qui mapperai i dati del menu visualizzandoli in sola lettura */}
          <div className="p-6 bg-white/40 border border-white/60 rounded-3xl text-center text-slate-400 text-sm py-12">
            I tuoi piatti e le tue categorie compariranno qui in modalità di sola lettura. <br />
            Per fare modifiche, usa il tasto <b className="text-slate-900">Modifica Menu</b> in alto.
          </div>
        </div>

      </div>
    </div>
  );
}
