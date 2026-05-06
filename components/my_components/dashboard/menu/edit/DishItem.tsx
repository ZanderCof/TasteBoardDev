"use client";
import { Trash2, Edit3, MoreVertical } from "lucide-react";
import { deleteDish } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function DishItem({ id, menuId, name, price, description }: { id: string, menuId: string, name: string, price: string, description: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Eliminare "${name}"?`)) {
      setIsDeleting(true);
      await deleteDish(id, menuId);
      setIsDeleting(false);
    }
  };

  return (
    <div className={cn(
      "group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 bg-white border border-slate-100 rounded-[1.8rem] transition-all",
      "hover:border-red-100 hover:shadow-lg hover:shadow-slate-200/50",
      isDeleting && "opacity-50 grayscale pointer-events-none"
    )}>
      
      {/* LEFT: Info Piatto */}
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        {/* Placeholder Immagine - Più grande su mobile per il touch */}
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-red-500 group-hover:bg-red-50 transition-colors">
           <Edit3 size={20} strokeWidth={2.5} />
        </div>
        
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-slate-900 text-lg leading-tight truncate">
            {name}
          </h4>
          <p className="text-[12px] text-slate-400 font-medium line-clamp-1 italic">
            {description || "Aggiungi una descrizione..."}
          </p>
        </div>
      </div>

      {/* RIGHT: Prezzo e Azioni */}
      <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-none border-slate-50">
        {/* Prezzo evidenziato */}
        <div className="flex flex-col sm:items-end leading-none">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 sm:hidden">Prezzo</span>
          <span className="font-black text-slate-900 text-xl tracking-tighter">
            €{parseFloat(price).toFixed(2)}
          </span>
        </div>
        
        {/* Bottoni Azione sempre visibili su mobile, in hover su desktop */}
        <div className="flex items-center gap-1">
          <button 
            onClick={handleDelete}
            className="p-3 sm:p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Trash2 size={20} />
          </button>
          
          {/* Icona per suggerire il drag o altre opzioni su mobile */}
          <div className="sm:hidden p-3 text-slate-200">
            <MoreVertical size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
