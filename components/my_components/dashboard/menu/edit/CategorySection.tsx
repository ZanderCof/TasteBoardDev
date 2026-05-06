"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Loader2 } from "lucide-react";
import { AddDishEditModal } from "./AddDishEditModal";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { deleteCategory, updateCategoryName } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";

export function CategorySection({ id, name: initialName, menuId, children }: { id: string, name: string, menuId: string, children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoryName, setCategoryName] = useState(initialName);

  const handleUpdateName = async (newName: string) => {
    setCategoryName(newName);
    // Qui puoi aggiungere un debounce o salvare tramite action quando l'input perde il focus (onBlur)
    try {
       await updateCategoryName(id, newName, menuId);
    } catch (error) {
       toast.error("Errore nell'aggiornamento del nome");
    }
  };

  const handleDelete = async () => {
    if (confirm(`Sei sicuro di voler eliminare "${categoryName}" e tutti i suoi piatti?`)) {
      setIsDeleting(true);
      await deleteCategory(id, menuId);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-2xl border border-slate-100 p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative group mb-6 md:mb-10">
      
      {/* HEADER: MOBILE FIRST (Flex-col su mobile, row su desktop) */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        
        {/* TITOLO EDITABILE */}
        <div className="flex items-center gap-2 group/input w-full">
          <input 
            value={categoryName}
            onChange={(e) => handleUpdateName(e.target.value)}
            className="bg-transparent border-none p-0 text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight outline-none focus:ring-0 w-full placeholder:text-slate-300 transition-colors focus:text-red-600"
            placeholder="NOME CATEGORIA"
          />
          <Edit2 size={16} className="text-slate-200 group-focus-within/input:text-red-500 shrink-0" />
        </div>
        
        {/* ACTIONS: PIÙ GRANDI PER TOUCH SU MOBILE */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 md:py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 
            Piatto
          </button>

          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className={cn(
              "p-4 md:p-2.5 rounded-2xl transition-all border border-slate-100 md:border-transparent",
              isDeleting ? "text-red-300" : "text-red-300 hover:text-red-600 hover:bg-red-50"
            )}
          >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>
        </div>
      </div>
      
      {/* LISTA PIATTI */}
      <div className="relative">
        {children}
      </div>

      <AddDishEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        categoryId={id} 
        menuId={menuId} 
      />
    </div>
  );
}
