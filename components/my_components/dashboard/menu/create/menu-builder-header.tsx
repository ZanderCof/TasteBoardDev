"use client";

import { Save, Loader2, ChevronLeft, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMenuAction } from "@/app/(account)/(dashboard)/dashboard/menu/create/actions";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import Link from "next/link";

export function MenuBuilderHeader() {
  const { menuName, setMenuName, categories, resetMenu } = useMenuStore();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const dishesCount = categories.reduce((acc, cat) => acc + cat.dishes.length, 0);

  const handlePublish = async () => {
    if (!menuName.trim()) {
      return toast.error("Nome mancante", {
        description: "Inserisci un nome per il menu prima di pubblicare.",
      });
    }

    if (categories.length === 0 || dishesCount === 0) {
      return toast.warning("Menu vuoto", {
        description: "Aggiungi almeno una categoria e un piatto.",
      });
    }

    setIsPending(true);

    toast.promise(
      createMenuAction({
        name: menuName,
        categories: categories,
      }),
      {
        loading: "Sto pubblicando il menu...",
        success: (result) => {
          if (!result.success) throw new Error(result.error);
          resetMenu();
          router.push("/dashboard/menu");
          return `Menu "${menuName}" pubblicato!`;
        },
        error: (err) => `Errore: ${err.message}`,
        finally: () => setIsPending(false),
      }
    );
  };

  return (
    <header className="sticky top-6 z-50">
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 rounded-[2.5rem] 
        bg-white/70 backdrop-blur-2xl border border-white/40 
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none 
          bg-linear-to-r from-red-100/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* LEFT */}
        <div className="flex items-center gap-4 min-w-0">
          
          <Link
            href="/dashboard/menu"
            className="flex items-center justify-center w-12 h-12 rounded-2xl 
              bg-slate-50 border border-slate-100 text-slate-400 
              hover:text-red-600 hover:border-red-200 hover:bg-red-50 
              transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </Link>

          <div className="hidden md:block h-8 w-px bg-slate-200/60" />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 
                bg-linear-to-r from-red-50 to-red-100 
                rounded-full border border-red-200">
                <Sparkles size={10} className="text-red-500 fill-red-500" />
                <span className="text-[10px] font-black uppercase text-red-600">
                  Builder
                </span>
              </div>

              <span className="text-[10px] text-slate-300 font-bold tracking-widest">
                v1.0
              </span>
            </div>

            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Nome del menu..."
              className="bg-transparent border-none p-0 text-xl font-black text-slate-900 
                focus:ring-0 w-50 sm:w-75 lg:w-105 
                placeholder:text-slate-300 tracking-tight"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Stats pill */}
          <div className="hidden lg:flex items-center gap-5 px-5 h-12 
            bg-white/60 backdrop-blur-md border border-slate-100 
            rounded-2xl shadow-sm">

            <div className="flex items-center gap-2">
              <LayoutGrid size={14} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500">
                <span className="text-slate-900">{categories.length}</span> Sezioni
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <span className="text-xs font-bold text-slate-500">
              <span className="text-slate-900">{dishesCount}</span> Piatti
            </span>
          </div>

          {/* Draft */}
          <Button
            variant="ghost"
            className="hidden sm:flex h-12 px-6 rounded-2xl font-bold text-slate-500 
              hover:bg-slate-100 transition"
          >
            Bozza
          </Button>

          {/* CTA */}
          <Button
            onClick={handlePublish}
            disabled={isPending}
            className="h-12 px-8 rounded-2xl font-bold flex items-center gap-2.5
              bg-linear-to-r from-slate-900 to-slate-800 
              hover:from-red-600 hover:to-red-500
              text-white shadow-xl shadow-slate-300 
              transition-all active:scale-95"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}

            <span className="hidden sm:inline">Pubblica</span>
            <span className="sm:hidden text-xs">Salva</span>
          </Button>
        </div>
      </div>
    </header>
  );
}