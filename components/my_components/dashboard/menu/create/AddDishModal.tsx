"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, UtensilsCrossed, Euro } from "lucide-react";
import { useMenuStore } from "@/app/(account)/(dashboard)/dashboard/menu/create/useMenuStore";
import { cn } from "@/lib/utils";

export function AddDishModal({
  isOpen,
  onClose,
  categoryId,
}: {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}) {
  const addDishToStore = useMenuStore((state) => state.addDish);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    // Conversione sicura del prezzo per evitare errori di virgole/punti
    const cleanPrice = formData.price.replace(",", ".");

    addDishToStore(categoryId, {
      name: formData.name,
      price: cleanPrice,
      description: formData.description,
    });

    setFormData({ name: "", price: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-[2.5rem] p-8 border-none font-jakarta shadow-2xl overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 blur-[80px] rounded-full pointer-events-none" />

        <DialogHeader className="relative z-10">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-slate-200">
            <UtensilsCrossed size={28} strokeWidth={2.5} />
          </div>
          <DialogTitle className="text-4xl font-bold text-slate-900 tracking-tight leading-none">
            Nuova <span className="text-red-600">Portata</span>
          </DialogTitle>
          
          {/* FIX: Risolve il Warning "Missing Description" */}
          <DialogDescription className="text-slate-400 font-medium text-sm pt-2">
            Aggiungi un piatto alla sezione selezionata. Sarà visibile immediatamente sul menu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8 relative z-10">
          <div className="space-y-5">
            {/* NOME PIATTO */}
            <div className="space-y-2.5">
              <Label className="text-[11px] font-bold uppercase text-slate-900 ml-1 tracking-widest">
                Nome Piatto
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="es. Carbonara Special"
                className="h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white font-bold text-slate-900 transition-all outline-none"
                required
              />
            </div>

            {/* PREZZO */}
            <div className="space-y-2.5">
              <Label className="text-[11px] font-bold uppercase text-slate-900 ml-1 tracking-widest">
                Prezzo di vendita
              </Label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={3} />
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="12.50"
                  className="h-14 rounded-2xl bg-slate-50 border-2 border-slate-100 pl-12 focus:border-red-500 focus:bg-white font-bold text-slate-900 transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* DESCRIZIONE */}
            <div className="space-y-2.5">
              <Label className="text-[11px] font-bold uppercase text-slate-900 ml-1 tracking-widest">
                Ingredienti o Descrizione
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="es. Guanciale croccante, pecorino romano, pepe..."
                className="rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-red-500 focus:bg-white min-h-[100px] resize-none font-medium p-4 transition-all outline-none"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 flex-col sm:flex-row gap-3">
            <button
              type="submit"
              className="w-full py-5 bg-slate-900 hover:bg-red-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Plus size={20} strokeWidth={3} /> 
              Salva Portata
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
