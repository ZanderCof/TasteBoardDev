"use client";

import { motion } from "framer-motion";
import { BetaForm } from "@/components/my_components/queue_components/BetaForm";
import { BetaCountdown } from "@/components/my_components/queue_components/BetaCountdown";
import { Sparkles, MousePointer2 } from "lucide-react";
import Image from "next/image";
import TasteBoardLogo from "@/public/image/TasteBoard_logo_no_bg.png";
import bgImage from "@/public/image/bg-coming-soon-page.jpg"
export default function QueuePage() {
  return (
    <main className="select-none min-h-screen bg-slate-950 relative flex flex-col items-center justify-center px-6 overflow-hidden border-[12px] border-slate-900/50">
      
      {/* ================= BACKGROUND LAYER (BLURRED) ================= */}
      <div className="absolute inset-0 z-0">
        {/* L'immagine di sfondo con blur pesantissimo */}
        <div className="absolute inset-0 overflow-hidden">
           <Image
            src={bgImage} // O una tua immagine d'atmosfera
            fill
            alt="Background"
            className="object-contain opacity-20 scale-150 blur-[100px]"
            priority
          />
        </div>

        {/* Overlay a griglia per texture tech */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Luci colorate dinamiche */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px]"
        />
      </div>

      {/* ================= HEADER ================= */}
      <header className="absolute top-0 left-0 w-full z-30">
        <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
          <Image src={TasteBoardLogo} width={140} height={40} alt="TasteBoard" className=" opacity-80" />
          <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 inline-block rounded-full bg-red-500 animate-pulse mr-2" />
            Beta Closed
          </div>
        </div>
      </header>

      {/* ================= CONTENT (VETRO) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl w-full bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-12 md:p-20 rounded-[3rem] shadow-2xl text-center space-y-10"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] mx-auto">
            <Sparkles size={12} /> Waitlist Chiusa
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            La nuova era <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              della sala.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            TasteBoard sta ridisegnando l&apos;operatività del tuo locale. 
            <span className="block text-white font-bold mt-2">Unisciti alla rivoluzione digitale.</span>
          </p>
        </div>

        <div className="space-y-12">
          <div className="brightness-110 contrast-125">
             <BetaCountdown />
          </div>
          <div className="max-w-md mx-auto">
            <BetaForm />
          </div>
        </div>

        {/* Status Badges */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-center gap-10 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-500">System</p>
              <p className="text-sm font-bold text-slate-300 italic">Operational</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[10px] font-black text-slate-500 uppercase">Ver</span>
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase text-slate-500">Current</p>
              <p className="text-sm font-bold text-slate-300 italic">v0.0.1-beta</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Noise Texture finale per grana pellicola */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://vercel.app')] z-20" />
    </main>
  );
}
