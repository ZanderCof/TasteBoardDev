"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Utensils, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        /* SFONDO SEMPRE BLURRATO */
        bg-white/40 backdrop-blur-md 
        ${isScrolled ? "py-3 border-b border-slate-200/50 shadow-sm" : "py-5 border-b border-transparent"}
      `}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <Utensils size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            Taste<span className="text-red-600">board</span>
          </span>
        </Link>

        {/* LINKS CENTRALI */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-700 hover:text-red-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AZIONI */}
        <div className="hidden md:flex items-center gap-3">
          <Link href={"/login"}>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 rounded-xl shadow-lg  transition-all hover:scale-105">
              Accedi
            </Button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN - Anche questo sfocato */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200 p-6 flex flex-col gap-6 md:hidden shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-900"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3">
            <Link href="/login" className="w-full">
              <Button className="w-full h-12 bg-red-600 text-white font-bold">
                Accedi
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
