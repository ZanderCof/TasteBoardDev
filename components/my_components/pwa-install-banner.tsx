"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { TasteBoardLogo } from "@/components/my_components/logo";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "pwa-banner-dismissed";
const DISMISSED_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 giorni

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed && Date.now() - Number(dismissed) < DISMISSED_TTL_MS) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-200/60 border border-slate-200/80">
            <TasteBoardLogo variant="mark" size="sm" href={null} />

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                Installa Tasteboard
              </p>
              <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                Accedi più veloce dal tuo dispositivo
              </p>
            </div>

            <button
              onClick={handleInstall}
              className="flex items-center gap-1.5 shrink-0 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-red-200"
            >
              <Download size={14} />
              Installa
            </button>

            <button
              onClick={handleDismiss}
              aria-label="Chiudi"
              className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
