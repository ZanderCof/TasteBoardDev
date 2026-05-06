"use client";

import { motion } from "framer-motion";
import { BetaForm } from "@/components/my_components/waitlist_components/BetaForm";
import { BetaCountdown } from "@/components/my_components/waitlist_components/BetaCountdown";
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import TasteBoardLogo from "@/public/image/TasteBoard_logo_no_bg.png";
import bgImage from "@/public/image/bg-coming-soon-page.jpg";

export default function QueuePage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-slate-900 relative flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* ================= BACKGROUND LAYER ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          fill
          alt="Background"
          className="object-cover opacity-[0.5] grayscale transition-opacity duration-700"
          priority
        />
        <div className="absolute opacity-[0.5] inset-0  backdrop-blur-sm" />
        {/* Glow Rosso - Più soffuso e posizionato strategicamente */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-200 h-200 bg-red-600/20 rounded-full blur-[160px]"
        />

        {/* Glow Giallo/Ambra - Effetto luce calda */}
        <motion.div
          animate={{ opacity: [0.1, 0.25, 0.1], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-200 h-200 bg-yellow-500/15 rounded-full blur-[160px]"
        />
      </div>

      {/* ================= NAVIGATION ================= */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
            <Image
              src={TasteBoardLogo}
              width={150}
              height={45}
              alt="TasteBoard"
              className="drop-shadow-sm"
            />
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-red-100/50 text-[11px] text-red-600 font-bold uppercase tracking-[0.15em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Beta Access Only
          </div>
        </div>
      </header>

      {/* ================= MAIN CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl w-full bg-white/70 backdrop-blur-[32px] border border-white p-8 md:p-20 rounded-[3rem] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.08)] text-center"
      >
        {/* Badge Early Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-400/10 border border-yellow-200/50 text-yellow-700 text-[11px] font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} className="text-yellow-500" />
          Pre-registrazioni aperte
        </motion.div>

        {/* Title con gradiente moderno */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
          Ridisegniamo la <br />
          <span className="bg-linear-to-br from-red-600 via-red-500 to-yellow-500 text-transparent bg-clip-text">
            ristorazione
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-500 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12">
          L&apos;ecosistema intelligente per locali che puntano
          all&apos;eccellenza.
          <span className="text-slate-900 font-medium block mt-2 underline decoration-yellow-400 decoration-2 underline-offset-4">
            Il tuo posto in prima fila è qui.
          </span>
        </p>

        {/* Form & Countdown Section */}
        <div className="space-y-12 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
          <BetaCountdown />
          <div className="max-w-md mx-auto">
            <BetaForm />
          </div>
        </div>

        {/* Status Bar */}
        <div className="mt-12 pt-8 flex items-center justify-center gap-8 md:gap-16 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-slate-50">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                Status
              </p>
              <p className="text-sm font-bold text-slate-800 italic">
                Ready for Launch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-slate-50">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">
                V.1
              </span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                Engine
              </p>
              <p className="text-sm font-bold text-slate-800">
                TasteBoard Core
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer minimalista */}
      <footer className="mt-12 relative z-10 text-slate-400 text-xs font-medium tracking-widest uppercase">
        © 2024 TasteBoard — All Rights Reserved
      </footer>
    </main>
  );
}
