"use client";
import { PlusCircle, GripVertical, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySidebarProps {
  categories: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CategorySidebar({ categories, activeTab, setActiveTab }: CategorySidebarProps) {
  return (
    <aside className="space-y-4 sticky top-32">
      <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-8 border border-white shadow-2xl shadow-slate-200/40">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="font-black text-slate-900 text-xl tracking-tight italic underline decoration-red-600">Sezioni</h2>
          <button className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
            <PlusCircle size={20} />
          </button>
        </div>
        
        <div className="space-y-3">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "w-full flex items-center justify-between p-5 rounded-[1.8rem] border-2 transition-all duration-300 font-bold text-sm group",
                  isActive 
                    ? "bg-white border-red-600 text-red-600 shadow-xl shadow-red-100 scale-[1.03]" 
                    : "bg-slate-50/50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-1.5 h-6 rounded-full transition-all", isActive ? "bg-red-600" : "bg-slate-200 group-hover:bg-red-300")} />
                  {cat}
                </div>
                <GripVertical size={16} className={cn("opacity-20", isActive ? "text-red-600 opacity-60" : "text-slate-400")} />
              </button>
            );
          })}
        </div>

        <div className="mt-10 p-5 bg-yellow-50/80 rounded-3xl border border-yellow-100 flex gap-4">
           <Info size={24} className="text-yellow-600 shrink-0" />
           <p className="text-xs text-yellow-800 leading-relaxed font-semibold italic">
             L&apos;ordine che imposti qui sarà lo stesso visualizzato dai clienti sul menu digitale.
           </p>
        </div>
      </div>
    </aside>
  );
}
