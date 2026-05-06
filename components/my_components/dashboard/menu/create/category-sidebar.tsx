"use client";
import { Plus, GripVertical, Info, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import { motion, AnimatePresence } from "framer-motion";

export function CategorySidebar() {
  const { categories, activeCategoryId, setActiveCategory, addCategory } =
    useMenuStore();

  const handleAddCategory = () => {
    const name = prompt("Nome della nuova sezione:");
    if (name) addCategory(name);
  };

  return (
    <>
      {/* --- VERSIONE MOBILE: Sticky Button + Horizontal Scroll --- */}
      <div className="lg:hidden sticky top-32 z-30 mb-6 -mx-4 bg-slate-50/80 backdrop-blur-md border-y border-slate-100 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Pulsante fisso a sinistra */}
          <div className="relative z-10 pr-2 border-r border-slate-200">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleAddCategory}
              className="p-3.5 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-200 shrink-0"
            >
              <Plus size={20} strokeWidth={3} />
            </motion.button>
          </div>

          {/* Contenitore sezioni che scivola sotto/accanto */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mask-fade-right grow">
            {categories.map((cat) => {
              const isActive = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-5 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border shrink-0",
                    isActive
                      ? "bg-slate-900 border-slate-900 text-white shadow-md scale-95"
                      : "bg-white border-slate-200 text-slate-500 active:bg-slate-50",
                  )}
                >
                  {cat.name}
                  <span
                    className={cn(
                      "ml-2 text-[10px] px-1.5 py-0.5 rounded-md font-black",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-400",
                    )}
                  >
                    {cat.dishes.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- VERSIONE DESKTOP: Sidebar Classica --- */}
      <aside className="hidden lg:block space-y-4 sticky top-32 w-full max-w-[320px]">
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2">
              <LayoutGrid size={18} className="text-red-600" />
              <h2 className="font-bold text-slate-900 text-lg tracking-tight">
                Sezioni
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddCategory}
              className="p-2 bg-red-600 text-white rounded-xl shadow-lg shadow-red-100 transition-colors"
            >
              <Plus size={18} strokeWidth={3} />
            </motion.button>
          </div>

          {/* LISTA CATEGORIE DESKTOP */}
          <div className="space-y-2 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {categories.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <motion.button
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 group",
                      isActive
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-200"
                        : "bg-white border-slate-100 text-slate-500 hover:border-red-200 hover:bg-red-50/30",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-1 h-4 rounded-full transition-all",
                          isActive
                            ? "bg-red-500"
                            : "bg-slate-200 group-hover:bg-red-300",
                        )}
                      />
                      <span className="text-sm font-bold tracking-tight">
                        {cat.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-[10px] font-black px-2 py-0.5 rounded-md",
                          isActive
                            ? "bg-white/10 text-white"
                            : "bg-slate-100 text-slate-400",
                        )}
                      >
                        {cat.dishes.length}
                      </span>
                      <GripVertical
                        size={14}
                        className={cn(
                          "opacity-20 transition-opacity",
                          isActive ? "opacity-60" : "group-hover:opacity-40",
                        )}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* INFO BOX */}
          <div className="mt-8 p-4 bg-amber-50/50 rounded-[1.8rem] border border-amber-100 flex gap-3">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-snug font-medium italic">
              Trascina le sezioni per riordinare il menu. L&apos;ordine sarà
              sincronizzato in tempo reale.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
