"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share } from "lucide-react";
import { TasteBoardLogo } from "@/components/my_components/logo";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "pwa-banner-dismissed";
const DISMISSED_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 giorni

function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !(window.navigator as { standalone?: boolean }).standalone
  );
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [mode, setMode] = useState<"native" | "ios" | null>(null);

  useEffect(() => {
    if (isStandalone()) return;

    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISSED_TTL_MS) return;

    // iOS Safari: nessun evento, mostriamo istruzioni manuali
    if (isIOS()) {
      setMode("ios");
      return;
    }

    // Chrome / Edge / Android: usa beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setMode("native");
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setMode(null);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setMode(null);
  };

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="rounded-2xl bg-white shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">

            {/* Riga principale */}
            <div className="flex items-center gap-3 px-4 py-3">
              <TasteBoardLogo variant="mark" size="sm" href={null} />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  Installa Tasteboard
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                  Accedi più veloce dal tuo dispositivo
                </p>
              </div>

              {mode === "native" ? (
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 shrink-0 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-red-200"
                >
                  <Download size={14} />
                  Installa
                </button>
              ) : (
                // Su iOS il pulsante apre le istruzioni (il banner le mostra già sotto)
                <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                  Safari
                </span>
              )}

              <button
                onClick={handleDismiss}
                aria-label="Chiudi"
                className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Istruzioni iOS */}
            {mode === "ios" && (
              <div className="px-4 pb-3 flex items-center gap-2 border-t border-slate-100 pt-2.5">
                <span className="text-xs text-slate-500 leading-snug">
                  Tocca
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-lg">
                  <Share size={11} className="text-slate-600" />
                  <span className="text-[11px] font-bold text-slate-700">Condividi</span>
                </span>
                <span className="text-xs text-slate-500">poi</span>
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg">
                  Aggiungi a Home
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
