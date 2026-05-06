"use client";
import { Trash2, Edit3 } from "lucide-react";
import { deleteDish } from "@/app/(account)/(dashboard)/dashboard/menu/[slug]/edit/action";

export function DishItem({ id, menuId, name, price, description }: { id: string, menuId: string, name: string, price: string, description: string }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-red-200 hover:shadow-md transition-all">
      <div className="flex items-center gap-4">
        {/* Cerchio placeholder per l'immagine */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
           <Edit3 size={18} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 leading-none mb-1">{name}</h4>
          <p className="text-[11px] text-slate-400 font-medium">{description || "Nessuna descrizione"}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <span className="font-black text-slate-900 tracking-tighter">€{price}</span>
        
        {/* BOTTONE ELIMINA PIATTO */}
        <button 
          onClick={async () => {
            if(confirm("Eliminare questo piatto?")) {
              await deleteDish(id, menuId);
            }
          }}
          className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
