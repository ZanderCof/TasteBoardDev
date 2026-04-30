"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Gestione dello scroll per animare la barra
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Come Funziona", href: "/how-it-works" },
    { name: "Funzionalità", href: "/function" },
    { name: "Prezzi", href: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4 md:px-6 md:py-6">
      <nav
        className={`mx-auto max-w-7xl transition-all duration-500 ease-in-out border border-slate-200/60 backdrop-blur-md
          ${isScrolled 
            ? "bg-white/80 rounded-[1.5rem] md:rounded-[2rem] py-3 px-6 shadow-lg shadow-slate-200/20" 
            : "bg-white/40 rounded-[1rem] md:rounded-[1.5rem] py-4 px-8 shadow-sm"
          }`}
      >
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg transition-all group-hover:rotate-12 group-hover:scale-110">
              <Utensils size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900">
              Taste<span className="text-red-600">board</span>
            </span>
          </Link>

          {/* LINKS CENTRALI (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/30 rounded-full p-1 border border-slate-200/20">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 rounded-full hover:bg-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* AZIONI (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Link href="/login">
              <Button 
                variant="ghost" 
                className="font-bold text-slate-700 hover:text-red-600 hover:bg-transparent"
              >
                Accedi
              </Button>
            </Link> */}
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 rounded-full shadow-md shadow-red-200 transition-all hover:scale-105 group">
                Inizia ora
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 20 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden flex flex-col gap-4"
            >
              <div className="h-px bg-slate-100 w-full" />
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-900 hover:text-red-600 py-2 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full font-bold rounded-xl h-12">
                    Accedi
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-red-600 text-white font-bold rounded-xl h-12">
                    Registrati
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
