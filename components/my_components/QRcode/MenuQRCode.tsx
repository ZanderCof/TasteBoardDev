"use client";

import { QRCodeSVG } from "qrcode.react";
import { Download, Share2, Copy, Check, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuQRCodeProps {
  menuId: string;
  restaurantName: string;
}

export function MenuQRCode({ menuId, restaurantName }: MenuQRCodeProps) {
  const qrRef = useRef<SVGSVGElement>(null);
  const [copied, setCopied] = useState(false);

  const menuUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/m/${menuId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1000, 1000);
        ctx.drawImage(img, 50, 50, 900, 900);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR-${restaurantName}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="relative group overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/80 p-8 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col items-center gap-8 max-w-sm mx-auto transition-all hover:shadow-[0_30px_70px_rgba(239,68,68,0.1)]">
      {/* Glow ambientali interni */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
          <Sparkles size={10} className="fill-red-600" /> Smart Access
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
          QR Code <span className="text-red-600 italic">Live</span>
        </h3>
      </div>

      {/* Frame del QR con effetto "sospeso" */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 1 }}
        className="relative p-6 bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-50 z-10"
      >
        <QRCodeSVG
          ref={qrRef}
          value={menuUrl}
          size={180}
          level="H"
          imageSettings={{
            src: "/logo-small.png", // Assicurati che esista o rimuovi
            height: 35,
            width: 35,
            excavate: true,
          }}
        />
      </motion.div>

      <div className="w-full space-y-4 relative z-10">
        {/* Bottone Download Primario */}
        <button
          onClick={downloadQR}
          className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-red-600 hover:shadow-[0_10px_25px_rgba(220,38,38,0.3)] transition-all active:scale-95 group/btn"
        >
          <Download
            size={18}
            className="group-hover/btn:-translate-y-1 transition-transform"
          />
          QRcode
        </button>

        {/* Bottone Copia Link Secondario */}
        <button
          onClick={handleCopy}
          className="w-full h-14 bg-slate-50/50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-500 flex items-center justify-center gap-3 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm active:scale-95 group"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2 text-emerald-600"
              >
                <Check size={18} strokeWidth={3} />
                <span className="uppercase tracking-widest text-[10px]">
                  Copiato negli appunti
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="p-1.5 bg-white rounded-lg border border-slate-100 group-hover:border-blue-100 shadow-sm transition-colors">
                  <Copy
                    size={14}
                    className="text-slate-400 group-hover:text-blue-500"
                  />
                </div>
                <span className="uppercase tracking-widest text-[10px] group-hover:text-blue-600 transition-colors">
                  Copia Link Pubblico
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
