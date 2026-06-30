"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TriangleAlert } from "lucide-react";

const DISMISSED_KEY = "beta-banner-dismissed";

function setBetaHeight(px: number) {
  document.documentElement.style.setProperty("--beta-h", `${px}px`);
}

export function BetaBanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) {
      setVisible(true);
    }
  }, []);

  // Misura l'altezza reale e aggiorna la variabile CSS
  useEffect(() => {
    if (!visible) {
      setBetaHeight(0);
      return;
    }
    const update = () => {
      if (ref.current) setBetaHeight(ref.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      setBetaHeight(0);
    };
  }, [visible]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="fixed top-0 left-0 right-0 z-100 bg-amber-500 shadow-md shadow-amber-500/30"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
            <div className="shrink-0 w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <TriangleAlert size={15} className="text-white" strokeWidth={2.5} />
            </div>

            <p className="flex-1 text-sm text-white leading-snug">
              <span className="font-black">Versione Beta —</span>{" "}
              potrebbero verificarsi bug o perdite di dati. Non utilizzare
              Nuviio come strumento principale fino al rilascio ufficiale.
            </p>

            <button
              onClick={handleDismiss}
              aria-label="Chiudi avviso beta"
              className="shrink-0 p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
