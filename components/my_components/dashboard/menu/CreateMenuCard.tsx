"use client";
import { Plus } from 'lucide-react';


// 1. Definisci l'interfaccia
interface CreateMenuCardProps {
  restaurantId: string;
}

// 2. Applica l'interfaccia alla funzione
export default function CreateMenuCard({ restaurantId }: CreateMenuCardProps) {
  return (
    <div 
      onClick={() => {
        // Ora puoi usare restaurantId quando apri la modale o invii l'action
        console.log("Creazione menu per ristorante:", restaurantId);
      }}
      className="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-red-500 hover:bg-red-50/30 transition-all cursor-pointer h-full min-h-50"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
        <Plus size={24} strokeWidth={2.5} />
      </div>
      <p className="mt-4 font-black text-slate-400 group-hover:text-red-600 uppercase text-[11px] tracking-widest transition-colors">
        Nuovo Menu
      </p>
    </div>
  );
}
