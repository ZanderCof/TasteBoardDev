"use client";

import Link from "next/link";
import { TasteBoardLogo } from "@/components/my_components/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Prodotto",
      links: [
        { name: "Funzionalità", href: "/function" },
        { name: "Prezzi", href: "/pricing" },
        { name: "Come Funziona", href: "/how-it-works" },
      ],
    },
    {
      title: "Risorse",
      links: [
        { name: "Guida alla configurazione", href: "#/guide" },
        { name: "Nuviio", href: "https://nuviio-liard.vercel.app/" },
        { name: "Assistenza", href: "#" },
      ],
    },
    {
      title: "Legale",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Cookie Policy", href: "/cookie" },
        { name: "Termini di Servizio", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="relative bg-white border-t border-slate-100 overflow-hidden">
      {/* Decorazione sfocata sullo sfondo */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[100px] -z-10 translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* LOGO & INFO */}
          <div className="lg:col-span-2 space-y-6">
            <TasteBoardLogo size="md" href="/" />
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Il sistema operativo per la ristorazione moderna. Gestisci menu, turni e costi con un unico strumento intuitivo.
            </p>
            
            {/* SOCIAL PLACEHOLDERS */}
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 hover:border-red-200 hover:bg-red-50 transition-all group">
                  <div className="w-4 h-4 rounded-full bg-slate-300 group-hover:bg-red-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* MAPPING SEZIONI */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">
            © {currentYear} Tasteboard è un prodotto Nuviio. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              hello@nuviio.it
            </div>
            <div className="flex items-center gap-2 text-slate-900 bg-yellow-400/20 px-3 py-1.5 rounded-full border border-yellow-400/30">
              <span className="w-1.5 h-1.5 bg-red-700 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] uppercase tracking-wider font-black">System Offline</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
