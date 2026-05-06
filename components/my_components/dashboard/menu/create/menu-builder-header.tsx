"use client";

import { Save, Loader2, ChevronLeft, LayoutGrid, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMenuAction } from "@/app/(account)/(dashboard)/dashboard/menu/create/actions";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import Link from "next/link";
import { motion } from "framer-motion";

export function MenuBuilderHeader() {
  const { menuName, setMenuName, categories, resetMenu } = useMenuStore();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const dishesCount = categories.reduce((acc, cat) => acc + cat.dishes.length, 0);

  const handlePublish = async () => {
    // 1. Validazione iniziale
    if (!menuName.trim()) {
      return toast.error("Nome mancante", { description: "Inserisci un nome per il menu." });
    }
    if (categories.length === 0) {
      return toast.warning("Menu vuoto", { description: "Aggiungi almeno una categoria." });
    }

    setIsPending(true);

    try {
      // 2. Chiamata alla Server Action
      const result = await createMenuAction({
        name: menuName,
        categories: categories,
      });

      // 3. Gestione Risposta
      if (result.success) {
        toast.success(`Menu "${menuName}" pubblicato!`);
        resetMenu(); // Pulisce lo store Zustand
        router.push("/dashboard/menu"); // Torna alla lista
        router.refresh(); // Forza l'aggiornamento dei dati server-side
      } else {
        toast.error("Errore di pubblicazione", { description: result.error });
        setIsPending(false); // Sblocca il caricamento in caso di errore logico
      }
    } catch (error) {
      toast.error("Errore critico", { description: "Il server non risponde." });
      setIsPending(false); // Sblocca il caricamento in caso di crash di rete
    }
  };

  return (
    <header className="sticky top-4 md:top-6 z-50 px-4 md:px-0">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex items-center justify-between gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 rounded-[2rem] md:rounded-[2.5rem] 
        bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-slate-200/50"
      >
        {/* LEFT: Nav & Name */}
        <div className="flex items-center gap-3 md:gap-5 min-w-0">
          <Link
            href="/dashboard/menu"
            className="flex items-center justify-center shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl 
              bg-slate-50 border border-slate-100 text-slate-400 hover:text-red-600 transition-all"
          >
            <ChevronLeft size={18} />
          </Link>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="flex items-center gap-1 text-[9px] font-bold text-red-500 uppercase tracking-tighter bg-red-50 px-2 py-0.5 rounded-full">
                <Sparkles size={8} className="fill-current" /> Builder
              </span>
              <span className="hidden sm:block text-[9px] text-slate-300 font-bold tracking-widest uppercase">v1.0</span>
            </div>

            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Nome del menu..."
              className="bg-transparent border-none p-0 text-lg md:text-xl font-bold text-slate-900 
                focus:ring-0 w-full placeholder:text-slate-300 tracking-tight"
            />
          </div>
        </div>

        {/* RIGHT: Stats & CTA */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:flex items-center gap-4 px-4 h-10 md:h-12 bg-slate-50/50 border border-slate-100 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-1.5">
              <LayoutGrid size={12} className="text-slate-400" />
              <span className="text-[11px] font-bold text-slate-900">{categories.length} <span className="text-slate-400 font-medium">Sezioni</span></span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <span className="text-[11px] font-bold text-slate-900">{dishesCount} <span className="text-slate-400 font-medium">Piatti</span></span>
          </div>

          <Button
            onClick={handlePublish}
            disabled={isPending}
            className="h-10 md:h-12 px-5 md:px-8 rounded-xl md:rounded-2xl font-bold
              bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-100 
              transition-all active:scale-95 flex items-center gap-2"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Send size={16} />
            )}
            <span className="text-xs md:text-sm">{isPending ? "Invio..." : "Pubblica"}</span>
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
