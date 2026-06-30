"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Share } from "lucide-react";
import { TasteBoardLogo } from "@/components/my_components/logo";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const LS_KEY = "pwa-banner-dismissed";   // permanente tra sessioni
const SS_KEY = "pwa-banner-seen";        // guardia per la sessione corrente

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

// Chiamata sincrona durante la prima render client-side
// Evita il flash "banner appare → scompare" tipico dell'useEffect
function getInitialMode(): "native" | "ios" | null {
  if (typeof window === "undefined") return null;
  if (isStandalone()) return null;
  if (localStorage.getItem(LS_KEY)) return null;   // già chiuso in passato
  if (sessionStorage.getItem(SS_KEY)) return null; // già visto questa sessione
  if (isIOS()) return "ios";
  return null; // native: aspetta beforeinstallprompt
}

export function PwaInstallBanner() {
  const [mode, setMode] = useState<"native" | "ios" | null>(getInitialMode);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Già gestito dal getInitialMode; qui gestiamo solo il caso native
    if (mode === "ios") {
      sessionStorage.setItem(SS_KEY, "1");
      return;
    }

    if (isStandalone() || localStorage.getItem(LS_KEY) || sessionStorage.getItem(SS_KEY)) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setMode("native");
      sessionStorage.setItem(SS_KEY, "1");
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = () => {
    localStorage.setItem(LS_KEY, "1");
    sessionStorage.setItem(SS_KEY, "1");
    setMode(null);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(LS_KEY, "1");
      sessionStorage.setItem(SS_KEY, "1");
      setMode(null);
    }
    setDeferredPrompt(null);
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

              {mode === "native" && (
                <button
                  onClick={handleInstall}
                  className="flex items-center gap-1.5 shrink-0 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-red-200"
                >
                  <Download size={14} />
                  Installa
                </button>
              )}

              {mode === "ios" && (
                <span className="shrink-0 text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                  Safari
                </span>
              )}

              <button
                onClick={dismiss}
                aria-label="Chiudi"
                className="shrink-0 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {mode === "ios" && (
              <div className="px-4 pb-3 flex items-center gap-2 border-t border-slate-100 pt-2.5">
                <span className="text-xs text-slate-500">Tocca</span>
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
