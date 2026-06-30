// components/my_components/dashboard/MobileNav.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/my_components/dashboard/Sidebar";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TasteBoardLogo } from "@/components/my_components/logo";

export default function MobileNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
        <TasteBoardLogo size="sm" href="/dashboard" />
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Apri menu"
          aria-expanded={isMobileMenuOpen}
          className="p-2 bg-slate-50 rounded-xl border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          <Menu size={20} />
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-99 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-xs z-100 lg:hidden"
            >
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
