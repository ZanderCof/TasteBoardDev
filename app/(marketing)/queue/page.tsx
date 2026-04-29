"use client";

import { motion } from "framer-motion";
import { BetaForm } from "@/components/my_components/queue_components/BetaForm";
import { BetaCountdown } from "@/components/my_components/queue_components/BetaCountdown";
import { Sparkles, MousePointer2 } from "lucide-react";
import Image from "next/image";
import TasteBoardLogo from "@/public/image/TasteBoard_logo_no_bg.png";

export default function QueuePage() {
  return (
    <main className=" select-none min-h-screen bg-slate-50 relative flex flex-col items-center justify-center px-6 overflow-hidden border border-red-800 border-[10px] ">

      {/* ================= BACKGROUND DINAMICO (BRAND COLOR) ================= */}
      <div className="absolute inset-0 -z-10">
        
        {/* Griglia sottile */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Glow Primario (Rosso TasteBoard) - Posizionato in alto a sinistra */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-5%] w-[800px] h-[800px] bg-red-500/30 rounded-full blur-[130px]"
        />

        {/* Glow Secondario (Giallo/Arancio del formaggio nel logo) - Bilanciamento */}
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[140px]"
        />

        {/* Texture Noise per profondità */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" />
      </div>
      {/* ================= HEADER ================= */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Image src={TasteBoardLogo} width={130} height={38} alt="TasteBoard" className="opacity-90" priority />
          </motion.div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Beta in arrivo
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center space-y-8 relative z-10"
      >
        {/* Badge con il nuovo colore */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-red-100 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Sparkles size={12} className="text-indigo-500" />
          StartingLine Drop #1
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85]">
          La nuova era <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500">
            della sala.
          </span>
        </h1>

        <p className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Ridisegniamo l&apos;operatività del tuo locale. 
          <span className="block text-slate-900 font-bold mt-1 tracking-tight italic">Prendi il tuo posto in prima fila.</span>
        </p>

        {/* CTAs */}
        <div className="space-y-6 pt-4">
          <BetaCountdown />
          <div className="max-w-md mx-auto">
            {/* Assicurati che nel componente BetaForm il pulsante sia rosso ora! */}
            <BetaForm />
          </div>
        </div>
      </motion.div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30 text-red-900">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <MousePointer2 size={16} />
        </motion.div>
      </div>
    </main>
  );
}
