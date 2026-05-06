"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { deleteCategory } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { AddDishEditModal } from "./AddDishEditModal";


export function CategorySection({ id, name, menuId, children }: { id: string, name: string, menuId: string, children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-8 rounded-[2.5rem] shadow-sm relative group mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{name}</h2>
        
        <div className="flex items-center gap-2">
          {/* TRIGGER MODALE */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-100 hover:-translate-y-0.5 active:scale-95"
          >
            <Plus size={14} /> Nuovo Piatto
          </button>

          <button 
            onClick={async () => confirm("Eliminare categoria?") && await deleteCategory(id, menuId)}
            className="p-2 text-slate-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {children}

      {/* COMPONENTE MODALE */}
      <AddDishEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        categoryId={id} 
        menuId={menuId} 
      />
    </div>
  );
}
